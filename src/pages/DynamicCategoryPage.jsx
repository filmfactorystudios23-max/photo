import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhoto } from "../context/PhotoContext";
import { ArrowLeft, Camera, Eye, Download, X } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/DynamicCategoryPage.css";

const DynamicCategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { groupedCategories, loading } = usePhoto();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});

  // Convert URL param back to proper category name
  const actualCategoryName = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Find the category data - try exact match first, then partial match
  let categoryData = groupedCategories.find(
    (category) =>
      category.category_name.toLowerCase() === actualCategoryName.toLowerCase()
  );

  // If no exact match, try to find by partial match (e.g., "Wedding Photography" -> "Wedding")
  if (!categoryData) {
    categoryData = groupedCategories.find((category) => {
      const categoryWords = category.category_name.toLowerCase().split(" ");
      const searchWords = actualCategoryName.toLowerCase().split(" ");
      return searchWords.some((word) => categoryWords.includes(word));
    });
  }

  const categoryPhotos = categoryData ? categoryData.images : [];

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dynamic-category-page">
        <div className="category-header">
          <div className="skeleton-container">
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
              <Skeleton height={24} width={150} />
              <Skeleton height={32} width={200} style={{ marginTop: "16px" }} />
              <Skeleton height={20} width={100} style={{ marginTop: "8px" }} />
            </SkeletonTheme>
          </div>
        </div>
        <div className="skeleton-container">
          <div className="skeleton-grid">
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index} className="skeleton-card">
                  <Skeleton height={256} />
                  <div className="skeleton-card-content">
                    <Skeleton height={20} />
                    <Skeleton
                      height={16}
                      width="60%"
                      style={{ marginTop: "8px" }}
                    />
                  </div>
                </div>
              ))}
            </SkeletonTheme>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-category-page">
      {/* Header */}
      <div className="category-header">
        <div className="category-header-container">
          <div>
            <button onClick={goBack} className="back-button">
              <ArrowLeft size={24} className="back-button-icon" />
              Back to Home
            </button>
          </div>
          <div>
            <h1 className="category-title">{actualCategoryName}</h1>
            <p className="category-count">
              {categoryPhotos.length}{" "}
              {categoryPhotos.length === 1 ? "photo" : "photos"} in this
              category
            </p>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="photos-container">
        {categoryPhotos.length > 0 ? (
          <div className="photos-grid">
            {categoryPhotos.map((photo) => (
              <div
                key={photo.id}
                className="photo-card"
                onClick={() => openLightbox(photo)}
              >
                <div className="photo-image-container">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="photo-image"
                    style={{
                      backgroundColor:
                        imageLoadStates[photo.id] === "error"
                          ? "#f3f4f6"
                          : "transparent",
                    }}
                    onError={() => {
                      console.error("Image failed to load:", photo.url);
                      setImageLoadStates((prev) => ({
                        ...prev,
                        [photo.id]: "error",
                      }));
                    }}
                    onLoad={() => {
                      console.log("Image loaded successfully:", photo.url);
                      setImageLoadStates((prev) => ({
                        ...prev,
                        [photo.id]: "loaded",
                      }));
                    }}
                  />
                  <div className="photo-overlay">
                    <Eye size={32} className="photo-overlay-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Camera size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">No Photos Found</h3>
            <p className="empty-state-text">
              No photos have been added to this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-modal">
          <div className="lightbox-content">
            <button onClick={closeLightbox} className="lightbox-close">
              <X size={24} />
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="lightbox-image"
            />
          </div>

          <div className="lightbox-backdrop" onClick={closeLightbox} />
        </div>
      )}
    </div>
  );
};

export default DynamicCategoryPage;
