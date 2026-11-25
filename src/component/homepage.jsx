import { useState, useEffect } from 'react';
import { Menu, X, Brain, ChevronDown, Phone, Accessibility, HeartPulse, Calendar, PhoneCall, ChevronRight, CheckCircle, Star, Home, Users, Image, Activity, Heart, Shield, Bed, Award, Clock, ArrowRight, HeartPulseIcon, LogIn } from 'lucide-react';
import AboutUs from './AboutUs';
import GallerySection from './GallerySection'
import Line from './Line'
import Icon from './Icon'
import Map from './Map'
import Footer from './Footer'
import Inst from './Inst'
import ConsultantProfile from './consultantProfile'
import { Link } from "react-router-dom";
import { AnimatedNumber, ScrollReveal } from './ScrollMotion';






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
                <img src="/images/logoxkx.png" alt="Hrishikesh's Physio Logo" className="h-10 w-10 object-cover rounded-full" />
              </a>
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

              <Link
                to="/login"
                className="ml-3 inline-flex items-center rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
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

            <Link
              to="/login"
              onClick={toggleNav}
              className="mx-4 mt-2 flex items-center justify-center rounded-md border border-blue-600 px-4 py-3 font-medium text-blue-700 hover:bg-blue-50"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Link>

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

        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/30 bg-slate-950/15 px-4 py-2.5 shadow-lg shadow-slate-950/10 backdrop-blur-md">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300/20 ring-1 ring-amber-100/40">
                  <Award className="h-5 w-5 text-amber-200" />
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.12em] text-white">
                  Trusted Care <span className="text-amber-200">Since 2014</span>
                </span>
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
            <div className="mb-8 grid grid-cols-2 gap-3 md:gap-4">
              <div className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-950/10 p-3 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:p-4">
                <div className="rounded-xl bg-white/15 p-2 ring-1 ring-white/25">
                  <CheckCircle className="h-5 w-5 text-amber-200" />
                </div>
                <span className="text-xs font-semibold leading-snug tracking-wide text-white drop-shadow-sm sm:text-sm">Expert Therapists</span>
              </div>
              <div className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-950/10 p-3 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:p-4">
                <div className="rounded-xl bg-white/15 p-2 ring-1 ring-white/25">
                  <Users className="h-5 w-5 text-cyan-200" />
                </div>
                <span className="text-xs font-semibold leading-snug tracking-wide text-white drop-shadow-sm sm:text-sm">Personalized Care</span>
              </div>
              <div className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-950/10 p-3 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:p-4">
                <div className="rounded-xl bg-white/15 p-2 ring-1 ring-white/25">
                  <Calendar className="h-5 w-5 text-violet-200" />
                </div>
                <span className="text-xs font-semibold leading-snug tracking-wide text-white drop-shadow-sm sm:text-sm">Flexible Scheduling</span>
              </div>
              <div className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-950/10 p-3 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:p-4">
                <div className="rounded-xl bg-white/15 p-2 ring-1 ring-white/25">
                  <Heart className="h-5 w-5 text-rose-200" />
                </div>
                <span className="text-xs font-semibold leading-snug tracking-wide text-white drop-shadow-sm sm:text-sm">Compassionate Care</span>
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
        </ScrollReveal>

        {/* Stats bar with enhanced graphics */}
        <div className="w-full bg-blue-800 bg-opacity-30 backdrop-blur-sm mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="relative rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 p-3 shadow-md shadow-amber-950/20 ring-1 ring-white/40">
                      <Calendar className="h-5 w-5 text-slate-950" />
                    </div>
                  </div>
                  <p className="font-serif text-4xl font-bold leading-none tracking-tight text-amber-200 tabular-nums drop-shadow-sm md:text-5xl"><AnimatedNumber value={12} /></p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 sm:text-sm">Years Experience</p>
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 p-3 shadow-md shadow-amber-950/20 ring-1 ring-white/40">
                      <Users className="h-5 w-5 text-slate-950" />
                    </div>
                  </div>
                  <p className="font-serif text-4xl font-bold leading-none tracking-tight text-amber-200 tabular-nums drop-shadow-sm md:text-5xl"><AnimatedNumber value={5000} /></p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 sm:text-sm">Satisfied Patients</p>
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 p-3 shadow-md shadow-amber-950/20 ring-1 ring-white/40">
                      <Award className="h-5 w-5 text-slate-950" />
                    </div>
                  </div>
                  <p className="font-serif text-4xl font-bold leading-none tracking-tight text-amber-200 tabular-nums drop-shadow-sm md:text-5xl"><AnimatedNumber value={5} /></p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 sm:text-sm">Expert Therapists</p>
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                <div className="relative z-10">
                  <div className="flex justify-center mb-2">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 p-3 shadow-md shadow-amber-950/20 ring-1 ring-white/40">
                      <Activity className="h-5 w-5 text-slate-950" />
                    </div>
                  </div>
                  <p className="font-serif text-4xl font-bold leading-none tracking-tight text-amber-200 tabular-nums drop-shadow-sm md:text-5xl"><AnimatedNumber value={8} /></p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 sm:text-sm">Specialized Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Line />
      <ScrollReveal as="section" aria-label="Hrishikesh Physio Home" className="bg-slate-100 py-8 sm:py-10">
        <div className="mx-auto w-[90%] max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg lg:w-3/4">
          <img
            src="https://res.cloudinary.com/dlofql51b/image/upload/v1795188664/file_0000000020808207ad0e409c416af682_w01ovr.png"
            alt="Hrishikesh Physio Home and Child Rehabilitation Center"
            className="block h-auto w-full"
          />
        </div>
      </ScrollReveal>
      <ScrollReveal as="section" className="bg-white py-16 sm:py-20" aria-labelledby="care-approach-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              Care that puts you first
            </p>
            <h2 id="care-approach-heading" className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Experienced team. Personalized treatment.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our experienced physiotherapy team takes time to understand your needs, goals, and daily life.
              From your first assessment onward, your care is shaped around you—not a one-size-fits-all plan.
            </p>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal as="article" className="rounded-2xl bg-teal-50 p-6" delay={80}>
              <Award className="mb-4 h-8 w-8 text-teal-700" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-slate-900">Experienced professionals</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Skilled therapists bring thoughtful, hands-on guidance to every stage of your recovery.
              </p>
            </ScrollReveal>
            <ScrollReveal as="article" className="rounded-2xl bg-sky-50 p-6" delay={150}>
              <HeartPulse className="mb-4 h-8 w-8 text-sky-700" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-slate-900">A plan made for you</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Treatment is tailored to your condition, comfort, and personal recovery goals.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal className="flex justify-center">
        <Inst
          facebookPage="profile.php?id=61578228281780"
          instagramUsername="drhrishikesh"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ConsultantProfile />
      </ScrollReveal>

    {/* Services Cards Section */}
