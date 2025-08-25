import React from "react";

const Header = () => {
  return (
    <header
      className="header"
      id="home"
      style={{
        minHeight: "700px",
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.9)), url("assets/header.jpg")`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">
              <img src="assets/logo-white.png" alt="logo" />
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
              <img src="assets/logo-white.png" alt="logo" />
            </a>
          </li>
          <li>
            <a href="#client">CLIENT</a>
          </li>
          <li>
            <a href="#blog">BLOG</a>
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
