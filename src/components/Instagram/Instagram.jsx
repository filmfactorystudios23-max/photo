import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";

// Import random selection of images from assets
import img1 from "../../assets/banner1.jpg";
import img2 from "../../assets/child1.jpg";
import img3 from "../../assets/wedding.jpg";
import img4 from "../../assets/maternity1.jpg";
import img5 from "../../assets/AR_00586.jpg";
import img6 from "../../assets/IMG_2734.jpg";
import img7 from "../../assets/DSC09907.jpg";
import img8 from "../../assets/YAZH8435.jpg";
import img9 from "../../assets/IMG_4170.jpg";
import img10 from "../../assets/AR_00926.jpg";
import img11 from "../../assets/child2.jpg";
import img12 from "../../assets/maternity3.jpg";
import img13 from "../../assets/IMG_3287.jpg";
import img14 from "../../assets/YAZH8441.jpg";
import img15 from "../../assets/IMG_2789.jpg";

import mapbutton from "../../assets/mapbutton.svg";
import MapIframe from "../MapFrame";

const allImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const Instagram = () => {
  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    // Randomly select 10 images
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    setDisplayImages(shuffled.slice(0, 10));
  }, []);

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
        {displayImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`instagram ${index + 1}`}
            style={{
              width: "200px",
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
              Get Direction <img src={mapbutton} alt="" />
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
