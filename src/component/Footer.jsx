import { Instagram, Facebook, Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const socialLinks = [
    { icon: <Instagram size={20} />, name: "Instagram", url: "#" },
    { icon: <Facebook size={20} />, name: "Facebook", url: "#" },
    { icon: <Mail size={20} />, name: "Mail", url: "#" },
  ];

  return (
    <footer className="bg-white text-gray-700 shadow-lg border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="transform transition-transform duration-300 hover:scale-105">
            <h3 className="font-bold text-xl text-teal-600 text-center"> Hrishikesh Physio Home <br></br> & Child Rehabilitation Center</h3>
            
          </div>
          
          
          {/* <div className="flex items-center gap-6 my-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className={`transform transition-all duration-300 ${
                  hoveredIcon === social.name 
                    ? "text-blue-600 scale-125" 
                    : "text-gray-600 hover:text-blue-500"
                }`}
                aria-label={social.name}
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {social.icon}
              </a>
            ))}
          </div> */}
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-100 mt-4 pt-4 text-center">
          <p className="text-gray-600 text-sm transition-all duration-300 hover:text-blue-600">
            © 2025 Hrishikesh Physio Home & Child Rehabilitation Center. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2 transition-all duration-300 hover:text-blue-500">
            Website by Anubhav Designs +91 60027-79942
          </p>
        </div>
      </div>
    </footer>
  );
}