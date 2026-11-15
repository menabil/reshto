import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const Discover = () => {
  return (
    <section id="about" className="section bg-white">
      <Container>
        <Reveal className="mb-14">
          <SectionTitle eyebrow="About Us" title="Discover Reshto" />
        </Reveal>

        {/* Row 1 */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Placeholder
              tone="amber"
              icon="ri-restaurant-2-fill"
              label="Our Restaurant"
              className="aspect-[4/3] w-full rounded-3xl shadow-card"
              iconClassName="text-5xl"
            />
          </Reveal>

          <Reveal delay={100}>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-soft-danger text-2xl text-brand">
              <i className="ri-restaurant-line" />
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl">
              Our Restaurant
            </h2>
            <p className="mt-4 text-ink-700/70">
              At Reshto, we believe dining is not just about food but also about creating moments.
              Our restaurant provides a cozy, welcoming ambiance that enhances your dining
              experience, making every meal special. From casual family dinners to celebrations,
              Reshto is the perfect spot.
            </p>
            <p className="mt-4 text-ink-700/70">
              We take pride in serving dishes made from the finest ingredients. With our diverse
              menu of traditional and modern cuisines, we aim to satisfy every palate. Join us to
              enjoy delightful meals prepared with care and precision.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "A warm, inviting atmosphere for every occasion.",
                "Delicious meals crafted from the freshest ingredients.",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-ink-700">
                  <i className="ri-checkbox-circle-line text-xl text-emerald-500" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Row 2 */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <Placeholder
              tone="green"
              icon="ri-truck-fill"
              label="Fast & Fresh"
              className="aspect-[4/3] w-full rounded-3xl shadow-card"
              iconClassName="text-5xl"
            />
          </Reveal>

          <Reveal delay={100} className="lg:order-1">
            <span className="section-pill">
              <i className="ri-thumb-up-line" />
              Made With Love
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl">
              Fresh Ingredients, Delivered With Care
            </h2>
            <p className="mt-4 text-ink-700/70">
              From our kitchen to your table, we focus on quality at every step — so every bite feels
              just as good as it tastes.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Ensuring fast delivery without compromising on quality.",
                "Partnering with trusted restaurants for an exceptional dining experience.",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-ink-700">
                  <i className="ri-checkbox-circle-line text-xl text-emerald-500" />
                  {point}
                </li>
              ))}
            </ul>
            <a href="#book" className="btn-brand mt-8 px-7! py-3.5! text-base!">
              Book A Table
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default Discover;