<section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <ScrollReveal as="h2" className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
    Our Specialized Services
  </ScrollReveal>

  {/* ✅ Single grid wrapper for all cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {/* Physiotherapy Card */}
    <ScrollReveal className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-blue-700 text-white text-center">
        <Activity className="w-10 h-10 mx-auto mb-2" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Physiotherapy</h3>
        <p className="text-gray-600 mb-4">
          Specialized treatment to restore movement and function affected by injury, illness or disability.
        </p>
      </div>
      <div className="px-6 pb-6">
        <img
          src="https://plus.unsplash.com/premium_photo-1661901748991-17870b6614af?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHBoeXNpb3RoZXJhcHl8ZW58MHx8MHx8fDA%3D"
          alt="Patient accommodation"
          className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
        />
      </div>
    </ScrollReveal>

    {/* Child Rehabilitation Card */}
    <ScrollReveal delay={70} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-sky-300 text-white text-center">
        <Heart className="w-10 h-10 mx-auto mb-2" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Child Rehabilitation</h3>
        <p className="text-gray-600 mb-4">
          Specialized care for children with developmental, physical, or neurological challenges.
        </p>
      </div>
      <div className="px-6 pb-6">
        <img
          src="https://images.unsplash.com/photo-1708687045030-26702e62fc65?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGQlMjBwaHlzaW90aGVyYXB5fGVufDB8fDB8fHww"
          alt="Patient accommodation"
          className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
        />
      </div>
    </ScrollReveal>

    {/* ✅ Sports Physiotherapy Card (Middle) */}
    <ScrollReveal delay={140} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-blue-700 text-white text-center">
        <Activity className="w-10 h-10 mx-auto mb-2" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Sports Physiotherapy</h3>
        <p className="text-gray-600 mb-4">
          Sports physiotherapy is a specialized branch that focuses on prevention, treatment, and rehabilitation of sports-related injuries.
        </p>
      </div>
      <div className="px-6 pb-6">
        <img
          src="https://images.unsplash.com/photo-1748112444029-de3c77529cd9?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHNwb3J0cyUyMGluanVyeXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Sports physiotherapy"
          className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
        />
      </div>
    </ScrollReveal>

    {/* Pain Management Card */}
    <ScrollReveal delay={210} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-red-600 text-white text-center">
        <Shield className="w-10 h-10 mx-auto mb-2" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Pain Management</h3>
        <p className="text-gray-600 mb-4">
          Comprehensive approaches to reduce pain and improve quality of life for chronic conditions.
        </p>
      </div>
      <div className="px-6 pb-6">
        <img
          src="https://plus.unsplash.com/premium_photo-1663075848781-6ae8daf22936?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Pain management"
          className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
        />
      </div>
    </ScrollReveal>

    {/* Comfortable Patient Accommodation Card */}
    <ScrollReveal delay={280} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-teal-500 text-white text-center">
        <Bed className="w-10 h-10 mx-auto mb-2" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Comfortable Patient Accommodation</h3>
        <p className="text-gray-600 mb-4">
          Well-equipped, comfortable facilities designed for patients requiring extended care.
        </p>
      </div>
      <div className="px-6 pb-6">
        <img
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2953&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Patient accommodation"
          className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
        />
      </div>
    </ScrollReveal>

    {/* Stroke Rehabilitation & Spinal Cord Injury Card */}
    <ScrollReveal delay={350} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-yellow-400 text-white text-center">
        <HeartPulseIcon className="w-10 h-10 mx-auto mb-2" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Stroke Rehabilitation & Spinal Cord Injury</h3>
        <p className="text-gray-600 mb-4">
          Programs designed to help regain strength, movement, and independence.
        </p>
      </div>
      <div className="px-6 pb-6">
        <img
          src="https://media.istockphoto.com/id/1050434764/photo/mature-backache-exam.jpg?s=2048x2048&w=is&k=20&c=06bSIknVXl-K6TkrnbC54QFxrvgHymWsyYxep00FxWg="
          alt="Stroke rehabilitation"
          className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
        />
      </div>
    </ScrollReveal>

    {/* Wheelchair Accessible Environment Card */}
    <ScrollReveal delay={420} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-rose-400 text-white text-center">
        <Accessibility className="w-10 h-10 mx-auto mb-2" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Wheelchair Accessible Environment</h3>
        <p className="text-gray-600 mb-4">
          Fully wheelchair accessible, ensuring comfort and independence for all patients.
        </p>
      </div>
      <div className="px-6 pb-6">
        <img
          src="https://cdn.pixabay.com/photo/2016/08/29/23/47/wheelchair-1629490_1280.jpg"
          alt="Wheelchair accessible"
          className="w-full h-48 object-cover sm:h-40 md:h-40 lg:h-36"
        />
      </div>
    </ScrollReveal>

  </div>
</section>

      <ScrollReveal as="section" id="booking" className="bg-gradient-to-r from-sky-700 to-teal-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Appointments</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Ready to take the next step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-slate-600">
            Login or register to book appointments and manage your care.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-teal-700 px-6 py-3 font-semibold text-teal-800 transition hover:bg-teal-50"
            >
              Login
            </Link>
          </div>
        </div>
      </ScrollReveal>
      <GallerySection />
      <AboutUs/>
      <div>
      <profile/>
      </div>
      <Footer/>
   
      </div>
      
  );
}