import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { useBookingSystem, BookingData } from '../hooks/useBookingSystem';
import CalendarBooking from '../components/CalendarBooking';

const Booking = () => {
  const { services, createBooking, loading, error } = useBookingSystem();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    appointment_date: '',
    appointment_time: '',
    isNewClient: '',
    allergies: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (!formData.service || !formData.appointment_date || !formData.appointment_time) {
      setSubmitError('Please select a service, date, and time');
      return;
    }

    try {
      const selectedService = services.find(s => s.id === formData.service);
      if (!selectedService) {
        setSubmitError('Invalid service selected');
        return;
      }

      const bookingData: BookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_id: formData.service,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        duration_minutes: selectedService.duration_minutes,
        is_new_client: formData.isNewClient === 'yes',
        allergies: formData.allergies || undefined,
        notes: formData.notes || undefined,
      };

      await createBooking(bookingData);
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to create booking. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSlotSelect = (date: string, time: string) => {
    setFormData(prev => ({ ...prev, appointment_date: date, appointment_time: time }));
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 pb-20 min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Thank you for choosing LuxeLashes! We've received your booking request and will contact you within 24 hours to confirm your appointment details.
            </p>
            <div className="bg-rose-50 p-6 rounded-2xl mb-8 border border-rose-100">
              <h3 className="font-semibold text-gray-800 mb-4">What happens next?</h3>
              <ul className="text-gray-700 space-y-2 text-left">
                <li>• We'll call or email you to confirm your preferred date and time</li>
                <li>• You'll receive appointment details and preparation instructions</li>
                <li>• A reminder will be sent 24 hours before your appointment</li>
              </ul>
            </div>
            <p className="text-gray-600">
              Questions? Call us at <span className="font-semibold text-rose-600">(555) 123-4567</span>
            </p>
          </div>
        </div>
    );
  }

  return (
    <div className="pt-16 pb-20 min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Ready to transform your look? Schedule your lash extension appointment today
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white text-center">
              <h2 className="text-3xl font-semibold mb-2">Schedule Your Service</h2>
              <p className="text-rose-100">Fill out the form below and we'll confirm your appointment</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <User className="h-6 w-6 text-rose-500 mr-3" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <MessageCircle className="h-6 w-6 text-rose-500 mr-3" />
                  Service Selection
                </h3>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Your Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - £{service.price} ({service.duration_minutes} min)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-6">
                  <label htmlFor="isNewClient" className="block text-sm font-medium text-gray-700 mb-2">
                    Are you a new client? *
                  </label>
                  <select
                    id="isNewClient"
                    name="isNewClient"
                    required
                    value={formData.isNewClient}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Please select</option>
                    <option value="yes">Yes, this is my first visit</option>
                    <option value="no">No, I'm a returning client</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                  <Calendar className="h-6 w-6 text-rose-500 mr-3" />
                  Select Date & Time
                </h3>
                
                <CalendarBooking
                  selectedService={formData.service}
                  onSlotSelect={handleSlotSelect}
                  selectedDate={formData.appointment_date}
                  selectedTime={formData.appointment_time}
                />
                
                {formData.appointment_date && formData.appointment_time && (
                  <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">
                        Selected: {new Date(formData.appointment_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} at {formData.appointment_time}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <MessageCircle className="h-6 w-6 text-rose-500 mr-3" />
                  Additional Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-2">
                      Any allergies or sensitivities?
                    </label>
                    <input
                      type="text"
                      id="allergies"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="Please list any allergies or sensitivities"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                      Special requests or notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Any special requests, questions, or additional information..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t border-gray-200">
                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}
                
                {error && (
                  <div className="mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading || !formData.service || !formData.appointment_date || !formData.appointment_time}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Booking...</span>
                    </div>
                  ) : (
                    'Submit Booking Request'
                  )}
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  * We'll contact you within 24 hours to confirm your appointment
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;