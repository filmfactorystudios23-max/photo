import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/IMG_3287.jpg";
import img2 from "../../assets/AR_00926.jpg";
import img3 from "../../assets/DSC09907.jpg";
import img4 from "../../assets/IMG_2734.jpg";
import img5 from "../../assets/IMG_4170.jpg";
import img6 from "../../assets/IMG_3460 copy.jpg";
import img7 from "../../assets/YAZH8435.jpg";
import img8 from "../../assets/child.jpg";

const Gallery = () => {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  const handleViewGallery = () => {
    navigate("/gallery");
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
    <section className="section__container gallery__container">
      <h2 className="section__header">~ GALLERY ~</h2>
      <div className="gallery__grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="photography gallery"
            onClick={() => openModal(img)}
          />
        ))}
      </div>
      <div className="gallery__btn">
        <button className="btn" onClick={handleViewGallery}>
          VIEW GALLERY
        </button>
      </div>

      {modalImage && (
        <div className="modal__overlay" onClick={closeModal}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Full size gallery image" />
            <button className="modal__close" onClick={closeModal}>
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
