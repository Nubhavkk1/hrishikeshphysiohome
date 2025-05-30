import { useState } from 'react';

export default function ImageGallery() {
  // Sample data for the image gallery
  const galleryImages = [
    { id: 1, src: "/images/child.jpg", alt: "Gallery image 1", title: "Child Rehabilitation", description: "Special care for children" },
    { id: 2, src: "/images/img8.jpg", alt: "Gallery image 2", title: "With Diganta Das", description: "Senior journalist,CMD od DPRC & DCRS " },
    { id: 3, src: "/images/img9.jpg", alt: "Gallery image 3", title: "With our Chief Minister", description: "CM of ASSAM Dr. Himanta Biswa Sarma" },
    { id: 4, src: "/images/img10.jpg", alt: "Gallery image 4", title: "Working days", description: "Our lead physiotherapist during working days at DPRC" },
    { id: 5, src: "/images/img11.jpg", alt: "Gallery image 5", title: "With Nandil Biswa Sarma", description: "at CM Himanta Biswa Sarma residence" },
    { id: 6, src: "/images/img12.jpg", alt: "Gallery image 6", title: "With Dr. Nani Gopal Mahanta", description: "with the honorable VC of GU " },
    { id: 7, src: "/images/image25.jpg", alt: "Gallery image 1", title: "As Lead Physiotherapist in Gauhati University", description: "During GU Hospital duties as a senior physiotherapist" },
    { id: 8, src: "/images/image30.jpg", alt: "Gallery image 1", title: "Working days at DPRC", description: "At Diganta's Physiotherapy & Child Rehabilitation Center" },
    { id: 8, src: "/images/free.jpg", alt: "Gallery image 1", title: "During free camp ", description: " Hrishikesh Das as senior physiotherapist during Free camp in rural areas" },
  ];
 
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setActiveIndex(index);
  };
  
  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? galleryImages.length - 1 : activeIndex - 1;
    setSelectedImage(galleryImages[newIndex]);
    setActiveIndex(newIndex);
  };
  
  const handleNext = () => {
    const newIndex = activeIndex === galleryImages.length - 1 ? 0 : activeIndex + 1;
    setSelectedImage(galleryImages[newIndex]);
    setActiveIndex(newIndex);
  };

  return (
    <div id= "Gallery" className="max-w-6xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Image collage - responsive for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-xl h-48 sm:h-40 ${
              selectedImage?.id === image.id ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => handleImageClick(image, index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay and text that appears on hover/touch */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 focus:opacity-100 active:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <h3 className="font-semibold text-lg">{image.title}</h3>
              <p className="text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls - centered */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-4">
          <button 
            className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 flex items-center justify-center w-12 h-12"
            onClick={handlePrevious}
            aria-label="Previous"
          >
            &lt;
          </button>
          <button 
            className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 flex items-center justify-center w-12 h-12"
            onClick={handleNext}
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
