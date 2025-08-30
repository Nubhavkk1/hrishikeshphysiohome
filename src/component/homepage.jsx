import { useState, useEffect } from 'react';
import { Menu, X, Brain, ChevronDown, Phone, Accessibility, HeartPulse, Calendar, PhoneCall, ChevronRight, CheckCircle, Star, Home, Users, Image, Activity, Heart, Shield, Bed, Award, Clock, ArrowRight, HeartPulseIcon } from 'lucide-react';
import ImageSlider from './ImageSlider';
import AboutUs from './AboutUs';
import Booking from './Booking';
import GallerySection from './GallerySection'
import Line from './Line'
import Icon from './Icon'
import Map from './Map'
import Footer from './Footer'
import Inst from './Inst'
import { Link } from "react-router-dom";




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

              <a href="/" className="flex-shrink-0">
                <img src="/images/logoxkx.jpg" alt="Hrishikesh's Physio Logo" className="h-10 w-10 object-cover rounded-full" />
              </a>
            </div>
            <div className="flex items-center justify-center w-1/3">
              <img src="/images/logotext1.jpg" alt="Center Image" className="h-9 w-auto" />
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
            <span className="text-blue-600 font-bold text-lg">HPHCR</span>
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
              onClick={toggleNav}
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
              onClick={toggleNav}
              href="#Gallery"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
            >
              <Image className="w-5 h-5 mr-3" />
              <span className="font-medium">Gallery</span>
            </a>

            <a
              href="#about"
              onClick={toggleNav}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
            >
              <Users className="w-5 h-5 mr-3" />
              <span className="font-medium">About Us</span>
            </a>

            <a href="#booking" onClick={toggleNav} className="block px-4 pt-5">

              <button className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out flex items-center justify-center shadow-md">

                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </button>
            </a>

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
      </nav><div />
      <h1 className="bg-blue-400 text-xs font-semibold text-gray-800 text-center">hrishikeshphysiohome.in</h1>
      <div />
      <Line />
      <Icon />
      <Map />
      {/* Hero Section */}
      <header id="home" className="pt-16 md:pt-24 bg-gradient-to-r from-sky-600 to-teal-300 text-white pb-16 md:pb-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-300 opacity-10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-blue-300 opacity-10 rounded-full"></div>
          <svg className="absolute bottom-0 left-0 text-blue-700 opacity-10" width="400" height="400" viewBox="0 0 200 200">
            <path fill="currentColor" d="M42.7,-73.4C55.9,-67.7,67.7,-57.5,75.9,-44.6C84.1,-31.7,88.7,-15.8,88.4,-0.2C88.1,15.5,82.8,31,73.1,42.6C63.4,54.3,49.3,62.1,35.5,69.9C21.7,77.7,8.6,85.4,-4.9,92C-18.5,98.5,-36.9,103.9,-48.4,96.6C-59.9,89.3,-64.3,69.4,-69.9,51.9C-75.5,34.4,-82.3,19.2,-84.4,2.1C-86.5,-15,-84,-32,-75.1,-44.1C-66.3,-56.2,-51.1,-63.3,-36.9,-68.5C-22.7,-73.8,-9.4,-77.1,3.7,-83.6C16.7,-90.1,33.5,-99.8,42.7,-97.1C51.9,-94.4,53.6,-79.2,42.7,-73.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <div className="inline-flex items-center justify-center bg-white bg-opacity-20 px-4 py-2 rounded-full mb-6">
                <Award className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="text-yellow-200 font-medium">Trusted Care Since 2014</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Hrishikesh's Physio <span className="text-cyan-200">Home</span> & <br />
                <span className="text-cyan-200">Child</span> Rehabilitation<br /><span className="text-cyan-200">Center</span>
              </h1>

              <div className="w-20 h-1 bg-cyan-200 mb-6 mx-auto md:mx-0"></div>

              {/* <p className="text-lg md:text-xl max-w-xl opacity-90 mb-8 font-light">
              Expert care and personalized support for your journey to recovery, wellness, and optimal physical health.
            </p> */}



              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  {/* Main circular image */}
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                    <img
                      src="/images/Profilepic.jpg"
                      alt="Physical therapist helping patient"
                      className="w-full h-full object-cover"
                    />
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-20"></div>
                  </div>

                  {/* Animated pulse ring */}
                  <div className="absolute inset-0 rounded-full z-0">
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-200 opacity-30 animate-ping" style={{ animationDuration: '3s' }}></div>
                  </div>

                  {/* Floating accent circles
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-300 rounded-full opacity-30"></div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-teal-700 rounded-full opacity-30"></div> */}


                  {/* <div className="absolute top-0 right-0 bg-white rounded-full p-3 shadow-md transform translate-x-1/4 -translate-y-1/4 z-20">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 bg-white rounded-full p-3 shadow-md transform -translate-x-1/4 translate-y-1/4 z-20">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full p-2">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
              
              Additional feature bubbles with new icons 
              <div className="absolute top-1/2 right-0 bg-white rounded-full p-3 shadow-md transform translate-x-3/4 -translate-y-1/2 z-20">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full p-2">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-1/4 -left-4 bg-white rounded-full p-3 shadow-md z-20">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full p-2">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>  
              */}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <CheckCircle className="h-6 w-6 text-pink-600" />
                </div>
                <span className="text-white">Expert Therapists</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <span className="text-white">Personalized Care</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <Calendar className="h-6 w-6 text-yellow-500" />
                </div>
                <span className="text-white">Flexible Scheduling</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <Heart className="h-6 w-6 text-yellow-400" />
                </div>
                <span className="text-white">Compassionate Care</span>
              </div>
            </div>
            <div />

            <div />

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* <button
                className="px-8 py-3 bg-white text-blue-600 rounded-md font-semibold shadow-md hover:bg-gray-100 transition duration-300 flex items-center justify-center"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Our Services
                <ChevronRight className="ml-1 h-5 w-5" />

                
              </button> */}
              

              <div>
                <Link to="/services">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Click to see Our Services
                  </button>
                </Link>
              </div>



              <a href="tel:+917002149453" className="w-full sm:w-auto">
                <button className="w-full px-8 py-3 bg-transparent border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-blue-600 transition duration-300 flex items-center justify-center">
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Contact Us
                </button>
              </a>
            </div>
          </div>


          {/* Appointment banner */}
          <div className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 mt-12 mb-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Clock className="h-5 w-5 text-cyan-200 mr-2" />
              <span className="text-white">Book your appointment today</span>
            </div>
            {/* <div className="flex items-center">
              <a href="#appointment" className="flex items-center text-cyan-200 hover:text-white transition duration-300">
                <span>Schedule Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div> */}
          </div>
        </div>

        {/* Stats bar with enhanced graphics */}
        <div className="w-full bg-blue-800 bg-opacity-30 backdrop-blur-sm mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 relative">
                <div className="absolute inset-0 bg-white bg-opacity-5 rounded-lg transform -rotate-2"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-400  rounded-full p-2">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-yellow-100 font-bold text-3xl md:text-4xl">10+</p>
                  <p className="text-white text-sm mt-1">Years Experience</p>
                </div>
              </div>

              <div className="p-4 relative">
                <div className="absolute inset-0 bg-white bg-opacity-5 rounded-lg transform rotate-1"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-full p-2">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-yellow-100 font-bold text-3xl md:text-4xl">5000+</p>
                  <p className="text-white text-sm mt-1">Satisfied Patients</p>
                </div>
              </div>

              <div className="p-4 relative">
                <div className="absolute inset-0 bg-white bg-opacity-5 rounded-lg transform -rotate-1"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-400  rounded-full p-2">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-yellow-100 font-bold text-3xl md:text-4xl">5+</p>
                  <p className="text-white text-sm mt-1">Expert Therapists</p>
                </div>
              </div>

              <div className="p-4 relative">
                <div className="absolute inset-0 bg-white bg-opacity-5 rounded-lg transform rotate-2"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-full p-2">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-yellow-100 font-bold text-3xl md:text-4xl">8+</p>
                  <p className="text-white text-sm mt-1">Specialized Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Line />
      <ImageSlider />
      <div className="flex justify-center">
        <Inst
          facebookPage="profile.php?id=61578228281780"
          instagramUsername="drhrishikesh"
        />
      </div>

      {/* Services Cards Section */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">Our Specialized Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Physiotherapy Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-blue-700 text-white text-center">
              <Activity className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Physiotherapy</h3>
              <p className="text-gray-600 mb-4">
                Specialized treatment to restore movement and function affected by injury, illness or disability.
              </p>
              {/* <a href="#" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a> */}
            </div>
            <div className="px-6 pb-6">
              <img
                src="https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBoeXNpb3RoZXJhcGlzdHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Patient accommodation"
                className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
              />
            </div>
          </div>

          {/* Child Rehabilitation Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-sky-300 text-white text-center">
              <Heart className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Child Rehabilitation</h3>
              <p className="text-gray-600 mb-4">
                Specialized care for children with developmental, physical, or neurological challenges.
              </p>
              {/* <a href="#" className="text-green-600 font-medium hover:text-green-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a> */}
            </div>
            <div className="px-6 pb-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1682089689634-aca38807b52f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hpbGQlMjBwaHlzaWNhbCUyMHRoZXJhcHl8ZW58MHx8MHx8fDA%3D"
                alt="Patient accommodation"
                className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
              />
            </div>
          </div>

          {/* Pain Management Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-red-600 text-white text-center">
              <Shield className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Pain Management</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive approaches to reduce pain and improve quality of life for chronic conditions.
              </p>
              {/* <a href="#" className="text-red-400 font-medium hover:text-purple-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a> */}
            </div>
            <div className="px-6 pb-6">
              <img
                src="https://images.unsplash.com/photo-1645005512968-0c1fe99f0093?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGh5c2lvdGhlcmFweXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Patient accommodation"
                className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
              />
            </div>
          </div>

          {/* Patient Accommodation Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-teal-500 text-white text-center">
              <Bed className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Comfortable Patient Accommodation</h3>
              <p className="text-gray-600 mb-4">
                Well-equipped, comfortable facilities designed for patients requiring extended care.
              </p>
              {/* <a href="#" className="text-amber-600 font-medium hover:text-amber-800 inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a> */}
            </div>
            <div className="px-6 pb-6">
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2953&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Patient accommodation"
                className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-yellow-400 text-white text-center">
              <HeartPulseIcon className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Stroke Rehabilitation & Spinal Chord Injury Rehabilitation</h3>
              <p className="text-gray-600 mb-4">
                Our stroke and spine injury rehabilitation programs are designed to help you regain strength, movement, and independence.
              </p>

            </div>
            <div className="px-6 pb-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1664475561761-849e7871e0b9?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3Ryb2tlJTIwcGF0aWVudHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Patient accommodation"
                className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            <div className="p-4 bg-rose-400 text-white text-center">
              < Accessibility className="w-10 h-10 mx-auto mb-2" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Wheelchair Accessible Environment</h3>
              <p className="text-gray-600 mb-4">
                Our clinic is thoughtfully designed to be fully wheelchair accessible, ensuring ease, comfort, and independence for all patients.
              </p>

            </div>
            <div className="px-6 pb-6">
              <img
                src="https://images.unsplash.com/photo-1646082275130-347d10885c5f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHdoZWVsY2hhaXJ8ZW58MHx8MHx8fDA%3D"
                alt="Patient accommodation"
                className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
              />
            </div>
          </div>

        </div>
      </section>
      <Booking />
      < GallerySection />
      <AboutUs />
      <Footer />

    </div>
  );
}