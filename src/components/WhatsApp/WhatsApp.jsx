import React, { useState, useEffect } from "react";
import { uiAssets } from "../../assets/imageConfig.js";

const WhatsApp = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (include country code without +)
    const phoneNumber = "919597230737"; // +91 95972 30737
    const message = "Hello! I'm interested in your photography services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <img
      src={uiAssets.whatsapp}
      alt="WhatsApp"
      onClick={handleWhatsAppClick}
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: isMobile ? "45px" : "60px",
        height: isMobile ? "45px" : "60px",
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

export default WhatsApp;