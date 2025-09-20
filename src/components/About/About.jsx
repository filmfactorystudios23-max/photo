import React from "react";
import logo from "../../assets/logo.jpg";

const About = () => {
  return (
    <div className="section__container about__container" id="about">
      <h2 className="section__header">WE CAPTURE THE MOMENTS</h2>
      <p className="section__description">
        At Capturer, we specialize in freezing those fleeting moments in time
        that hold immense significance for you. With our passion for photography
        and keen eye for detail, we transform ordinary moments into
        extraordinary memories.
      </p>
      <p className="section__description">
        Whether it's a milestone event, capturing precious child moments, or the breathtaking
        beauty of nature, we strive to encapsulate the essence of every moment.
      </p>
      <img src={logo} alt="logo" style={{borderRadius: "50%", width: "200px", height: "100px", objectFit: "cover"}} />
    </div>
  );
};

export default About;
