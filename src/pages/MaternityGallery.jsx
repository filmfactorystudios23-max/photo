import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { galleryImages } from "../assets/imageConfig.js";

const maternityImages = galleryImages.maternity;

const MaternityGallery = () => {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);

  const goBack = () => {
    navigate('/');
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="maternity-gallery">
      <div className="section__container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 className="section__header">Maternity Photography</h1>
          <button className="btn" onClick={goBack}>Back to Home</button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth <= 768 ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: window.innerWidth <= 768 ? "10px" : "20px",
          padding: "20px 0"
        }}>
          {maternityImages.map((image, index) => (
            <div key={index} style={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease"
            }}>
              <img
                src={image}
                alt={`Maternity photography ${index + 1}`}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.target.parentElement.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.parentElement.style.transform = "scale(1)"}
                onClick={() => openModal(image)}
              />
            </div>
          ))}
        </div>

        {modalImage && (
          <div className="modal__overlay" onClick={closeModal}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
              <img src={modalImage} alt="Full size maternity photography" />
              <button className="modal__close" onClick={closeModal}>
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaternityGallery;