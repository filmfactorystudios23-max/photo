import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { uiAssets } from "../../assets/imageConfig.js";

const FloatingButtons = () => {
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
    const phoneNumber = "919597230737";
    const message = "Hello! I'm interested in your photography services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    const instagramUrl = "https://www.instagram.com/filmfactory_studios/?igsh=MWY5NHNzZHE5MXhoaw%3D%3D&utm_source=qr#";
    window.open(instagramUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919597230737";
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        zIndex: 1000,
      }}
    >
      {/* Phone Button */}
      <div
        onClick={handlePhoneClick}
        style={{
          width: isMobile ? "45px" : "50px",
          height: isMobile ? "45px" : "50px",
          backgroundColor: "#25d366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 15px rgba(37, 211, 102, 0.3)";
        }}
      >
        <Phone size={isMobile ? 20 : 24} color="white" />
      </div>

      {/* Instagram Button */}
      <img
        src={uiAssets.instagram}
        alt="Instagram"
        onClick={handleInstagramClick}
        style={{
          width: isMobile ? "45px" : "50px",
          height: isMobile ? "45px" : "50px",
          cursor: "pointer",
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

      {/* WhatsApp Button */}
      <img
        src={uiAssets.whatsapp}
        alt="WhatsApp"
        onClick={handleWhatsAppClick}
        style={{
          width: isMobile ? "45px" : "60px",
          height: isMobile ? "45px" : "60px",
          cursor: "pointer",
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
    </div>
  );
};

export default FloatingButtons;