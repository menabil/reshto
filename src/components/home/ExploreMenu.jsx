"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { menu, menuTabs } from "@/data/data";

const tones = ["brand", "amber", "green", "violet", "rose", "slate"];

export const ExploreMenu = () => {
  const [active, setActive] = useState("breakfast");
  const items = menu[active] || [];

  return (
    <section id="menu" className="section bg-white">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-8">
          <SectionTitle eyebrow="Tasty & Delicious" title="Explore Our Menu" />

          <div className="flex flex-wrap justify-center gap-2 rounded-full bg-brand-50 p-1.5">
            {menuTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  active === tab.key
                    ? "bg-brand text-white shadow-soft"
                    : "text-ink-700 hover:text-brand"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={`${active}-${item.id}`}
              className="flex items-center gap-4 rounded-3xl border border-ink/5 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-card"
            >
              <Placeholder
                tone={tones[index % tones.length]}
                icon="ri-restaurant-line"
                className="h-20 w-20 shrink-0 rounded-2xl"
                iconClassName="text-2xl"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h5 className="truncate font-display text-base font-bold text-ink">
                    {item.menuItemName}
                  </h5>
                  <span className="hidden flex-1 translate-y-[-3px] border-b border-dashed border-ink/20 sm:block" />
                  <span className="font-display text-base font-extrabold text-brand">
                    {item.menuItemPrice}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-700/60">{item.menuItemDesc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#menu" className="btn-brand px-7! py-3.5! text-base!">
            View All <i className="ri-arrow-right-fill" />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default ExploreMenu;
