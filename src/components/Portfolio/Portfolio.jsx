import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePhoto } from "../../context/PhotoContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Portfolio = () => {
  const navigate = useNavigate();
  const { groupedCategories, loading } = usePhoto();

  useEffect(() => {
    if (groupedCategories.length > 0) {
      console.log("Grouped Categories from API:", groupedCategories);
    }
  }, [groupedCategories]);

  if (loading) {
    return (
      <div className="section__container portfolio__container">
        <h2 className="section__header">~ PORTFOLIO ~</h2>
        <div className="portfolio__grid">
          <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
            {[1, 2, 3].map((index) => (
              <div key={index} className="portfolio__card">
                <Skeleton height={450} style={{ borderRadius: "10px" }} />
                <div className="portfolio__content">
                  <Skeleton
                    height={40}
                    width="60%"
                    style={{ borderRadius: "4px", margin: "20px auto" }}
                  />
                </div>
              </div>
            ))}
          </SkeletonTheme>
        </div>
      </div>
    );
  }

  return (
    <div className="section__container portfolio__container">
      <h2 className="section__header">~ PORTFOLIO ~</h2>
      <div className="portfolio__grid">
        {groupedCategories
          .filter(category =>
            !["MobileSlider", "Slider", "No Category"].includes(category.category_name)
          )
          .map((category, index) => (
          <div
            key={index}
            className="portfolio__card"
            style={{ "--category-name": `"${category.category_name}"` }}
          >
            <img src={category.category_image} alt={`${category.category_name} photography`} />
            <div className="portfolio__content">
              <button
                className="btn"
                onClick={() =>
                  navigate(
                    `/${category.category_name.toLowerCase().replace(/\s+/g, "-")}`
                  )
                }
              >
                VIEW {category.category_name.toUpperCase()}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
