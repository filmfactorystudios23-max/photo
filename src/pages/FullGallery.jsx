import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePhoto } from "../context/PhotoContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FullGallery = () => {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);
  const { groupedCategories, loading } = usePhoto();

  // Get all images from all categories
  const allImages = groupedCategories.flatMap(category => category.images.map(img => img.url));

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

  if (loading) {
    return (
      <div className="full-gallery">
        <div className="section__container" style={{ paddingTop: 0 }}>
          <div className="full-gallery__header">
            <h1 className="section__header">Complete Gallery</h1>
            <Skeleton height={40} width={120} style={{ borderRadius: "4px" }} />
          </div>

          <div className="full-gallery__grid">
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
              {Array.from({ length: 20 }, (_, index) => (
                <div key={index} className="full-gallery__item">
                  <Skeleton height={300} style={{ borderRadius: "8px" }} />
                </div>
              ))}
            </SkeletonTheme>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="full-gallery">
      <div className="section__container" style={{ paddingTop: 0 }}>
        <div className="full-gallery__header">
          <h1 className="section__header">Complete Gallery</h1>
          <button className="btn" onClick={goBack}>Back to Home</button>
        </div>

        <div className="full-gallery__grid">
          {allImages.map((image, index) => (
            <div key={index} className="full-gallery__item">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                onClick={() => openModal(image)}
              />
            </div>
          ))}
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
      </div>
    </div>
  );
};

export default FullGallery;