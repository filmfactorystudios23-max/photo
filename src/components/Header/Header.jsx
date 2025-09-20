import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import child from "../../assets/child.jpg";
import AR_00926 from "../../assets/AR_00926.jpg";
import logo from "../../assets/logo.jpg";

const desktopBannerImages = [banner1, banner2, banner3, banner4];
const mobileBannerImages = [child, banner4, banner2, AR_00926];

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const bannerImages = isMobile ? mobileBannerImages : desktopBannerImages;

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
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
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
      {/* Background crossfade banner images */}
      {bannerImages.map((img, index) => (
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

      {/* Navbar on top */}
      <nav className="relative z-10">
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">
              <img
                src={logo}
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
            <a href="#home">HOME</a>
          </li>
          <li>
            <a href="#about">ABOUT US</a>
          </li>
          <li>
            <a href="#service">SERVICES</a>
          </li>
          <li className="nav__logo">
            <a href="#">
              <img
                src={logo}
                alt="logo"
                style={{
                  borderRadius: "50%",
                  width: isMobile ? "40px" : "100px",
                  height: isMobile ? "40px" : "100px",
                  objectFit: "cover",
                }}
              />
            </a>
          </li>
          <li>
            <a href="#client">TESTIMONIAL</a>
          </li>
          <li>
            <a href="#contact">CONTACT US</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
