import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SafeImage } from "@/components/ui/SafeImage";
import { categories } from "@/data/data";

export const PopularCategories = () => (
  <section id="specials" className="section bg-[#f8f5ef] transition-colors duration-300 dark:bg-[#0f1b15]">
    <Container>
      <Reveal className="mb-11 flex flex-col items-center text-center">
        <SectionTitle eyebrow="Our Specialties" title="Popular Categories" />
        <p className="mt-4 max-w-xl text-sm leading-7 text-ink-700/65 dark:text-white/60 md:text-base">
          Discover dishes made with care, seasonal ingredients, and a little extra love.
        </p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item, index) => (
          <Reveal key={item.id} delay={(index % 4) * 45}>
            <article className="food-card group h-full flex flex-col dark:bg-[#15241d] dark:border-white/10">
              <div className="food-card-image relative">
                <SafeImage
                  src={item.image}
                  alt={item.recipesName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="food-card-heart dark:bg-[#1f3127] dark:text-amber-300" aria-hidden="true">
                  <i className="ri-heart-3-line" />
                </span>
                <span className="food-card-tag">Chef&apos;s pick</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <i className="ri-star-fill" /> 4.9 <span className="text-ink-700/45 dark:text-white/40">(120+)</span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold leading-snug text-ink dark:text-white">
                  {item.recipesName}
                </h3>
                <p className="mt-1.5 min-h-10 text-sm leading-5 text-ink-700/60 dark:text-white/60">
                  {item.recipesSubTitle}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-ink/8 dark:border-white/8 pt-4">
                  <span className="font-display text-lg font-extrabold text-brand dark:text-brand-300">
                    {item.recipesPrice}
                  </span>
                  <a
                    href="/order"
                    className="food-card-order dark:bg-white/10 dark:text-white dark:hover:bg-brand"
                    aria-label={`Order ${item.recipesName}`}
                  >
                    <i className="ri-add-line" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

export default PopularCategories;
