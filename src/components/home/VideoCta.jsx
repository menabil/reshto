"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const VIDEO_SRC = "https://www.youtube.com/embed/--MdohXec7M?si=ubCj-rKlhqHrlTFj&controls=1";

export const VideoCta = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-ink via-ink-800 to-brand-900 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_15%_25%,#fff_0,transparent_35%),radial-gradient(circle_at_85%_70%,#fff_0,transparent_30%)]" />

      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80">
            <i className="ri-play-circle-line" />
            Watch Our Story
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">
            Experience Culinary Art — Our Restaurant Video
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            It should be a journey that engages all your senses, from the first aroma to the final
            bite. Whether you&apos;re savoring a comforting classic or exploring something new, our
            dishes are crafted to be remembered.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-3 text-lg font-semibold text-white transition hover:text-brand"
          >
            Watch Our Story <span className="text-2xl">&rarr;</span>
          </button>
        </div>

        <div className="flex justify-center lg:col-span-5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play video"
            className="relative grid h-20 w-20 place-items-center rounded-full bg-brand text-white shadow-card transition hover:scale-105"
          >
            <i className="ri-play-fill text-3xl" />
            <span className="absolute inset-0 animate-wave rounded-full bg-brand/60" />
            <span className="absolute inset-0 animate-wave rounded-full bg-brand/40 [animation-delay:0.8s]" />
          </button>
        </div>
      </Container>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white"
            >
              <i className="ri-close-line text-xl" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={VIDEO_SRC}
                title="Experience Culinary Art - Our Restaurant Video"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default VideoCta;
