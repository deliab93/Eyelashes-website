import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-rose-500" />,
      title: "Location",
      details: ["123 Beauty Lane", "London, SW1A 1AA"]
    },
    {
      icon: <Phone className="h-6 w-6 text-rose-500" />,
      title: "Phone",
      details: ["020 7123 4567"]
    },
    {
      icon: <Mail className="h-6 w-6 text-rose-500" />,
      title: "Email",
      details: ["hello@luxelashes.com"]
    },
    {
      icon: <Clock className="h-6 w-6 text-rose-500" />,
      title: "Hours",
      details: [
        "Mon-Fri: 9:00 AM - 7:00 PM",
        "Saturday: 9:00 AM - 6:00 PM",
        "Sunday: 10:00 AM - 5:00 PM"
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Questions? Call us at <span className="font-semibold text-rose-600">020 7123 4567</span>
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-lg transition-all duration-300 border border-rose-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg">
                  {info.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-gray-800">{info.title}</h3>
                <div className="text-gray-600 space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="leading-relaxed">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                  <MessageCircle className="h-8 w-8 text-rose-500 mr-3" />
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Have a question or want to learn more about our services? We're here to help!
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us more about your question or how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
                <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Find Us
                </h3>
                <div className="aspect-video bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-rose-200">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-rose-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500">123 Beauty Lane, London</p>
                  </div>
                </div>
                <div className="mt-6 p-6 bg-rose-50 rounded-2xl border border-rose-100">
                  <h4 className="font-semibold text-gray-800 mb-3">Getting Here</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• Plenty of free parking available</p>
                    <p>• Located in the heart of London</p>
                    <p>• Easy access from major roads</p>
                    <p>• Tube and bus stops nearby</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
                <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Follow Our Journey
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay connected and see our latest work on social media
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 rounded-full text-white hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 rounded-full text-white hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 rounded-full text-white hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm">@LuxeLashes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How long do eyelash extensions last?",
                answer: "Eyelash extensions typically last 3-4 weeks with proper care. We recommend fills every 2-3 weeks to maintain the full look."
              },
              {
                question: "Is the application process painful?",
                answer: "Not at all! The process is very relaxing. Many clients even fall asleep during their appointment. You'll feel comfortable throughout the entire service."
              },
              {
                question: "Can I wear makeup with extensions?",
                answer: "Yes, but we recommend oil-free makeup products. Avoid waterproof mascara and be gentle when removing makeup around the eye area."
              },
              {
                question: "How should I prepare for my appointment?",
                answer: "Come with clean, makeup-free lashes. Avoid caffeine before your appointment and plan to keep your eyes closed for the duration of the service."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-medium mb-4 text-gray-800">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;