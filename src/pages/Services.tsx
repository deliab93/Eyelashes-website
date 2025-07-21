import React from 'react';
import { Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      name: "Classic Lash Extensions",
      description: "One extension applied to each natural lash for a natural, elegant look",
      duration: "1.5 - 2 hours",
      price: "£120",
      features: [
        "1:1 lash ratio",
        "Natural enhancement",
        "Perfect for everyday wear",
        "Low maintenance",
        "Lasts 3-4 weeks"
      ],
      image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg"
    },
    {
      name: "Volume Lash Extensions",
      description: "Multiple ultra-fine extensions applied to each natural lash for dramatic volume",
      duration: "2 - 2.5 hours",
      price: "£180",
      features: [
        "2-5 lashes per natural lash",
        "Fuller, dramatic look",
        "Customizable volume",
        "Perfect for special occasions",
        "Lasts 3-4 weeks"
      ],
      image: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg"
    },
    {
      name: "Mega Volume Extensions",
      description: "Maximum volume with 6-12 ultra-light extensions per natural lash",
      duration: "2.5 - 3 hours",
      price: "£220",
      features: [
        "6-12 lashes per natural lash",
        "Maximum volume and drama",
        "Ultra-light weight",
        "Show-stopping results",
        "Lasts 3-4 weeks"
      ],
      image: "https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg"
    },
    {
      name: "Lash Fill (2-3 weeks)",
      description: "Maintenance appointment to replace grown-out extensions",
      duration: "1 - 1.5 hours",
      price: "£65",
      features: [
        "Maintain your lash look",
        "Replace grown-out lashes",
        "Quick touch-up",
        "Extends lash life",
        "Recommended every 2-3 weeks"
      ],
      image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg"
    }
  ];

  const addOns = [
    { name: "Lash Lift", price: "£45", description: "Curl and lift natural lashes" },
    { name: "Lash Tint", price: "£25", description: "Darken natural lashes" },
    { name: "Brow Shaping", price: "£35", description: "Perfect your brows" },
    { name: "Under Eye Patches", price: "£15", description: "Hydrating eye treatment" }
  ];

  return (
    <div className="pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Discover our range of professional eyelash extension services, each designed to enhance your natural beauty
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100"
              >
                <div className="aspect-video bg-gradient-to-r from-rose-200 to-pink-200 flex items-center justify-center">
                  <div className="text-6xl">👁️</div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-rose-500 mr-2" />
                      <span className="text-gray-700 font-medium">{service.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-rose-600">{service.price}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/booking"
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl block text-center"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Add-On Services
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your experience with our additional beauty services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{addon.name}</h3>
                  <span className="text-2xl font-bold text-rose-600">{addon.price}</span>
                </div>
                <p className="text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Book your consultation today and let us help you choose the perfect lash service
          </p>
          <Link
            to="/booking"
            className="bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Schedule Your Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;