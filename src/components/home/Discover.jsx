import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";

const reasons = [
  { icon: "ri-shopping-basket-2-line", title: "Easy to Order", text: "A few taps are all it takes to bring your favorites to the table." },
  { icon: "ri-heart-3-line", title: "Delicious Taste", text: "Fresh ingredients and thoughtful recipes in every bite." },
  { icon: "ri-e-bike-2-line", title: "Fastest Delivery", text: "Hot, fresh meals delivered right to your doorstep." },
];

export const Discover = () => (
  <section id="about" className="section bg-[#f7f4ed] transition-colors duration-300 dark:bg-[#0c1612]">
    <Container>
      <Reveal className="mb-12 flex flex-col items-center text-center">
        <SectionTitle eyebrow="About Us" title="Choosing Healthy & Fresh Food" />
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-700/65 dark:text-white/60 md:text-base">
          At Reshto, we prioritize the healthiest and freshest ingredients to make every meal both delicious and nourishing.
        </p>
      </Reveal>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="about-photo-wrap">
          <SafeImage src={foodImages.restaurant} alt="Warm and welcoming Reshto dining room" />
          <div className="about-photo-note dark:bg-[#15241d]/90 dark:border-white/10 dark:text-white">
            <span className="about-note-icon dark:bg-white/10 dark:text-brand-300">
              <i className="ri-restaurant-2-line" />
            </span>
            <span>
              <strong className="dark:text-white">Made fresh, every day</strong>
              <small className="dark:text-white/60">Good food brings us together</small>
            </span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <span className="section-pill dark:bg-brand-900/40 dark:text-brand-300">
            <i className="ri-leaf-line" /> Made With Care
          </span>
          <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink dark:text-white md:text-4xl">
            Good food, <span className="text-brand dark:text-brand-300">good mood</span> &mdash; that&apos;s the Reshto way.
          </h3>
          <p className="mt-5 leading-7 text-ink-700/65 dark:text-white/60">
            We believe a great meal begins with ingredients you can feel good about. Our kitchen brings together honest produce, bold flavors, and the warmth of a meal shared with friends.
          </p>
          <div className="mt-7 space-y-5">
            {reasons.map((reason) => (
              <div key={reason.title} className="about-reason">
                <span className="about-reason-icon dark:bg-white/10 dark:text-brand-300">
                  <i className={reason.icon} />
                </span>
                <span>
                  <strong className="dark:text-white">{reason.title}</strong>
                  <small className="dark:text-white/60">{reason.text}</small>
                </span>
              </div>
            ))}
          </div>
          <a href="#menu" className="btn-brand mt-8">
            Explore Our Menu <i className="ri-arrow-right-line" />
          </a>
        </Reveal>
      </div>
    </Container>
  </section>
);

export default Discover;
