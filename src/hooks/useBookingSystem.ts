import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { format, addMinutes, parseISO, isSameDay, isAfter, isBefore, startOfDay } from 'date-fns';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  endTime: string;
}

export interface BusinessHours {
  day_of_week: number;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  is_new_client: boolean;
  allergies?: string;
  notes?: string;
}

export const useBookingSystem = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch services
  useEffect(() => {
    fetchServices();
    fetchBusinessHours();
  }, []);

  const fetchServices = async () => {
    try {
      // Mock data if Supabase is not configured
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setServices([
          {
            id: '1',
            name: 'Classic Lash Extensions',
            description: 'One extension applied to each natural lash for a natural, elegant look',
            price: 95,
            duration_minutes: 120
          },
          {
            id: '2',
            name: 'Volume Lash Extensions',
            description: 'Multiple ultra-fine extensions applied to each natural lash for dramatic volume',
            price: 140,
            duration_minutes: 150
          },
          {
            id: '3',
            name: 'Mega Volume Extensions',
            description: 'Maximum volume with 6-12 ultra-light extensions per natural lash',
            price: 175,
            duration_minutes: 180
          },
          {
            id: '4',
            name: 'Lash Fill (2-3 weeks)',
            description: 'Maintenance appointment to replace grown-out extensions',
            price: 50,
            duration_minutes: 90
          }
        ]);
        return;
      }

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('price');

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    }
  };

  const fetchBusinessHours = async () => {
    try {
      // Mock data if Supabase is not configured
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setBusinessHours([
          { day_of_week: 0, open_time: '10:00', close_time: '17:00', is_closed: false },
          { day_of_week: 1, open_time: '09:00', close_time: '19:00', is_closed: false },
          { day_of_week: 2, open_time: '09:00', close_time: '19:00', is_closed: false },
          { day_of_week: 3, open_time: '09:00', close_time: '19:00', is_closed: false },
          { day_of_week: 4, open_time: '09:00', close_time: '19:00', is_closed: false },
          { day_of_week: 5, open_time: '09:00', close_time: '19:00', is_closed: false },
          { day_of_week: 6, open_time: '09:00', close_time: '18:00', is_closed: false }
        ]);
        return;
      }

      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .order('day_of_week');

      if (error) throw error;
      setBusinessHours(data || []);
    } catch (err) {
      console.error('Error fetching business hours:', err);
      setError('Failed to load business hours');
    }
  };

  const getAvailableSlots = async (date: Date, serviceId: string): Promise<TimeSlot[]> => {
    try {
      const dayOfWeek = date.getDay();
      const dateString = format(date, 'yyyy-MM-dd');
      
      // Get business hours for this day
      const dayHours = businessHours.find(h => h.day_of_week === dayOfWeek);
      if (!dayHours || dayHours.is_closed) {
        return [];
      }

      // Get service duration
      const service = services.find(s => s.id === serviceId);
      if (!service) return [];

      let bookings: any[] = [];
      
      // Get existing bookings for this date (mock data if no Supabase)
      if (import.meta.env.VITE_SUPABASE_URL) {
        const { data, error } = await supabase
          .from('bookings')
          .select('appointment_time, duration_minutes')
          .eq('appointment_date', dateString)
          .neq('status', 'cancelled');

        if (error) throw error;
        bookings = data || [];
      }

      // Generate time slots
      const slots: TimeSlot[] = [];
      const openTime = parseISO(`${dateString}T${dayHours.open_time}:00`);
      const closeTime = parseISO(`${dateString}T${dayHours.close_time}:00`);
      
      let currentTime = openTime;
      
      while (isBefore(addMinutes(currentTime, service.duration_minutes), closeTime) || 
             currentTime.getTime() === closeTime.getTime() - service.duration_minutes * 60000) {
        
        const timeString = format(currentTime, 'HH:mm');
        const endTime = addMinutes(currentTime, service.duration_minutes);
        
        // Check if this slot conflicts with existing bookings
        const isAvailable = !bookings.some(booking => {
          const bookingStart = parseISO(`${dateString}T${booking.appointment_time}:00`);
          const bookingEnd = addMinutes(bookingStart, booking.duration_minutes);
          
          // Check for overlap
          return (
            (isAfter(currentTime, bookingStart) || currentTime.getTime() === bookingStart.getTime()) &&
            isBefore(currentTime, bookingEnd)
          ) || (
            isAfter(endTime, bookingStart) &&
            (isBefore(endTime, bookingEnd) || endTime.getTime() === bookingEnd.getTime())
          ) || (
            (isBefore(currentTime, bookingStart) || currentTime.getTime() === bookingStart.getTime()) &&
            (isAfter(endTime, bookingEnd) || endTime.getTime() === bookingEnd.getTime())
          );
        });

        // Don't show past time slots for today
        const now = new Date();
        const isToday = isSameDay(date, now);
        const isPastTime = isToday && isBefore(currentTime, now);

        slots.push({
          time: timeString,
          available: isAvailable && !isPastTime,
          endTime: format(endTime, 'HH:mm')
        });

        currentTime = addMinutes(currentTime, 30); // 30-minute intervals
      }

      return slots;
    } catch (err) {
      console.error('Error getting available slots:', err);
      return [];
    }
  };

  const createBooking = async (bookingData: BookingData) => {
    setLoading(true);
    setError(null);

    try {
      // Mock booking creation if no Supabase
      if (!import.meta.env.VITE_SUPABASE_URL) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockBooking = {
          id: Math.random().toString(36).substr(2, 9),
          ...bookingData,
          status: 'pending',
          created_at: new Date().toISOString()
        };
        
        console.log('Mock booking created:', mockBooking);
        return mockBooking;
      }

      // First, check if the slot is still available
      const date = parseISO(bookingData.appointment_date);
      const availableSlots = await getAvailableSlots(date, bookingData.service_id);
      const requestedSlot = availableSlots.find(slot => slot.time === bookingData.appointment_time);
      
      if (!requestedSlot || !requestedSlot.available) {
        throw new Error('This time slot is no longer available. Please select another time.');
      }

      // Create the booking
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;

      // Send notification email (this would be handled by an edge function)
      await sendBookingNotification(data);

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendBookingNotification = async (booking: any) => {
    try {
      // This would typically call a Supabase Edge Function
      // For now, we'll just log the booking details
      console.log('Booking notification would be sent:', booking);
      
      // In a real implementation, you would call an edge function like:
      // const { error } = await supabase.functions.invoke('send-booking-email', {
      //   body: { booking }
      // });
    } catch (err) {
      console.error('Error sending notification:', err);
    }
  };

  const isDateAvailable = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    const dayHours = businessHours.find(h => h.day_of_week === dayOfWeek);
    
    if (!dayHours || dayHours.is_closed) {
      return false;
    }

    // Don't allow booking in the past
    const today = startOfDay(new Date());
    const selectedDate = startOfDay(date);
    
    return selectedDate >= today;
  };

  return {
    services,
    businessHours,
    loading,
    error,
    getAvailableSlots,
    createBooking,
    isDateAvailable,
    fetchServices,
    fetchBusinessHours
  };
};