import React from "react";

const Clients = () => {
  return (
    <section className="section__container client__container" id="client">
      <h2 className="section__header">~ TESTIMONIALS ~</h2>
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="client__card">
              <img src="assets/client-1.jpg" alt="client" />
              <p>
                Capturer exceeded all our expectations! Their attention to
                detail and ability to capture the essence of our special day was
                truly remarkable. Every time we look at our wedding photos,
                we're transported back to those magical moments.
              </p>
              <h4>Sarah and Michael</h4>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="client__card">
              <img src="assets/client-2.jpg" alt="client" />
              <p>
                We couldn't be happier with our family portrait session with
                Capturer. They made us feel relaxed and comfortable throughout
                the entire shoot, resulting in natural and candid photos.
              </p>
              <h4>The Johnson Family</h4>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="client__card">
              <img src="assets/client-3.jpg" alt="client" />
              <p>
                Capturer's maternity and newborn sessions captured the most
                precious moments of our lives with such tenderness and care.
              </p>
              <h4>Emily and David</h4>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default Clients;
