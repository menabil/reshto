"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { foodImages } from "@/constants/images";

const VIDEO_SRC = "https://www.youtube.com/embed/--MdohXec7M?autoplay=1&controls=1";

export const VideoCta = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="story-section">
      <Container className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[.95fr_1.05fr]">
        <div className="story-copy">
          <span className="section-pill"><i className="ri-play-circle-line" /> The Biteon feeling</span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">A table set for <span>moments that matter.</span></h2>
          <p className="mt-5 max-w-lg leading-7 text-white/65">From the first welcome to the final pour, we make space for the kind of evening you wish could last a little longer.</p>
          <button type="button" onClick={() => setOpen(true)} className="story-link mt-7">Step inside <i className="ri-arrow-right-line" /></button>
        </div>
        <div className="story-image-wrap">
          <Image
            src={foodImages.restaurant}
            alt="Inside the Biteon dining room"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <button type="button" onClick={() => setOpen(true)} className="story-play" aria-label="Play Biteon restaurant story"><i className="ri-play-fill" /></button>
          <span className="story-image-caption"><i className="ri-map-pin-2-fill" /> An evening made for lingering</span>
        </div>
      </Container>
      {open ? (
        <div className="video-modal" role="presentation" onClick={() => setOpen(false)}>
          <div className="video-modal-inner" role="dialog" aria-modal="true" aria-label="Biteon restaurant story" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} className="video-close" aria-label="Close video"><i className="ri-close-line" /></button>
            <div className="aspect-video"><iframe className="h-full w-full" src={VIDEO_SRC} title="Biteon restaurant story" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default VideoCta;
