import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PhotoProvider } from "./context/PhotoContext";

import "./App.css";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import Clients from "./components/Clients/Clients";
import Gallery from "./components/Gallery/Gallery";
import Instagram from "./components/Instagram/Instagram";
import Footer from "./components/Footer/Footer";
import FullGallery from "./pages/FullGallery";
import ChildrenGallery from "./pages/ChildrenGallery";
import MaternityGallery from "./pages/MaternityGallery";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPhotosPage from "./pages/CategoryPhotosPage";
import DynamicCategoryPage from "./pages/DynamicCategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";

const App = () => {
  useEffect(() => {
    // === Menu toggle === check
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn?.querySelector("i");

    const handleMenuClick = () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon?.setAttribute(
        "class",
        isOpen ? "ri-close-line" : "ri-menu-line"
      );
    };

    const handleNavLinksClick = () => {
      navLinks.classList.remove("open");
      menuBtnIcon?.setAttribute("class", "ri-menu-line");
    };

    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", handleMenuClick);
      navLinks.addEventListener("click", handleNavLinksClick);
    }

    // === ScrollReveal ===
    if (typeof window !== "undefined" && window.ScrollReveal) {
      const sr = window.ScrollReveal({
        distance: "50px",
        origin: "bottom",
        duration: 1000,
      });

      sr.reveal(".about__container .section__header");
      sr.reveal(".about__container .section__description", {
        delay: 500,
        interval: 500,
      });
      sr.reveal(".about__container img", { delay: 1500 });

      sr.reveal(".blog__content .section__header");
      sr.reveal(".blog__content h4", { delay: 500 });
      sr.reveal(".blog__content p", { delay: 1000 });
      sr.reveal(".blog__content .blog__btn", { delay: 1500 });
    }

    // === Swiper ===
    if (typeof window !== "undefined" && window.Swiper) {
      new window.Swiper(".swiper", {
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: false,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        watchSlidesProgress: true,
      });
    }

    // === Instagram duplication ===
    const instagram = document.querySelector(".instagram__flex");
    if (instagram) {
      Array.from(instagram.children).forEach((item) => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute("aria-hidden", true);
        instagram.appendChild(duplicateNode);
      });
    }

    return () => {
      if (menuBtn && navLinks) {
        menuBtn.removeEventListener("click", handleMenuClick);
        navLinks.removeEventListener("click", handleNavLinksClick);
      }
    };
  }, []);

  const HomePage = () => (
    <>
      <Header />
      <Portfolio />
      <Gallery />
      <Clients />
      <About />
      <Services />
      <Instagram />
      <Footer />
    </>
  );

  return (
    <PhotoProvider>
      <Router>
        <ScrollToTop />
        <FloatingButtons />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<FullGallery />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/category/:categoryId"
            element={<CategoryPhotosPage />}
          />
          <Route path="/:categoryName" element={<DynamicCategoryPage />} />
        </Routes>
      </Router>
    </PhotoProvider>
  );
};

export default App;
