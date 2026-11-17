import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { foodImages } from "@/constants/images";
import { categories } from "@/data/data";

const categoryImages = [foodImages.pizza, foodImages.pasta, foodImages.chicken, foodImages.steak, foodImages.shrimp, foodImages.vegetables, foodImages.steak, foodImages.sandwich];

export const PopularCategories = () => (
  <section id="specials" className="section bg-[#f8f5ef]">
    <Container>
      <Reveal className="mb-11 flex flex-col items-center text-center">
        <SectionTitle eyebrow="Our Specialties" title="Popular Categories" />
        <p className="mt-4 max-w-xl text-sm leading-7 text-ink-700/65 md:text-base">
          Discover dishes made with care, seasonal ingredients, and a little extra love.
        </p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item, index) => (
          <Reveal key={item.id} delay={(index % 4) * 45}>
            <article className="food-card group h-full">
              <div className="food-card-image">
                <img src={categoryImages[index]} alt={item.recipesName} loading="lazy" />
                <span className="food-card-heart" aria-hidden="true"><i className="ri-heart-3-line" /></span>
                <span className="food-card-tag">Chef&apos;s pick</span>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-1 text-xs text-amber-500"><i className="ri-star-fill" /> 4.9 <span className="text-ink-700/45">(120+)</span></div>
                <h3 className="font-display text-lg font-bold leading-snug text-ink">{item.recipesName}</h3>
                <p className="mt-1.5 min-h-10 text-sm leading-5 text-ink-700/60">{item.recipesSubTitle}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-4">
                  <span className="font-display text-lg font-extrabold text-brand">{item.recipesPrice}</span>
                  <a href="#menu" className="food-card-order" aria-label={`Order ${item.recipesName}`}><i className="ri-add-line" /></a>
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
