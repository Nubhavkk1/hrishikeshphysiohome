import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Calendar, Home, Users, Image, Activity, Heart, Shield, Bed } from 'lucide-react';
import ImageSlider from './ImageSlider';
import AboutUs from './AboutUs';
import Booking from './Booking';


export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleServices = (e) => {
    e.stopPropagation();
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 font-bold text-xl">Hrishikesh's Physio</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300 ease-in-out border-b-2 border-transparent hover:border-blue-600">
                <span className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </span>
              </a>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleServices}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition duration-300 ease-in-out border-b-2 border-transparent hover:border-blue-600"
                >
                  Services
                    <ChevronDown className="ml-1 h-4 w-4" />
                  
                </button>

                {isServicesOpen && (
                  <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Physiotherapy</a>
                    <a href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Child Rehabilitation</a>
                    <a href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Pain Management</a>
                    <a href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Patient Accommodation</a>
                  </div>
                )}
              </div>

              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300 ease-in-out border-b-2 border-transparent hover:border-blue-600">
                <span className="flex items-center">
                  <Image className="w-4 h-4 mr-1" />
                  Gallery
                </span>
              </a>

              <a href="#about-us" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300 ease-in-out border-b-2 border-transparent hover:border-blue-600">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  About Us
                </span>
              </a>

              <button
                onClick={() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="ml-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out flex items-center shadow-md"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </button>

            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <a href="tel:+1234567890" className="mr-4 text-blue-600">
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={toggleNav}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition duration-300 ease-in-out"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleNav}
          ></div>
        )}

        {/* Mobile Menu - Side Sliding */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <span className="text-blue-600 font-bold text-lg">Hrishikesh's Physio</span>
            <button
              onClick={toggleNav}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-4 space-y-2 overflow-y-auto h-full">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
            >
              <Home className="w-5 h-5 mr-3" />
              <span className="font-medium">Home</span>
            </a>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={toggleServices}
                className="w-full text-left flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
              >
                <div className="flex items-center">
                  <span className="font-medium">Services</span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`pl-4 overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-60' : 'max-h-0'}`}>
                <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Physiotherapy</a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Child Rehabilitation</a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Pain Management</a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300">Patient Accommodation</a>
              </div>
            </div>

            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
            >
              <Image className="w-5 h-5 mr-3" />
              <span className="font-medium">Gallery</span>
            </a>

            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
            >
              <Users className="w-5 h-5 mr-3" />
              <span className="font-medium">About Us</span>
            </a>

            <div className="px-4 pt-5">
              <button className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </button>
            </div>

            <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-medium">Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Hrishikesh's Physio Home <br /> and Child Rehabilitation Center
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8">
            Expert care and support for your path to recovery and wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold shadow-md hover:bg-gray-100 transition duration-300"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Our Services
            </button>
            <a href="tel:+916002779942">
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                Contact Us
              </button>
            </a>

          </div>
        </div>
      </header>

      <ImageSlider />

      {/* Services Cards Section */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">Our Specialized Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Physiotherapy Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-blue-600 text-white text-center">
              <Activity className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Physiotherapy</h3>
              <p className="text-gray-600 mb-4">
                Specialized treatment to restore movement and function affected by injury, illness or disability.
              </p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Child Rehabilitation Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-green-600 text-white text-center">
              <Heart className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Child Rehabilitation</h3>
              <p className="text-gray-600 mb-4">
                Specialized care for children with developmental, physical, or neurological challenges.
              </p>
              <a href="#" className="text-green-600 font-medium hover:text-green-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Pain Management Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-purple-600 text-white text-center">
              <Shield className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Pain Management</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive approaches to reduce pain and improve quality of life for chronic conditions.
              </p>
              <a href="#" className="text-purple-600 font-medium hover:text-purple-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Patient Accommodation Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-amber-600 text-white text-center">
              <Bed className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Comfortable Patient Accommodation</h3>
              <p className="text-gray-600 mb-4">
                Well-equipped, comfortable facilities designed for patients requiring extended care.
              </p>
              <a href="#" className="text-amber-600 font-medium hover:text-amber-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <AboutUs />
      <Booking />
    </div>
  );
}