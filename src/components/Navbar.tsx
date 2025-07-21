import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              LuxeLashes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-rose-500 ${
                  isActive(item.path)
                    ? 'text-rose-500 border-b-2 border-rose-500 pb-1'
                    : 'text-gray-700 hover:border-b-2 hover:border-rose-300 hover:pb-1'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-rose-500 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-rose-100 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-rose-500 bg-rose-50'
                      : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium mx-4 text-center hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;