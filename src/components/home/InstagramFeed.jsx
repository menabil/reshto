import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { foodImages } from "@/constants/images";

const posts = [foodImages.pizza, foodImages.pasta, foodImages.chicken, foodImages.vegetables, foodImages.dessert, foodImages.sandwich];

export const InstagramFeed = () => (
  <section className="section bg-[#f8f7f5]">
    <Container>
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <SectionTitle eyebrow="@reshto" title="Instagram Post" />
        <a href="#contact" className="mt-3 text-sm font-semibold text-brand">Follow our kitchen <i className="ri-arrow-right-up-line" /></a>
      </Reveal>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {posts.map((image, index) => (
          <Reveal key={`${image}-${index}`} delay={index * 35}>
            <a href="#contact" className="instagram-tile" aria-label={`View Reshto food post ${index + 1}`}>
              <img src={image} alt="A freshly prepared Reshto dish" loading="lazy" />
              <span><i className="ri-instagram-line" /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

export default InstagramFeed;
