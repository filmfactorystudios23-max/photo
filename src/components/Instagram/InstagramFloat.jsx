import React, { useState, useEffect } from "react";
import { uiAssets } from "../../assets/imageConfig.js";

const InstagramFloat = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleInstagramClick = () => {
    const instagramUrl = "https://www.instagram.com/filmfactory_studios/?igsh=MWY5NHNzZHE5MXhoaw%3D%3D&utm_source=qr#";
    window.open(instagramUrl, '_blank');
  };

  return (
    <img
      src={uiAssets.instagram}
      alt="Instagram"
      onClick={handleInstagramClick}
      style={{
        position: "fixed",
        bottom: "150px",
        right: "20px",
        width: isMobile ? "45px" : "50px",
        height: isMobile ? "45px" : "50px",
        cursor: "pointer",
        zIndex: 1000,
        transition: "transform 0.3s ease, opacity 0.3s ease",
        borderRadius: "10px",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
        e.target.style.opacity = "0.8";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.opacity = "1";
      }}
    />
  );
};

export default InstagramFloat;