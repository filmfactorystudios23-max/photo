import React from "react";

const Blog = () => {
  return (
    <section className="blog" id="blog">
      <div className="section__container blog__container">
        <div className="blog__content">
          <h2 className="section__header">~ LATEST BLOG ~</h2>
          <h4>Capturing Emotion in Every Frame</h4>
          <p>
            This blog post delves into the importance of storytelling in
            photography and how Capturer approaches capturing emotion and
            narrative in their work. Readers will discover the techniques and
            strategies used by professional photographers.
          </p>
          <div className="blog__btn">
            <button className="btn">Read More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
