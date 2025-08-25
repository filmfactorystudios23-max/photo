import React from "react";

const Footer = () => {
  return (
    <footer id="contact">
      <div className="section__container footer__container">
        <div className="footer__col">
          <img src="assets/logo-dark.png" alt="logo" />
          <div className="footer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#">
              <i className="ri-youtube-fill"></i>
            </a>
            <a href="#">
              <i className="ri-pinterest-line"></i>
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
              <a href="#client">CLIENT</a>
            </li>
            <li>
              <a href="#blog">BLOG</a>
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
        Copyright © 2024 Web Design Mastery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
