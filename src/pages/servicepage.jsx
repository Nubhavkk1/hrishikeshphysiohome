import React, { useEffect, useState } from 'react';
import { 
  CheckCircle,
  Calendar
} from 'lucide-react';

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: "Musculoskeletal Physiotherapy",
      description: "Comprehensive treatment for bones, muscles, and joints",
      treatments: [
        "Orthopedic rehab (post-surgery, fractures)",
        "Back and neck pain treatment", 
        "Sports injury management",
        "Joint mobilization & manipulation",
        "Postural correction therapy"
      ]
    },
    {
      title: "Neurological Physiotherapy",
      description: "Specialized care for nervous system disorders",
      treatments: [
        "Stroke rehabilitation",
        "Spinal cord injury management",
        "Parkinson's disease therapy", 
        "Multiple sclerosis rehab",
        "Cerebral palsy therapy"
      ]
    },
    {
      title: "Cardiopulmonary Physiotherapy", 
      description: "Heart and lung rehabilitation services",
      treatments: [
        "Post-cardiac surgery rehab",
        "COPD and asthma management",
        "Post-COVID rehabilitation",
        "Chest physiotherapy"
      ]
    },
    {
      title: "Pediatric Physiotherapy",
      description: "Specialized care for children and infants",
      treatments: [
        "Developmental delay treatment",
        "Muscular dystrophy and genetic disorders",
        "Gait training",
        "Pediatric orthopedic rehab"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className={`max-w-4xl mx-auto mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-left mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-800 mb-4 leading-tight">
            Our Physiotherapy Services
          </h1>
          <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            Hrishikesh Physio Home delivers high-quality, affordable healthcare with compassion. 
            Our home service combines advanced physiotherapy techniques with skilled professionals 
            for exceptional patient care.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="p-6 sm:p-8">
                {/* Service Header */}
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h2>
                  <p className="text-base text-gray-600 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Treatments List */}
                <div className="space-y-3 mb-6">
                  {service.treatments.map((treatment, treatmentIndex) => (
                    <div 
                      key={treatmentIndex}
                      className="flex items-start"
                    >
                      <div className="w-2 h-2 bg-teal-600 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                      <span className="text-gray-700 font-light leading-relaxed text-sm sm:text-base">
                        {treatment}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Booking Button */}
                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Features Section */}
        <div className={`mt-12 bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Why Choose Hrishikesh Physio Home?
          </h2>
          
          <div className="space-y-6 mb-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Expert doctors and specialists</h3>
                <p className="text-gray-600 font-light text-sm">Qualified physiotherapists with years of experience</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Modern medical equipment and technology</h3>
                <p className="text-gray-600 font-light text-sm">State-of-the-art tools for effective treatment</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">24/7 home care services</h3>
                <p className="text-gray-600 font-light text-sm">Convenient treatment in the comfort of your home</p>
              </div>
            </div>
          </div>

          <button className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md">
            Learn More About Us
          </button>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
          {[
            { number: "500+", label: "Patients Treated" },
            { number: "5+", label: "Years Experience" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Home Service" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="text-2xl sm:text-3xl font-light text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 font-light text-xs sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;