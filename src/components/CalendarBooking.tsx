import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, parseISO } from 'date-fns';
import { Clock, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useBookingSystem, TimeSlot } from '../hooks/useBookingSystem';
import 'react-calendar/dist/Calendar.css';

interface CalendarBookingProps {
  selectedService: string;
  onSlotSelect: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

const CalendarBooking: React.FC<CalendarBookingProps> = ({
  selectedService,
  onSlotSelect,
  selectedDate,
  selectedTime
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { getAvailableSlots, isDateAvailable, services } = useBookingSystem();

  const selectedServiceData = services.find(s => s.id === selectedService);

  useEffect(() => {
    if (selectedService && date) {
      loadAvailableSlots();
    }
  }, [selectedService, date]);

  const loadAvailableSlots = async () => {
    if (!selectedService) return;
    
    setLoadingSlots(true);
    try {
      const slots = await getAvailableSlots(date, selectedService);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error loading slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (newDate: Date | Date[]) => {
    if (Array.isArray(newDate)) {
      setDate(newDate[0]);
      return;
    }
    setDate(newDate);
  };

  const handleTimeSelect = (time: string) => {
    const dateString = format(date, 'yyyy-MM-dd');
    onSlotSelect(dateString, time);
  };

  const tileDisabled = ({ date: tileDate }: { date: Date }) => {
    return !isDateAvailable(tileDate);
  };


  return (
    <div className="space-y-8">
      {/* Service Info */}
      {selectedServiceData && (
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
          <div className="flex items-center space-x-3 mb-3">
            <CalendarIcon className="h-6 w-6 text-rose-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              {selectedServiceData.name}
            </h3>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-rose-500" />
              <span>{selectedServiceData.duration_minutes} minutes</span>
            </div>
            <div className="font-semibold text-rose-600">
              £{selectedServiceData.price}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Date</h3>
          <div className="calendar-container bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileDisabled={tileDisabled}
              minDate={new Date()}
              className="custom-calendar"
            />
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Available Times for {format(date, 'MMMM d, yyyy')}
          </h3>
          
          {!selectedService ? (
            <div className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-200">
              <p className="text-gray-600">Please select a service first</p>
            </div>
          ) : loadingSlots ? (
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg border border-rose-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading available times...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-200">
              <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-2">No available times</p>
              <p className="text-sm text-gray-500">Please select a different date</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      slot.available
                        ? selectedTime === slot.time
                          ? 'bg-rose-500 text-white shadow-lg transform scale-105'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 hover:shadow-md border border-rose-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      {slot.available ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <span>{slot.time}</span>
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {slot.time} - {slot.endTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .calendar-container :global(.react-calendar) {
          width: 100%;
          border: none;
          font-family: inherit;
          background: transparent;
        }
        
        .calendar-container :global(.react-calendar__navigation) {
          display: flex;
          height: 44px;
          margin-bottom: 1em;
        }
        
        .calendar-container :global(.react-calendar__navigation button) {
          color: #ec4899;
          font-weight: 600;
          font-size: 16px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: none;
          transition: all 0.2s ease;
          min-width: 44px;
        }
        
        .calendar-container :global(.react-calendar__navigation button:hover) {
          background-color: #fdf2f8;
        }
        
        .calendar-container :global(.react-calendar__navigation button:disabled) {
          background-color: #f1f5f9;
          color: #cbd5e1;
        }
        
        .calendar-container :global(.react-calendar__month-view__weekdays) {
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          color: #6b7280;
          font-size: 0.75em;
        }
        
        .calendar-container :global(.react-calendar__month-view__weekdays__weekday) {
          padding: 0.5em;
        }
        
        .calendar-container :global(.react-calendar__month-view__days__day) {
          position: relative;
        }
        
        .calendar-container :global(.react-calendar) {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        
        .calendar-container :global(.react-calendar__tile) {
          padding: 12px 6px;
          border-radius: 8px;
          border: 1px solid #f1f5f9;
          margin: 2px;
          transition: all 0.2s ease;
        }
        
        .calendar-container :global(.react-calendar__tile:hover) {
          background-color: #fdf2f8;
          border-color: #f9a8d4;
        }
        
        .calendar-container :global(.react-calendar__tile--active) {
          background-color: #ec4899 !important;
          color: white !important;
          border-color: #ec4899;
        }
        
        .calendar-container :global(.react-calendar__tile:disabled) {
          background-color: #f8fafc;
          color: #cbd5e1;
          cursor: not-allowed;
        }
        
        .calendar-container :global(.react-calendar__navigation button) {
          color: #ec4899;
          font-weight: 600;
          font-size: 16px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: none;
          transition: all 0.2s ease;
        }
        
        .calendar-container :global(.react-calendar__navigation button:hover) {
          background-color: #fdf2f8;
        }
        
        .calendar-container :global(.react-calendar__month-view__weekdays) {
          font-weight: 600;
          color: #6b7280;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default CalendarBooking;