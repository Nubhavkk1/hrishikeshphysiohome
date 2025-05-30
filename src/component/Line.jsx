import { useState, useEffect } from "react";

const MovingAddressBanner = () => {
  const [position, setPosition] = useState(0);
  const address = "{ We Are Located At Uparhali,Bijoynagar,Kamrup,Assam } [+917002149453]";
  // Duplicate the address to create a seamless loop
  const fullText = `${address} • ${address} • ${address} • `;
  
  useEffect(() => {
    const animationSpeed = 1; // pixels per frame
    const animationFrame = requestAnimationFrame;
    let lastTime = 0;

    const animate = (time) => {
      if (lastTime !== 0) {
        // Move the text position
        setPosition((prevPosition) => {
          // Reset position when text has moved sufficiently to create loop illusion
          if (prevPosition <= -1000) return 0;
          return prevPosition - animationSpeed;
        });
      }
      lastTime = time;
      frameId = animationFrame(animate);
    };

    let frameId = animationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-blue-800 to-blue-400 overflow-hidden py-3 shadow-lg">
      <div className="relative flex items-center h-full">
        {/* Moving text container */}
        <div 
          className="whitespace-nowrap text-white font-semibold tracking-wider"
          style={{ transform: `translateX(${position}px)` }}
        >
          {fullText}
        </div>
        
        {/* Gradient overlay on the edges for smooth fade effect */}
        <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-blue-800 to-transparent" />
        <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-blue-400 to-transparent" />
      </div>
    </div>
  );
};

export default MovingAddressBanner;