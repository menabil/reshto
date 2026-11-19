import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";
import { chefs } from "@/data/data";

const socials = ["ri-facebook-circle-fill", "ri-instagram-line", "ri-twitter-x-line"];

export const Chefs = () => (
  <section id="chefs" className="section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]">
    <Container>
      <Reveal className="mb-11 flex flex-col items-center text-center">
        <SectionTitle eyebrow="Our Team" title="Meet Our Chefs" />
        <p className="mt-4 max-w-xl text-sm leading-7 text-ink-700/65 dark:text-white/60 md:text-base">
          The creative hands and warm hearts behind every plate.
        </p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {chefs.map((chef, index) => (
          <Reveal key={chef.id} delay={index * 55}>
            <article className="chef-card dark:bg-[#1e1c1a] dark:border-white/10">
              <div className="chef-image">
                <SafeImage
                  src={foodImages.chefs[index]}
                  alt={chef.chefName}
                  className="w-full h-full object-cover"
                />
                <div className="chef-socials">
                  {socials.map((icon) => (
                    <a
                      key={icon}
                      href="#contact"
                      aria-label={`${chef.chefName} social profile`}
                      className="dark:bg-[#171614] dark:text-white dark:hover:bg-brand dark:hover:text-[#171512]"
                    >
                      <i className={icon} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                  {chef.chefName}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand dark:text-brand-300">
                  {chef.chefInfo}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

export default Chefs;
