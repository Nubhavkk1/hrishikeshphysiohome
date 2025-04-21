import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const slideInterval = 5000; // 5 seconds between slides
  
  // Sample images - replace with your actual medical/physio images
  const slides = [
    {
      url: "/images/img6.png",
      alt: "Modern physiotherapy facility",
      caption: "State-of-the-art physiotherapy equipment"
    },
    {
      url: "/images/img2.png",
      alt: "Child rehabilitation session",
      caption: "Specialized care for children"
    },
    {
      url: "/images/img3.png",
      alt: "Pain management therapy",
      caption: "Advanced pain relief treatments"
    },
    
    {
      url: "/images/img4.png",
      alt: "Patient accommodation",
      caption: "Comfortable rooms for extended stays"
    },
    {
      url: "/images/img5.png",
      alt: "Patient accommodation",
      caption: "Child Rehabilitation & 24x7 Child Daycare"
    },
    {
      url: "/images/img1.png",
      alt: "Patient accommodation",
      caption: "Movement Therapy"
    }
  ];

  // Reset the interval when the slide changes
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides.length]);

  // Functions to navigate slides
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full overflow-hidden max-w-7xl mx-auto rounded-lg shadow-lg my-12 h-80 md:h-96 lg:h-112 group">
      {/* Main slide container */}
      <div 
        className="w-full h-full rounded-lg bg-gray-200 bg-cover bg-center duration-500 ease-in-out"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      >
        {/* Overlay with caption */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-center p-4 md:p-8">
          <div className="text-white text-center mb-8 md:mb-16">
            <h3 className="text-lg md:text-2xl font-semibold mb-2">{slides[currentIndex].caption}</h3>
          </div>
        </div>

        {/* Left Arrow */}
        <div className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronLeft onClick={goToPrevious} size={24} />
        </div>
        
        {/* Right Arrow */}
        <div className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight onClick={goToNext} size={24} />
        </div>
      </div>
      
      {/* Dots navigation */}
      <div className="flex justify-center absolute bottom-4 w-full">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`mx-1 w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}