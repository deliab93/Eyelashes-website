import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">123 Beauty Lane, Los Angeles, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">hello@luxelashes.com</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Business Hours
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-rose-500 p-3 rounded-full hover:bg-rose-600 transition-colors duration-300 hover:scale-110 transform">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-rose-500 p-3 rounded-full hover:bg-rose-600 transition-colors duration-300 hover:scale-110 transform">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-rose-500 p-3 rounded-full hover:bg-rose-600 transition-colors duration-300 hover:scale-110 transform">
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-400 text-sm">
                Stay connected for the latest updates and exclusive offers!
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 LuxeLashes. All rights reserved. | Elevating beauty, one lash at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;