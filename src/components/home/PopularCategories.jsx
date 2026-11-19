import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { categories } from "@/data/data";

export const PopularCategories = () => (
  <section
    id="specials"
    className="section signature-section bg-[#f2ece1] transition-colors duration-300 dark:bg-[#171614]"
  >
    <Container>
      <Reveal className="signature-heading">
        <div>
          <span className="story-kicker">
            <span aria-hidden="true" />
            From our kitchen
          </span>
          <h2>Signatures worth<br className="hidden sm:block" /> slowing down for.</h2>
        </div>
        <a href="#menu" className="story-text-link">
          See the full menu <i className="ri-arrow-right-line" aria-hidden="true" />
        </a>
      </Reveal>

      <div className="signature-grid">
        {categories.slice(0, 4).map((item, index) => (
          <Reveal key={item.id} delay={index * 65}>
            <article className="signature-card group">
              <div className="signature-image">
                <SafeImage
                  src={item.image}
                  alt={item.recipesName}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <span className="signature-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="signature-card-copy">
                <div>
                  <h3>{item.recipesName}</h3>
                  <p>{item.recipesSubTitle}</p>
                </div>
                <span className="signature-price">{item.recipesPrice}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

export default PopularCategories;
