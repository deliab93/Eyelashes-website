import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-rose-500" />,
      title: "Certified Professionals",
      description: "Our technicians are certified and experienced in the latest lash extension techniques."
    },
    {
      icon: <Star className="h-8 w-8 text-rose-500" />,
      title: "Premium Quality",
      description: "We use only the finest silk and mink lashes for natural, beautiful results."
    },
    {
      icon: <Users className="h-8 w-8 text-rose-500" />,
      title: "500+ Happy Clients",
      description: "Join our growing family of satisfied customers who trust us with their beauty."
    },
    {
      icon: <Clock className="h-8 w-8 text-rose-500" />,
      title: "Flexible Scheduling",
      description: "Book appointments that fit your busy schedule, including evenings and weekends."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Absolutely love my lashes! The team is professional and the results are stunning.",
      rating: 5
    },
    {
      name: "Emily Chen",
      text: "Best lash extension experience I've ever had. Will definitely be coming back!",
      rating: 5
    },
    {
      name: "Jessica Davis",
      text: "The attention to detail is incredible. My lashes look so natural and beautiful.",
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Elevate Your Beauty
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the art of luxury eyelash extensions with our certified professionals. 
            Transform your look with stunning, natural lashes that enhance your natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/booking"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Book Your Appointment
            </Link>
            <Link
              to="/services"
              className="border-2 border-rose-500 text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Services
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-rose-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-pink-300 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse animation-delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose LuxeLashes?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're dedicated to providing exceptional lash extension services that enhance your natural beauty
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">Real experiences from our valued customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-rose-100 pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Book your appointment today and experience the luxury of professional eyelash extensions
          </p>
          <Link
            to="/booking"
            className="bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;