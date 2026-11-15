import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { chefs } from "@/data/data";

const tones = ["brand", "amber", "green", "violet"];
const socials = ["ri-facebook-circle-fill", "ri-twitter-fill", "ri-linkedin-box-fill"];

export const Chefs = () => {
  return (
    <section id="chefs" className="section bg-white">
      <Container>
        <Reveal className="mb-12">
          <SectionTitle eyebrow="Our Team" title="Meet Our Chefs" />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {chefs.map((chef, index) => (
            <Reveal key={chef.id} delay={index * 70}>
              <article className="group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-card">
                <div className="relative">
                  <Placeholder
                    tone={tones[index % tones.length]}
                    icon="ri-user-3-line"
                    className="h-64 w-full"
                    iconClassName="text-6xl"
                  />
                  <div className="absolute inset-x-0 bottom-4 flex translate-y-6 justify-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {socials.map((icon) => (
                      <a
                        key={icon}
                        href="#"
                        className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:bg-brand hover:text-white"
                      >
                        <i className={`${icon} text-sm`} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h5 className="font-display text-lg font-bold text-ink">{chef.chefName}</h5>
                  <p className="mt-1 text-sm text-brand">{chef.chefInfo}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Chefs;
