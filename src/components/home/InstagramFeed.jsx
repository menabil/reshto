import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";

const posts = [
  foodImages.pizza,
  foodImages.pasta,
  foodImages.chicken,
  foodImages.vegetables,
  foodImages.dessert,
  foodImages.burger,
];

export const InstagramFeed = () => (
  <section className="section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]">
    <Container>
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <SectionTitle eyebrow="@reshto" title="Instagram Post" />
        <a
          href="https://www.instagram.com/reshto"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-sm font-semibold text-brand dark:text-brand-300 hover:underline inline-flex items-center gap-1"
        >
          Follow our kitchen <i className="ri-arrow-right-up-line" />
        </a>
      </Reveal>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {posts.map((image, index) => (
          <Reveal key={`${image}-${index}`} delay={index * 35}>
            <a
              href="https://www.instagram.com/reshto"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-tile"
              aria-label={`View Reshto food post ${index + 1}`}
            >
              <SafeImage src={image} alt="A freshly prepared Reshto dish" />
              <span>
                <i className="ri-instagram-line" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

export default InstagramFeed;
