import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { foodImages } from "@/constants/images";
import { chefs } from "@/data/data";

export const metadata = {
  title: "Meet Our Chefs",
  description:
    "Meet the world-class culinary artists, pastry masters, and executive chefs at Reshto.",
};

const chefDetails = [
  {
    id: 1,
    name: "Herman Jacobs",
    role: "Executive Head Chef",
    bio: "With over 18 years across Michelin-starred European bistros, Chef Herman brings classic French and Italian techniques fused with modern sustainable ingredients.",
    specialty: "Prime Ribeye & Handcrafted Pastas",
    experience: "18+ Years Experience",
  },
  {
    id: 2,
    name: "Olivia Brown",
    role: "Master Pastry Chef",
    bio: "Olivia turns artisan baking into fine art. From velvety dark chocolate tarts to light-as-air seasonal fruit soufflés, every dessert tells an enchanting story.",
    specialty: "Artisan Tarts & Panna Cotta",
    experience: "12+ Years Experience",
  },
  {
    id: 3,
    name: "Liam Turner",
    role: "Gourmet Grill Specialist",
    bio: "Specializing in open-flame cooking and aged meats, Liam ensures every steak and seafood cut is grilled to tender perfection with signature herb marinades.",
    specialty: "Filet Mignon & Garlic Herb Shrimp",
    experience: "14+ Years Experience",
  },
  {
    id: 4,
    name: "Sophia Wilson",
    role: "Culinary Innovator & Sommelier",
    bio: "Sophia blends world flavors with organic, locally harvested botanicals, curating harmonious beverage pairings and creative plant-based wonders.",
    specialty: "Artisan Mocktails & Mediterranean Bowls",
    experience: "10+ Years Experience",
  },
];

const philosophyPoints = [
  {
    icon: "ri-seedling-line",
    title: "100% Farm-Fresh Produce",
    desc: "We partner with local organic growers to ensure only peak-season vegetables and herbs enter our kitchen.",
  },
  {
    icon: "ri-fire-line",
    title: "Artisanal Techniques",
    desc: "From slow 24-hour broths to wood-fired grilling, we take no shortcuts when crafting authentic flavors.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Cooking with Intention",
    desc: "Every dish is balanced for taste, texture, and wholesome nutrition without artificial additives.",
  },
];

export default function ChefsPage() {
  return (
    <>
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-award-line" /> The Culinary Artists
          </span>
          <h1>
            Meet the talent behind<br />
            <span>every unforgettable bite.</span>
          </h1>
          <p>
            Our master chefs bring together decades of world culinary heritage, relentless creativity,
            and genuine love for food.
          </p>
        </Container>
      </section>

      <section className="section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {chefDetails.map((chef, idx) => (
              <article
                key={chef.id}
                className="overflow-hidden rounded-4xl border border-ink/10 bg-white shadow-md transition hover:shadow-xl dark:border-white/10 dark:bg-[#1e1c1a]"
              >
                <div className="grid sm:grid-cols-[.95fr_1.05fr]">
                  <div className="relative min-h-70 sm:min-h-full">
                    <SafeImage
                      src={foodImages.chefs[idx]}
                      alt={chef.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-xl bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                      {chef.experience}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-7">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand dark:text-brand-300">
                        {chef.role}
                      </span>
                      <h2 className="mt-1 font-display text-2xl font-bold text-ink dark:text-white">
                        {chef.name}
                      </h2>
                      <p className="mt-3 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
                        {chef.bio}
                      </p>

                      <div className="mt-4 rounded-2xl bg-brand/5 p-3 dark:bg-white/5">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/40">
                          Signature Specialty:
                        </span>
                        <strong className="text-xs font-semibold text-brand dark:text-brand-300">
                          {chef.specialty}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-ink/5 pt-4 dark:border-white/5">
                      <div className="flex gap-2 text-ink-700/60 dark:text-white/50">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-full hover:bg-brand hover:text-white transition">
                          <i className="ri-instagram-line" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-full hover:bg-brand hover:text-white transition">
                          <i className="ri-facebook-fill" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-full hover:bg-brand hover:text-white transition">
                          <i className="ri-twitter-x-line" />
                        </a>
                      </div>
                      <Link href="/menu" className="text-xs font-bold text-brand hover:underline dark:text-brand-300">
                        View Creations &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Kitchen Philosophy */}
          <div className="mt-20">
            <div className="mb-10 text-center">
              <span className="section-pill dark:bg-brand-900/40 dark:text-brand-300">
                <i className="ri-sparkling-fill" /> Behind the Kitchen
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
                Our Kitchen Standards
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {philosophyPoints.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-ink/10 bg-white p-7 text-center shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-2xl text-brand dark:bg-brand/20 dark:text-brand-300">
                    <i className={item.icon} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link href="/reservation" className="btn-brand">
              Reserve a Table to Taste Their Magic <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </Container>
      </section>

      <GalleryExperience />
    </>
  );
}
