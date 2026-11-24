import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { heroSlides } from "../data/demoProducts";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

  const slide = heroSlides[currentIndex];

  return (
    <section className="relative w-full" aria-label="Featured collections">
      <div className="hero-slide relative h-[400px] w-full overflow-hidden md:h-[470px]">
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          className="hero-slide-image h-full w-full object-cover transition-transform duration-500"
        />
        <div className="hero-slide-copy">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3b18d]">
            {slide.eyebrow}
          </p>
          <h1 className="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {slide.title}
          </h1>
          <Link to={slide.to || "/Product"} className="hero-slide-link">
            Shop the collection <IoIosArrowRoundForward className="text-2xl" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((item, index) => (
          <button
            type="button"
            key={item.eyebrow}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === currentIndex}
            className={`h-3 w-3 rounded-full border-2 border-white ${
              index === currentIndex ? "bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
