import React from 'react';
import { Users, Award, Target, Stethoscope, Clock, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-us"className="py-16 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About <span className="text-blue-600">Hrishikesh's Physio Home</span></h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide physiotherapy services across Assam with 10+ years of experience, dedicated to helping patients achieve optimal health and wellness.
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-800">Our Commitment to Excellence</h3>
            <p className="text-gray-600">
              Our team of skilled therapists and healthcare professionals is dedicated to providing the best physiotherapy and rehabilitation services in the area. At Hrishikesh's Physio Home & Child Rehabilitation Center, our patients are at the heart of everything we do.
            </p>
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center w-16 h-16">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-gray-800">Expert Team</h4>
                <p className="text-gray-600">Our clinic is staffed with experienced physiotherapists and child rehabilitation specialists who are passionate about helping patients achieve their goals.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="bg-red-100 p-4 rounded-full flex items-center justify-center w-16 h-16">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-gray-800">Personalized Care</h4>
                <p className="text-gray-600">We create customized treatment plans that are specifically designed to meet the individual needs of each patient.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center w-16 h-16">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-gray-800">10+ Years Experience</h4>
                <p className="text-gray-600">We stay updated with the latest advancements in the field to provide the best possible care.</p>
              </div>
            </div>
          </div>

          {/* Right side image/illustration */}
          <div className="relative h-96 bg-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-12 h-12 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h3>
                  <p className="text-gray-600">To empower patients to overcome pain and physical limitations, enabling them to lead healthier, fulfilling lives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Stethoscope className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Comprehensive Services</h3>
            <p className="text-gray-600 text-center">Our clinic offers a wide range of services including pain relief therapy, exercise therapy, pediatric therapy and more.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Modern Facilities</h3>
            <p className="text-gray-600 text-center">We have modern facilities and advanced equipment to provide the highest standard of care for all our patients.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Comforting Environment</h3>
            <p className="text-gray-600 text-center">We create a welcoming environment where patients can feel at ease during their treatment sessions.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Healing Journey?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Whether it's recovering from an injury, managing a chronic condition or improving mobility, we are here to help.</p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105">
            BOOK AN APPOINTMENT TODAY
          </button>
        </div>
      </div>
    </section>
  );
}