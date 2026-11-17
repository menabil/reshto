// import { Container } from "@/components/ui/Container";
// import { Reveal } from "@/components/ui/Reveal";
// import { SectionTitle } from "@/components/ui/SectionTitle";
// import { testimonials } from "@/data/data";

// const avatarTones = [
//   "from-brand-400 to-brand-600",
//   "from-amber-400 to-orange-500",
//   "from-emerald-400 to-teal-500",
//   "from-violet-400 to-indigo-500",
//   "from-rose-400 to-pink-500",
//   "from-sky-400 to-blue-500",
// ];

// const initials = (name) =>
//   name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();

// export const Testimonials = () => {
//   return (
//     <section id="review" className="section bg-soft-primary/40">
//       <Container>
//         <Reveal className="mb-12">
//           <SectionTitle eyebrow="Testimonials" title="Food Lover Feedback" />
//         </Reveal>

//         <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4">
//           {testimonials.map((item, index) => (
//             <Reveal key={item.id} delay={index * 60} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
//               <article className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft">
//                 <i className="ri-double-quotes-l text-3xl text-brand/30" />
//                 <div className="mt-2 flex gap-0.5 text-amber-400">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <i key={i} className="ri-star-fill text-sm" />
//                   ))}
//                 </div>
//                 <h5 className="mt-3 font-display text-lg font-bold text-ink">{item.reviewHL}</h5>
//                 <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700/70">{item.review}</p>
//                 <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
//                   <span
//                     className={`grid h-12 w-12 place-items-center rounded-full bg-linear-to-br text-sm font-bold text-white ${
//                       avatarTones[index % avatarTones.length]
//                     }`}
//                   >
//                     {initials(item.clientName)}
//                   </span>
//                   <span>
//                     <span className="block font-semibold text-ink">{item.clientName}</span>
//                     <span className="block text-xs text-ink-700/60">{item.clientInfo}</span>
//                   </span>
//                 </div>
//               </article>
//             </Reveal>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Testimonials;

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper এর প্রয়োজনীয় CSS ফাইলগুলো
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
    <section id="review" className="section bg-soft-primary/40">
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
          className="!pb-12" // নিচের পেজিনেশন ডটের জন্য জায়গা
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <article className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft">
                <i className="ri-double-quotes-l text-3xl text-brand/30" />
                <div className="mt-2 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-sm" />
                  ))}
                </div>
                <h5 className="mt-3 font-display text-lg font-bold text-ink">
                  {item.reviewHL}
                </h5>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700/70">
                  {item.review}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br text-sm font-bold text-white ${
                      avatarTones[index % avatarTones.length]
                    }`}
                  >
                    {initials(item.clientName)}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {item.clientName}
                    </span>
                    <span className="block text-xs text-ink-700/60">
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
