import React from "react";
import { useNavigate } from "react-router-dom";
import { galleryImages } from "../assets/imageConfig.js";

const weddingImages = galleryImages.wedding;

const WeddingGallery = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  const goToFullGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="wedding-gallery">
      <div className="section__container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 className="section__header">Wedding Photography</h1>
          <button className="btn" onClick={goBack}>Back to Home</button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          padding: "20px 0"
        }}>
          {weddingImages.map((image, index) => (
            <div key={index} style={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease"
            }}>
              <img
                src={image}
                alt={`Wedding photography ${index + 1}`}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.target.parentElement.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.parentElement.style.transform = "scale(1)"}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="btn" onClick={goToFullGallery}>VIEW COMPLETE GALLERY</button>
        </div>
      </div>
    </div>
  );
};

export default WeddingGallery;