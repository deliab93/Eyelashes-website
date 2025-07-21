import React from 'react';
import { Award, Users, Heart, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "500+", label: "Happy Clients", icon: <Users className="h-8 w-8 text-rose-500" /> },
    { number: "3+", label: "Years Experience", icon: <Award className="h-8 w-8 text-rose-500" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Heart className="h-8 w-8 text-rose-500" /> },
    { number: "1000+", label: "Lash Sets Completed", icon: <Sparkles className="h-8 w-8 text-rose-500" /> }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We use only premium materials and maintain the highest standards in every service.",
      icon: "💎"
    },
    {
      title: "Client Care",
      description: "Your comfort and satisfaction are our top priorities. We listen and deliver.",
      icon: "❤️"
    },
    {
      title: "Expertise",
      description: "Our team stays current with the latest techniques and industry developments.",
      icon: "🎯"
    },
    {
      title: "Cleanliness",
      description: "We maintain strict hygiene protocols to ensure a safe, clean environment.",
      icon: "✨"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            About LuxeLashes
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Dedicated to enhancing your natural beauty with professional eyelash extension services
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-lg transition-all duration-300 border border-rose-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-3xl font-semibold text-rose-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Our Story
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-rose-100">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl mb-6">
                LuxeLashes was born from a passion for enhancing natural beauty and helping women feel confident and radiant every day.
              </p>
              
              <p className="mb-6">
                Founded in 2022, we started with a simple mission: to provide the highest quality eyelash extension services in a luxurious, comfortable environment. Our founder, Sarah Martinez, is a certified lash technician with over 5 years of experience in the beauty industry.
              </p>
              
              <p className="mb-6">
                What sets us apart is our commitment to using only premium materials, maintaining strict hygiene standards, and continuously educating ourselves on the latest techniques. We believe that beautiful lashes should not only look amazing but also be safe and healthy for your natural lashes.
              </p>
              
              <p className="mb-6">
                Today, we're proud to have served over 500 clients, building lasting relationships based on trust, quality, and exceptional results. Each appointment is personalized to enhance your unique eye shape and complement your lifestyle.
              </p>
              
              <p className="text-rose-600 font-semibold text-lg">
                At LuxeLashes, we're not just about lashes – we're about helping you feel beautiful, confident, and ready to take on the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Meet Our Expert
            </h2>
            <p className="text-xl text-gray-600">
              Certified professional dedicated to your beauty
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-5xl">👩‍💼</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Sarah Martinez</h3>
              <p className="text-rose-600 font-semibold mb-4">Founder & Lead Lash Technician</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                With over 5 years of experience in the beauty industry and advanced certifications in volume and mega volume techniques, Sarah is passionate about creating beautiful, healthy lash extensions that enhance each client's natural beauty.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">Certified</span>
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">5+ Years</span>
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">Volume Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;