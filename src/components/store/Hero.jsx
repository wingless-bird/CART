import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDE_INTERVAL = 5000;

const HERO_SLIDES = [

  {
    className: "slide-1",
    title: "Farm Fresh Vegetables",
    subtitle: "Freshly harvested vegetables delivered every day.",
    discount: "15% OFF Vegetables"
  },

  {
    className: "slide-2",
    title: "Healthy Organic Fruits",
    subtitle: "Naturally sweet fruits packed with nutrition.",
    discount: "10% OFF Fruits"
  },

  {
    className: "slide-3",
    title: "Premium Grocery Collection",
    subtitle: "Everything you need for your kitchen in one place.",
    discount: "20% Flat Discount on Groceries"
  },

  {
    className: "slide-4",
    title: "Refreshing Food & Drinks",
    subtitle: "Quality beverages and delicious ready-to-eat products.",
    discount: "10% OFF Food & Drinks"
  },

  {
    className: "slide-5",
    title: "Freshness You Can Trust",
    subtitle: "Serving quality products with care and affordability.",
    discount: "Free Delivery on Orders Above Rs. 2000"
  }

];

export default function Hero() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrent(
        (previous) =>
          (previous + 1) % HERO_SLIDES.length
      );

    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);

  }, []);

  const currentSlide =
    HERO_SLIDES[current];

  return (

    <section className="hero">

      <div className="container hero-container">

        <div className="hero-info">

          <span className="hero-badge">
            🌿 Organic Fresh Market
          </span>

          <h1>
            Fresh Organic Food at Your Door Step
          </h1>

          <p>
            Premium vegetables, fruits and groceries delivered
            directly from local farms, picked fresh every morning.
          </p>

          <div className="hero-buttons">

            <Link
              to="/vegetables"
              className="hero-primary-btn"
            >
              Shop Now
            </Link>

            <Link
              to="/food-drinks"
              className="hero-secondary-btn"
            >
              Explore
            </Link>

          </div>

        </div>

        <div className="hero-slider">

          {

            HERO_SLIDES.map((slide, index) => (

              <div
                key={slide.className}
                className={`hero-slide ${slide.className} ${current === index ? "active" : ""}`}
              />

            ))

          }

          <div className="hero-overlay" />

          <div className="hero-slide-content">

            {

              currentSlide.discount && (

                <span className="hero-slide-discount">
                  🔥 {currentSlide.discount}
                </span>

              )

            }

            <h2>
              {currentSlide.title}
            </h2>

            <p>
              {currentSlide.subtitle}
            </p>

          </div>

          <div className="hero-indicators">

            {

              HERO_SLIDES.map((slide, index) => (

                <button
                  key={slide.className}
                  className={
                    current === index
                      ? "indicator active"
                      : "indicator"
                  }
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />

              ))

            }

          </div>

        </div>

      </div>

    </section>

  );

}