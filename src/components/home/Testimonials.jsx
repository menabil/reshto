"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { testimonials } from "@/data/data";

const avatarTones = [
  "from-brand-400 to-brand-600",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-indigo-500",
  "from-rose-400 to-pink-500",
  "from-sky-400 to-blue-500",
];

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export const Testimonials = () => {
  return (
    <section id="review" className="section bg-soft-primary/40 transition-colors duration-300 dark:bg-[#101e17]">
      <Container>
        <Reveal className="mb-12">
          <SectionTitle eyebrow="Testimonials" title="Food Lover Feedback" />
        </Reveal>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12!"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item.id} className="h-auto!">
              <article className="flex h-full flex-col rounded-3xl bg-[#fffdf8] p-7 shadow-soft transition-colors dark:bg-[#15241d] dark:border dark:border-white/10">
                <i className="ri-double-quotes-l text-3xl text-brand/30 dark:text-brand-300/40" />
                <div className="mt-2 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-sm" />
                  ))}
                </div>
                <h5 className="mt-3 font-display text-lg font-bold text-ink dark:text-white">
                  {item.reviewHL}
                </h5>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700/70 dark:text-white/65">
                  {item.review}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/5 dark:border-white/5 pt-5">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-xs ${
                      avatarTones[index % avatarTones.length]
                    }`}
                  >
                    {initials(item.clientName)}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink dark:text-white">
                      {item.clientName}
                    </span>
                    <span className="block text-xs text-ink-700/60 dark:text-white/50">
                      {item.clientInfo}
                    </span>
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Testimonials;
