import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Chefs } from "@/components/home/Chefs";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";

export const AboutContent = () => {
  return (
    <>
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-restaurant-2-fill" /> Since day one
          </span>
          <h1>
            More than a meal.
            <br />
            <span>It&apos;s a Reshto moment.</span>
          </h1>
          <p>
            Fresh ingredients, thoughtful cooking, and a table that always has room for one more.
          </p>
        </Container>
      </section>

      <section className="section bg-soft-primary transition-colors duration-300 dark:bg-[#0f0e0d]">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="about-photo-wrap overflow-hidden rounded-3xl shadow-xl">
            <SafeImage
              src={foodImages.restaurant}
              alt="A warmly lit restaurant dining room"
            />
          </div>
          <div>
            <span className="section-pill dark:bg-brand-900/40 dark:text-brand-300">
              <i className="ri-leaf-line" /> Our Philosophy
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink dark:text-white md:text-4xl">
              A little care makes every plate special.
            </h2>
            <p className="mt-5 leading-7 text-ink-700/65 dark:text-white/60">
              At Reshto, we bring together fresh produce, comforting favorites, and the kind of hospitality that makes you want to stay a little longer. Every dish starts with quality ingredients and ends with a reason to come back.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-brand">
                Explore the Menu <i className="ri-arrow-right-line" />
              </Link>
              <Link href="/reservation" className="btn-dark">
                Book a Table
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <WhyChoose />

      <Chefs />

      <section className="bg-brand py-14 text-white text-center">
        <Container>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Join us for an unforgettable evening
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 md:text-base">
            From our family to yours, we invite you to experience hospitality and culinary mastery at Reshto.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/reservation"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-ink shadow-lg transition hover:bg-white/90"
            >
              Reserve Your Table <i className="ri-calendar-line" />
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/30 bg-black/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-black/20"
            >
              Get Directions &amp; Hours
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};
