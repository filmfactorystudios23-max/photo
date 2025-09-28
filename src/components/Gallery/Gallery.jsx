import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePhoto } from "../../context/PhotoContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Gallery = () => {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);
  const { groupedCategories, loading } = usePhoto();

  // Get all images from all categories except Slider and MobileSlider
  const allImages = groupedCategories
    .filter(category => !["Slider", "MobileSlider"].includes(category.category_name))
    .flatMap(category => category.images.map(img => img.url));

  // Randomly select 8 images for preview
  const shuffledImages = [...allImages].sort(() => 0.5 - Math.random());
  const previewImages = shuffledImages.slice(0, 8);

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

  if (loading) {
    return (
      <section className="section__container gallery__container">
        <h2 className="section__header">~ GALLERY ~</h2>
        <div className="gallery__grid">
          <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Skeleton key={index} height={300} style={{ borderRadius: "8px" }} />
            ))}
          </SkeletonTheme>
        </div>
        <div className="gallery__btn">
          <Skeleton height={45} width={150} style={{ borderRadius: "4px" }} />
        </div>
      </section>
    );
  }

  return (
    <section className="section__container gallery__container">
      <h2 className="section__header">~ GALLERY ~</h2>
      <div className="gallery__grid">
        {previewImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="photography gallery"
            style={{
              width: '280px',
              height: '420px',
              objectFit: 'cover'
            }}
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
