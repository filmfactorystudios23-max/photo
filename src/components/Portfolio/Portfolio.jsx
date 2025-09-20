import React from "react";
import { useNavigate } from "react-router-dom";
import childImage from "../../assets/child.jpg";
import weddingImage from "../../assets/wedding.jpg";
import maternityImage from "../../assets/maternity.jpg";

const Portfolio = () => {
  const navigate = useNavigate();

  const goToChildrenGallery = () => navigate('/children');
  const goToMaternityGallery = () => navigate('/maternity');

  return (
    <div className="section__container portfolio__container">
      <h2 className="section__header">~ PORTFOLIO ~</h2>
      <div className="portfolio__grid">
        <div className="portfolio__card">
          <img src={childImage} alt="children photography" />
          <div className="portfolio__content">
            <button className="btn" onClick={goToChildrenGallery}>VIEW PORTFOLIO</button>
          </div>
        </div>
        <div className="portfolio__card">
          <img src={weddingImage} alt="wedding photography" />
          <div className="portfolio__content">
            <button className="btn" onClick={() => navigate('/gallery')}>VIEW COMPLETE GALLERY</button>
          </div>
        </div>
        <div className="portfolio__card">
          <img src={maternityImage} alt="maternity photography" />
          <div className="portfolio__content">
            <button className="btn" onClick={goToMaternityGallery}>VIEW PORTFOLIO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
