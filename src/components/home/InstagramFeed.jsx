import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const tones = ["brand", "amber", "green", "violet", "rose", "slate"];

export const InstagramFeed = () => {
  const posts = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="section bg-soft-primary/40">
      <Container>
        <Reveal className="mb-12">
          <SectionTitle eyebrow="@reshto" title="Instagram Post" />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {posts.map((post, index) => (
            <Reveal key={post} delay={index * 40}>
              <a href="#" className="group relative block overflow-hidden rounded-2xl">
                <Placeholder
                  tone={tones[index % tones.length]}
                  icon="ri-instagram-line"
                  className="aspect-square w-full"
                  iconClassName="text-3xl"
                />
                <span className="absolute inset-0 grid place-items-center bg-brand/70 opacity-0 transition duration-300 group-hover:opacity-100">
                  <i className="ri-instagram-fill text-3xl text-white" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default InstagramFeed;
