import React from "react";

const GoogleMapsButton = () => {
  const mapLink = "https://maps.app.goo.gl/xFTFvVgM6zMchNU36";

  return (
    <a
      href={mapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-15 right-2 z-50 transform -translate-y-2 -translate-x-2"
    >
      {/* Square Pulse */}
      <span className="absolute w-14 h-14 bg-pink-700 opacity-100 animate-pulse-square rounded-md"></span>

      {/* Icon Button */}
      <div className="relative z-10 bg-white w-14 h-14 shadow-lg flex items-center justify-center rounded-md hover:scale-105 transition p-0">
        <img
          src="/images/icon.png.png"
          alt="Google Maps"
          className="w-10 h-10 p-0 m-0"
        />
      </div>
    </a>
  );
};

export default GoogleMapsButton;
