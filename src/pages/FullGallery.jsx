import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import banner images
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";

// Import children images
import child from "../assets/child.jpg";
import child1 from "../assets/child1.jpg";
import child2 from "../assets/child2.jpg";
import child3 from "../assets/child3.jpg";
import child4 from "../assets/child4.jpg";
import child5 from "../assets/child5.JPG";

// Import wedding images
import wedding from "../assets/wedding.jpg";
import wedding1 from "../assets/wedding1.jpg";

// Import maternity images
import maternity from "../assets/maternity.jpg";
import maternity1 from "../assets/maternity1.jpg";
import maternity2 from "../assets/ maternity2.jpg";
import maternity3 from "../assets/maternity3.jpg";
import maternity4 from "../assets/maternity4.jpg";

// Import all other images (excluding logo)
import img1 from "../assets/092A3379.jpg";
import img2 from "../assets/092A3457.jpg";
import img3 from "../assets/092A4203.jpg";
import img4 from "../assets/13.jpg";
import img5 from "../assets/AR_00586.jpg";
import img6 from "../assets/AR_00590.jpg";
import img7 from "../assets/AR_00596.jpg";
import img8 from "../assets/AR_00650.jpg";
import img9 from "../assets/AR_00657.jpg";
import img10 from "../assets/AR_00731.jpg";
import img11 from "../assets/AR_00732.jpg";
import img12 from "../assets/AR_00767.jpg";
import img13 from "../assets/AR_00788.jpg";
import img14 from "../assets/AR_00866.jpg";
import img15 from "../assets/AR_00926.jpg";
import img16 from "../assets/AR_00948.jpg";
import img17 from "../assets/DSC09845.jpg";
import img18 from "../assets/DSC09860.jpg";
import img19 from "../assets/DSC09870.jpg";
import img20 from "../assets/DSC09907.jpg";
import img21 from "../assets/IMG_2630.jpg";
import img22 from "../assets/IMG_2698.jpg";
import img23 from "../assets/IMG_2716.jpg";
import img24 from "../assets/IMG_2734.jpg";
import img25 from "../assets/IMG_2789.jpg";
import img26 from "../assets/IMG_2808.jpg";
import img27 from "../assets/IMG_2869.jpg";
import img28 from "../assets/IMG_2916.jpg";
import img29 from "../assets/IMG_2971.jpg";
import img30 from "../assets/IMG_2977.jpg";
import img31 from "../assets/IMG_2997.jpg";
import img32 from "../assets/IMG_3191.jpg";
import img33 from "../assets/IMG_3237.jpg";
import img34 from "../assets/IMG_3255 a.jpg";
import img35 from "../assets/IMG_3287.jpg";
import img36 from "../assets/IMG_3294.jpg";
import img37 from "../assets/IMG_3299.jpg";
import img38 from "../assets/IMG_3301.jpg";
import img39 from "../assets/IMG_3303.jpg";
import img40 from "../assets/IMG_3309.jpg";
import img41 from "../assets/IMG_4170.jpg";
import img42 from "../assets/IMG_7194.jpg";
import img43 from "../assets/IMG_7468.jpg";
import img44 from "../assets/IMG_7515.jpg";
import img45 from "../assets/IMG_7555.jpg";
import img46 from "../assets/YAZH8358 copy.jpg";
import img47 from "../assets/YAZH8405.jpg";
import img48 from "../assets/YAZH8435.jpg";
import img49 from "../assets/YAZH8441.jpg";
import img50 from "../assets/YAZH8696 copy.jpg";
import img51 from "../assets/YAZH9982-Recovered.jpg";

const allImages = [
  // Banner images
  banner1, banner2, banner3, banner4,
  // Children images
  child, child1, child2, child3, child4, child5,
  // Wedding images
  wedding, wedding1,
  // Maternity images
  maternity, maternity1, maternity2, maternity3, maternity4,
  // All other gallery images
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
  img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
  img41, img42, img43, img44, img45, img46, img47, img48, img49, img50, img51
];

const FullGallery = () => {
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