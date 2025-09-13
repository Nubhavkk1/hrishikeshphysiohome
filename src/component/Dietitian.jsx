import React, { useState } from 'react';

// --- Reusable Icon Components (Unchanged) ---
const QualificationIcon = () => (
  <svg className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 18.782a12.108 12.108 0 01-9 2.218 12.108 12.108 0 01-9-2.218c0-2.652.88-5.14 2.457-7.124L12 14z" />
  </svg>
);

const ExperienceIcon = () => (
  <svg className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const SpecializationIcon = () => (
  <svg className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// --- Abstracted Collapsible Section Component ---
const DetailSection = ({ title, items, IconComponent, isOpen, onToggle }) => {
  return (
    <div>
      {/* Clickable Header to toggle visibility */}
      <h3
        onClick={onToggle}
        className="cursor-pointer flex justify-between items-center font-bold text-lg sm:text-xl border-b border-red-400/50 pb-2 mb-3"
      >
        <span>{title}</span>
        <svg className={`w-5 h-5 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </h3>

      {/* Collapsible content area */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="pt-3 space-y-2 sm:space-y-3 text-blue-800 text-sm sm:text-base">
          {items.map((item, i) => (
            <li key={i} className="flex items-start">
              <IconComponent />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default function App() {
  const [openSection, setOpenSection] = useState(null); // State to track the open section

  const physiotherapist = {
    name: "Amaya Das",
    role: "Registered Dietitian ",
    imageUrl: "https://placehold.co/150x150/ffffff/ef4444?text=Dr.+Das",
    rating: 5,
    qualifications: [
      "M.Sc. in Dietetics & Food Service Management",
      "Diploma in Diabetic Education",
      "Diploma in Food & Nutrition",
    ],
    experience: [
      "1 Year at National Health Mission (NHM)",
      "7 Years in a Multispeciality Hospital",
    ],
    specializations: [
      "Weight Management (Loss/Gain)",
      "Diabetes & Lifestyle Disease Nutrition",
      "PCOS / PCOD & Women's Health",
      "Child & Adolescent Nutrition",
      "Clinical & Therapeutic Diets",
      "Wellness & Preventive Nutrition",
    ],
  };
  
  // Data structure for sections to be rendered dynamically
  const sections = [
    {
      title: "Qualifications",
      items: physiotherapist.qualifications,
      IconComponent: QualificationIcon,
    },
    {
      title: "Experience",
      items: physiotherapist.experience,
      IconComponent: ExperienceIcon,
    },
    {
      title: "Specializations",
      items: physiotherapist.specializations,
      IconComponent: SpecializationIcon,
    },
  ];

  const handleToggle = (title) => {
    // If the clicked section is already open, close it. Otherwise, open it.
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <section className="bg-gray-100 font-sans antialiased flex items-center py-2  px-3 sm:px-2">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 sm:p-8">
            {/* --- Header (Unchanged) --- */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-center sm:text-left">
              <img
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto sm:mx-0"
                src={physiotherapist.imageUrl}
                alt={`Profile of ${physiotherapist.name}`}
              />
              <div className="mt-4 sm:mt-0">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{physiotherapist.name}</h2>
                <p className=" text-gray-800 text-xl sm:text-lg">{physiotherapist.role}</p>
                <div className="flex items-center mt-2 justify-center sm:justify-start">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-yellow-200">5/5 Rating</span>
                </div>
              </div>
            </div>

            {/* --- Refactored Details --- */}
            <div className="mt-6 sm:mt-8 space-y-4">
              {sections.map((section) => (
                <DetailSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  IconComponent={section.IconComponent}
                  isOpen={openSection === section.title}
                  onToggle={() => handleToggle(section.title)}
                />
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}