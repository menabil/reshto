import { Container } from "@/components/ui/Container";
import { foodImages } from "@/constants/images";

export const metadata = {
  title: "About Us",
  description: "Learn more about Reshto, our team and our love for fresh food.",
};

export default function AboutPage() {
  return (
    <>
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow"><i className="ri-restaurant-2-fill" /> Since day one</span>
          <h1>More than a meal.<br /><span>It&apos;s a Reshto moment.</span></h1>
          <p>Fresh ingredients, thoughtful cooking, and a table that always has room for one more.</p>
        </Container>
      </section>
      <section className="section bg-white">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="about-photo-wrap"><img src={foodImages.restaurant} alt="A warmly lit restaurant dining room" loading="lazy" /></div>
          <div>
            <span className="section-pill"><i className="ri-leaf-line" /> Our Philosophy</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">A little care makes every plate special.</h2>
            <p className="mt-5 leading-7 text-ink-700/65">At Reshto, we bring together fresh produce, comforting favorites, and the kind of hospitality that makes you want to stay a little longer. Every dish starts with quality ingredients and ends with a reason to come back.</p>
            <a href="/#menu" className="btn-brand mt-8">Explore the Menu <i className="ri-arrow-right-line" /></a>
          </div>
        </Container>
      </section>
    </>
  );
}
