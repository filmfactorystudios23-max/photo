import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { uiAssets } from "../../assets/imageConfig.js";
import { usePhoto } from "../../context/PhotoContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { sliderImages, loading } = usePhoto();

  // Get slider images from API data based on screen size
  const currentSliderImages = sliderImages ?
    (isMobile ? (sliderImages.mobile || []) : (sliderImages.desktop || [])) : [];
  const apiSliderImages = currentSliderImages.map(img => img.url);

  // Fallback to at least one image if no slider images available
  const bannerImages = apiSliderImages.length > 0 ? apiSliderImages : [uiAssets.logo];
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImage((current) => (current + 1) % bannerImages.length);
          return 0;
        }
        return prev + 100 / 30; // 3000ms / 100ms = 30 steps
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentImage, bannerImages.length]);

  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        setCurrentImage(0);
        setProgress(0);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobile]);

  const handleIndicatorClick = (index) => {
    setCurrentImage(index);
    setProgress(0);
  };

  return (
    <header
      className="header relative overflow-hidden"
      id="home"
      style={{ minHeight: "100vh" }}
    >
      {/* Loading state with skeleton */}
      {loading && (
        <div className="absolute inset-0">
          <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
            <Skeleton
              height="100vh"
              style={{
                borderRadius: 0,
                animation: "pulse 2s ease-in-out infinite alternate",
              }}
            />
          </SkeletonTheme>
        </div>
      )}

      {/* Background crossfade banner images */}
      {!loading && bannerImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0), rgba(0,0,0,0.9)), url(${img})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: currentImage === index ? 1 : 0,
          }}
        ></div>
      ))}

      {/* Carousel indicators - progress lines */}
      {loading && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex z-20"
          style={{ gap: "15px" }}
        >
          <SkeletonTheme baseColor="rgba(255,255,255,0.3)" highlightColor="rgba(255,255,255,0.5)">
            {[1, 2, 3, 4].map((index) => (
              <Skeleton
                key={index}
                width={48}
                height={4}
                style={{ borderRadius: "2px" }}
              />
            ))}
          </SkeletonTheme>
        </div>
      )}

      {!loading && bannerImages.length > 1 && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex z-20"
          style={{ gap: "15px" }}
        >
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className="relative w-12 h-1 bg-white/30 rounded-full overflow-hidden"
              onClick={() => handleIndicatorClick(index)}
            >
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100"
                style={{
                  width: currentImage === index ? `${progress}%` : "0%",
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Navbar on top */}
      <nav className="relative z-10">
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">
              <img
                src={uiAssets.logo}
                alt="logo"
                style={{
                  borderRadius: "50%",
                  width: isMobile ? "40px" : "100px",
                  height: isMobile ? "40px" : "100px",
                  objectFit: "cover",
                }}
              />
            </a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li>
            {isHomePage ? <a href="#home">HOME</a> : <Link to="/">HOME</Link>}
          </li>
          <li>
            {isHomePage ? (
              <a href="#about">ABOUT US</a>
            ) : (
              <Link to="/#about">ABOUT US</Link>
            )}
          </li>

          <li>
            {isHomePage ? (
              <a href="#service">SERVICES</a>
            ) : (
              <Link to="/#service">SERVICES</Link>
            )}
          </li>
          <li className="nav__logo">
            <Link to="/">
              <img
                src={uiAssets.logo}
                alt="logo"
                style={{
                  borderRadius: "50%",
                  width: isMobile ? "40px" : "100px",
                  height: isMobile ? "40px" : "100px",
                  objectFit: "cover",
                }}
              />
            </Link>
          </li>
          <li>
            {isHomePage ? (
              <a href="#client">TESTIMONIAL</a>
            ) : (
              <Link to="/#client">TESTIMONIAL</Link>
            )}
          </li>
          <li>
            {isHomePage ? (
              <a href="#contact">CONTACT US</a>
            ) : (
              <Link to="/#contact">CONTACT US</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
