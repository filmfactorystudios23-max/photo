import React from "react";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <footer>
      <div className="section__container footer__container">
        <div className="footer__col">
          <img
            src={logo}
            alt="logo"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
          <div className="footer__socials">
            <a href="https://www.facebook.com/p/Film-Factory-Studios-100092703673146/" target="_blank" rel="noopener noreferrer">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="https://www.instagram.com/filmfactory_studios/?igsh=MWY5NHNzZHE5MXhoaw%3D%3D&utm_source=qr#" target="_blank" rel="noopener noreferrer">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="mailto:filmfactorystudios23@gmail.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-mail-line"></i>
            </a>
          </div>
        </div>

        <div className="footer__col">
          <ul className="footer__links">
            <li>
              <a href="#home">HOME</a>
            </li>
            <li>
              <a href="#about">ABOUT US</a>
            </li>
            <li>
              <a href="#service">SERVICES</a>
            </li>
            <li>
              <a href="#client">TESTIMONIAL</a>
            </li>

            <li>
              <a href="#contact">CONTACT US</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>STAY IN TOUCH</h4>
          <p>
            Keep up-to-date with all things Capturer! Join our community and
            never miss a moment!
          </p>
        </div>
      </div>

      <div className="footer__bar">
        Copyright © 2025 Flim Factory Studios. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
