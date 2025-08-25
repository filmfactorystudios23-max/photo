import React from "react";

const Services = () => {
  return (
    <section className="service" id="service">
      <div className="section__container service__container">
        <h2 className="section__header">~ SERVICES ~</h2>
        <p className="section__description">
          At Capturer, we offer a range of professional photography services
          tailored to meet your unique needs. With a commitment to excellence
          and creativity, we strive to exceed your expectations, delivering
          captivating visuals that tell your story with authenticity and
          passion.
        </p>
        <div className="service__grid">
          <div className="service__card">
            <h4>Portrait Sessions</h4>
            <p>
              Our portrait sessions are designed to showcase your personality
              and style in stunning imagery.
            </p>
          </div>
          <div className="service__card">
            <h4>Maternity Sessions</h4>
            <p>
              Embrace the beauty and miracle of new life with our maternity and
              newborn photography sessions.
            </p>
          </div>
          <div className="service__card">
            <h4>Family Sessions</h4>
            <p>
              Cherish the bond of family with our custom-designed playful candid
              moments and portrait sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
