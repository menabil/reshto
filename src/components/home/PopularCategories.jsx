import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { categories } from "@/data/data";

const tones = ["brand", "amber", "green", "violet", "rose", "slate"];

export const PopularCategories = () => {
  return (
    <section className="section bg-soft-primary/40">
      <Container>
        <Reveal className="mb-12">
          <SectionTitle eyebrow="Our Specialties" title="Popular Categories" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, index) => (
            <Reveal key={item.id} delay={index * 60}>
              <article className="group h-full overflow-hidden rounded-3xl bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-card">
                <Placeholder
                  tone={tones[index % tones.length]}
                  icon="ri-restaurant-2-line"
                  className="h-44 w-full rounded-2xl"
                  iconClassName="text-4xl"
                />
                <div className="px-2 pt-5">
                  <h5 className="font-display text-lg font-bold text-ink">{item.recipesName}</h5>
                  <p className="mt-1 text-sm text-ink-700/60">{item.recipesSubTitle}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href="#menu"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:gap-2"
                    >
                      Order Now <i className="ri-arrow-right-fill" />
                    </a>
                    <span className="font-display text-lg font-extrabold text-brand">
                      {item.recipesPrice}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularCategories;
