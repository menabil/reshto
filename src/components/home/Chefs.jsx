import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { foodImages } from "@/constants/images";
import { siteConfig } from "@/constants/site";
import { chefs } from "@/data/data";

const socials = [
  { icon: "ri-facebook-circle-fill", label: "Facebook", href: siteConfig.links.facebook },
  { icon: "ri-instagram-line", label: "Instagram", href: siteConfig.links.instagram },
  { icon: "ri-twitter-x-line", label: "Twitter", href: siteConfig.links.twitter },
];

export const Chefs = () => (
  <section id="chefs" className="section bg-[#f7f4ed]">
    <Container>
      <Reveal className="mb-11 flex flex-col items-center text-center">
        <SectionTitle eyebrow="Our Team" title="Meet Our Chefs" />
        <p className="mt-4 max-w-xl text-sm leading-7 text-ink-700/65 md:text-base">The creative hands and warm hearts behind every plate.</p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {chefs.map((chef, index) => (
          <Reveal key={chef.id} delay={index * 55}>
            <article className="chef-card">
              <div className="chef-image"><img src={foodImages.chefs[index]} alt={chef.chefName} loading="lazy" /><div className="chef-socials">{socials.map((social) => <a key={social.icon} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${chef.chefName} on ${social.label}`}><i className={social.icon} /></a>)}</div></div>
              <div className="p-5 text-center"><h3 className="font-display text-lg font-bold text-ink">{chef.chefName}</h3><p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">{chef.chefInfo}</p></div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

export default Chefs;
