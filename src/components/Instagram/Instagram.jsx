import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";

import { uiAssets } from "../../assets/imageConfig.js";
import { usePhoto } from "../../context/PhotoContext";
import MapIframe from "../MapFrame";

const Instagram = () => {
  const { groupedCategories } = usePhoto();

  // Get all images from all categories
  const allImages = groupedCategories.flatMap(category => category.images.map(img => img.url));

  const handleDirectionClick = () => {
    // Open the specific Google Maps link
    const googleMapsUrl = "https://maps.app.goo.gl/KR8FtYPRa4eyB9ca6";
    window.open(googleMapsUrl, "_blank");
  };

  const handlePhoneClick = () => {
    // Open phone dialer
    window.location.href = "tel:+919597230737";
  };

  return (
    <section className="section__container instagram__container">
      <h2 className="section__header">~ INSTAGRAM ~</h2>

      <div className="instagram__flex">
        {allImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`instagram ${index + 1}`}
            style={{
              width: "135px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ))}
      </div>
      <div style={{ paddingTop: "50px" }} id="contact">
        <h2 className="section__header">~ CONTACT ~</h2>

        <div className="instagram-map-contact-container">
          <div className="mapContainer">
            <MapIframe />
            <button className="directionButton" onClick={handleDirectionClick}>
              Get Direction <img src={uiAssets.mapbutton} alt="" />
            </button>
          </div>

          <div className="instagram-contact-card">
            <h2 className="instagram-contact-title">Contact Info</h2>

            <div className="instagram-contact-details">
              <div className="instagram-contact-item">
                <i className="ri-map-pin-line instagram-contact-icon"></i>
                <span>
                  V.P Theivam complex, 61/C, Tirupparankunram Rd, Vasanth Nagar,
                  Madurai, Tamil Nadu 625003
                </span>
              </div>

              <div className="instagram-contact-item">
                <i className="ri-phone-line instagram-contact-icon"></i>
                <span>+91 95972 30737</span>
              </div>

              <div className="instagram-contact-item">
                <i className="ri-mail-line instagram-contact-icon"></i>
                <span> filmfactorystudios23@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="phone-button-container">
          <button className="phone-button" onClick={handlePhoneClick}>
            <Phone size={24} />
            <span>Call Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
