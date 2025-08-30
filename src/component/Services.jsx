import React, { useState } from 'react';
import { Heart, Brain, Baby, Users, Activity, Zap, Waves, Target, Award, Shield, Smartphone, HeadphonesIcon, Phone, UserCheck, Home, Image, Calendar, ChevronDown, Menu, X } from 'lucide-react';

const PhysiotherapyServices = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  const services = [
    {
      id: 1,
      title: "Musculoskeletal Physiotherapy",
      icon: <Activity className="w-8 h-8" />,
      color: "from-blue-500 to-blue-700",
      services: [
        "Orthopedic rehab (post-surgery, fractures)",
        "Back and neck pain treatment",
        "Sports injury management",
        "Joint mobilization & manipulation",
        "Postural correction therapy"
      ]
    },
    {
      id: 2,
      title: "Neurological Physiotherapy",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-purple-700",
      services: [
        "Stroke rehabilitation",
        "Spinal cord injury management",
        "Parkinson's disease therapy",
        "Multiple sclerosis rehab",
        "Cerebral palsy therapy"
      ]
    },
    {
      id: 3,
      title: "Cardiopulmonary Physiotherapy",
      icon: <Heart className="w-8 h-8" />,
      color: "from-red-500 to-red-700",
      services: [
        "Post-cardiac surgery rehab",
        "COPD and asthma management",
        "Post-COVID rehabilitation",
        "Chest physiotherapy"
      ]
    },
    {
      id: 4,
      title: "Pediatric Physiotherapy",
      icon: <Baby className="w-8 h-8" />,
      color: "from-pink-500 to-pink-700",
      services: [
        "Developmental delay treatment",
        "Muscular dystrophy and genetic disorders",
        "Gait training",
        "Pediatric orthopedic rehab"
      ]
    },
    {
      id: 5,
      title: "Geriatric Physiotherapy",
      icon: <Users className="w-8 h-8" />,
      color: "from-amber-500 to-amber-700",
      services: [
        "Fall prevention programs",
        "Osteoarthritis and osteoporosis care",
        "Mobility enhancement for elderly",
        "Balance retraining"
      ]
    },
    {
      id: 6,
      title: "Women's Health Physiotherapy",
      icon: <Heart className="w-8 h-8" />,
      color: "from-rose-500 to-rose-700",
      services: [
        "Prenatal & postnatal care",
        "Pelvic floor rehabilitation",
        "Incontinence treatment",
        "Menopause-related therapy"
      ]
    },
    {
      id: 7,
      title: "Manual Therapy",
      icon: <Target className="w-8 h-8" />,
      color: "from-green-500 to-green-700",
      services: [
        "Myofascial release",
        "Craniosacral therapy",
        "Deep tissue mobilization",
        "Soft tissue manipulation"
      ]
    },
    {
      id: 8,
      title: "Electrotherapy & Modalities",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500 to-yellow-700",
      services: [
        "Ultrasound therapy",
        "TENS (Transcutaneous Electrical Nerve Stimulation)",
        "IFT (Interferential Therapy)",
        "EMS (Electrical Muscle Stimulation)",
        "Shockwave therapy",
        "Laser therapy",
        "Cryotherapy / Thermotherapy units"
      ]
    },
    {
      id: 10,
      title: "Dry Needling & Acupuncture",
      icon: <Target className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-700",
      services: [
        "Trigger point dry needling",
        "Electroacupuncture",
        "Meridian therapy"
      ]
    },
    {
      id: 11,
      title: "Kinesiology & Taping Techniques",
      icon: <Shield className="w-8 h-8" />,
      color: "from-teal-500 to-teal-700",
      services: [
        "Kinesio taping",
        "Rigid taping for injury prevention & recovery"
      ]
    },
    {
      id: 12,
      title: "Vestibular Rehabilitation",
      icon: <Waves className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-700",
      services: [
        "Dizziness & balance disorder treatment",
        "BPPV (Benign Paroxysmal Positional Vertigo) rehab"
      ]
    },
    {
      id: 13,
      title: "Sports Injury Rehabilitation",
      icon: <Award className="w-8 h-8" />,
      color: "from-orange-500 to-orange-700",
      services: [
        "ACL, rotator cuff, meniscus, Achilles tear recovery",
        "Return-to-sport programs"
      ]
    },
    {
      id: 14,
      title: "Athlete Performance Programs",
      icon: <Award className="w-8 h-8" />,
      color: "from-emerald-500 to-emerald-700",
      services: [
        "Strength and conditioning",
        "Functional movement screening",
        "Agility, speed, and plyometric training",
        "Biomechanical analysis"
      ]
    },
    {
      id: 15,
      title: "Prehabilitation Programs",
      icon: <Shield className="w-8 h-8" />,
      color: "from-violet-500 to-violet-700",
      services: [
        "Injury prevention training",
        "Mobility and flexibility enhancement",
        "Muscle imbalances correction"
      ]
    },
    {
      id: 22,
      title: "Massage Therapy",
      icon: <Target className="w-8 h-8" />,
      color: "from-lime-500 to-lime-700",
      services: [
        "Deep tissue massage",
        "Sports massage",
        "Lymphatic drainage massage"
      ]
    },
    {
      id: 23,
      title: "24x7 Emergency Physiotherapy Response",
      icon: <Phone className="w-8 h-8" />,
      color: "from-red-600 to-red-800",
      services: [
        "Emergency musculoskeletal care",
        "Home visit team",
        "Ambulance tie-ups for injury transport"
      ]
    },
    {
      id: 24,
      title: "Tele-rehabilitation Services",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-blue-400 to-blue-600",
      services: [
        "Remote sessions via video",
        "App-based home exercise guidance",
        "Virtual progress tracking"
      ]
    },
    {
      id: 25,
      title: "Health & Lifestyle Counseling",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-green-600 to-green-800",
      services: [
        "Ergonomic advice (for workplace/office)",
        "Dietitian & nutritionist consultation",
        "Stress management"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
      </nav>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              No1. Brand In PhysioTherapy
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We provide world class Physiotherapy services all across NE India and Assam
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="mr-6">
              <img 
                src="/images/logoxkx.jpg"
                alt="Physiotherapy Logo"
                className="w-20 h-14 md:w-20 md:h-20 "
              />
            </div>
            <h2 className="text-xl md:text-5xl font-bold text-gray-800">
              Hrishikesh's Physio Home & Child Rehabilitation center
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
           Best Physiotherapy Services In Bijaynagar, Uparhali, Plashbari, Mirza, Azara
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                activeCategory === service.id ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => setActiveCategory(activeCategory === service.id ? null : service.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`}></div>
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-white bg-opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className="text-white mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Service Count */}
                <div className="text-white text-opacity-90 text-sm mb-4">
                  {service.services.length} specialized treatments
                </div>

                {/* Expand Indicator */}
                <div className="flex items-center justify-between text-white text-opacity-80">
                  <span className="text-sm font-medium">
                    {activeCategory === service.id ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  <div className={`transform transition-transform duration-300 ${
                    activeCategory === service.id ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Services List */}
                {activeCategory === service.id && (
                  <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                    <ul className="space-y-3">
                      {service.services.map((item, index) => (
                        <li key={index} className="flex items-start text-white text-opacity-90">
                          <svg className="w-4 h-4 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Recovery Journey?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert physiotherapists are here to help you achieve your health and wellness goals
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Book Your Consultation Today
            </button>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">19+</div>
              <div className="text-gray-300">Specialized Services</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">60+</div>
              <div className="text-gray-300">Treatment Options</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">1000+</div>
              <div className="text-gray-300">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-gray-300">Emergency Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysiotherapyServices;