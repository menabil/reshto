"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { foodImages } from "@/constants/images";

export const Hero = () => {
  const handleScrollToNext = (event) => {
    event.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-section relative isolate min-h-[720px] overflow-hidden text-white"
    >
      <div className="hero-background" aria-hidden="true">
        <Image
          src={foodImages.restaurant}
          alt="Reshto Restaurant Ambience"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_52%]"
        />
      </div>
      <Container className="hero-content relative z-10 flex min-h-[720px] items-center">
        <div className="hero-copy max-w-3xl">
          <span className="hero-eyebrow">
            <i className="ri-sparkling-2-line" aria-hidden="true" />
            A dining experience to remember
          </span>
          <h1>
            Gather around
            <br />
            <span>something</span> wonderful.
          </h1>
          <p>
            Seasonal ingredients, a thoughtful pour, and the kind of welcome that makes you want to stay for one more course.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu" className="btn-brand hero-button">
              Explore Menu <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
            <Link href="/reservation" className="btn-dark hero-button">
              Book a Table
            </Link>
          </div>
          <div className="hero-details">
            <span className="hero-rating">
              <span className="hero-stars" aria-label="Rated 4.9 out of 5">
                {Array.from({ length: 5 }, (_, index) => (
                  <i key={index} className="ri-star-fill" aria-hidden="true" />
                ))}
              </span>
              <strong>4.9</strong>
              <span>from 2,500+ guests</span>
            </span>
            <span className="hero-detail-divider" aria-hidden="true" />
            <span className="hero-detail-note">
              <i className="ri-map-pin-line" aria-hidden="true" />
              A neighborhood table, made special
            </span>
          </div>
        </div>
      </Container>

      <a
        href="#about"
        onClick={handleScrollToNext}
        className="hero-scroll animate-bounce transition-transform hover:scale-110"
        aria-label="Scroll to our story"
        title="Scroll to our story"
      >
        <i className="ri-arrow-down-line text-lg" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
