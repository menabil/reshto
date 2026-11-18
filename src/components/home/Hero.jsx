"use client";

import { Container } from "@/components/ui/Container";
import { foodImages } from "@/constants/images";
import Link from "next/link";

export const Hero = () => {
  const handleScrollToNext = (e) => {
    e.preventDefault();
    const heroSection = document.getElementById("home");
    const nextSection = heroSection?.nextElementSibling;

    if (nextSection instanceof HTMLElement) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero-section relative overflow-hidden text-white">
      <Container className="hero-content relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <i className="ri-restaurant-2-fill" /> Best Healthy Food
          </span>
          <h1>
            Enjoy <span>Delicious</span> Food in Your Healthy Life
          </h1>
          <p>
            This is a type of restaurant which typically serves food and drink, in addition to light
            refreshments such as baked goods.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#menu" className="btn-brand hero-button">
              Get Started <i className="ri-arrow-right-line" />
            </a>
            <Link href="/order" className="btn-dark hero-button">
              Order Now
            </Link>
          </div>
          <div className="hero-rating mt-8 flex items-center gap-3">
            <div className="flex -space-x-2" aria-hidden="true">
              {foodImages.chefs.slice(0, 3).map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-[#12231d] object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <span>
              <strong>4.9/5</strong>
              <span className="block text-xs text-white/60">Loved by 2,500+ foodies</span>
            </span>
            <span
              className="ml-1 flex gap-0.5 text-sm text-amber-300"
              aria-label="5 out of 5 stars"
            >
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
              <i className="ri-star-fill" />
            </span>
          </div>
        </div>

        <div className="hero-art relative mx-auto w-full max-w-[560px]">
          <div className="hero-art-ring" />
          <div className="hero-plate">
            <img
              src={foodImages.hero}
              alt="Freshly prepared healthy meal with greens and vegetables"
              fetchPriority="high"
            />
          </div>
          <div className="hero-float-card hero-float-left">
            <span className="hero-float-icon">
              <i className="ri-leaf-line" />
            </span>
            <span>
              <strong>100% Fresh</strong>
              <small>Locally sourced</small>
            </span>
          </div>
          <div className="hero-float-card hero-float-right">
            <span className="hero-float-icon warm">
              <i className="ri-time-line" />
            </span>
            <span>
              <strong>30 min</strong>
              <small>Fast delivery</small>
            </span>
          </div>
        </div>
      </Container>

      {/* Down arrow icon with smooth scroll to next section */}
      <a
        href="#specials"
        onClick={handleScrollToNext}
        className="hero-scroll z-20 animate-bounce hover:scale-110 transition-transform cursor-pointer"
        aria-label="Scroll to next section"
        title="Scroll down to popular dishes"
      >
        <i className="ri-arrow-down-line text-lg" />
      </a>
    </section>
  );
};

export default Hero;
