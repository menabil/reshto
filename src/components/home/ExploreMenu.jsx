"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { menuImages } from "@/constants/images";
import { siteConfig } from "@/constants/site";
import { menu, menuTabs } from "@/data/data";

export const ExploreMenu = () => {
  const [active, setActive] = useState("breakfast");
  const [query, setQuery] = useState("");
  const items = (menu[active] || [])
    .map((item, index) => ({ item, index }))
    .filter(({ item }) =>
      `${item.menuItemName} ${item.menuItemDesc}`.toLowerCase().includes(query.trim().toLowerCase())
    );

  return (
    <section id="menu" className="section bg-[#f4f0e7]">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-7 text-center">
          <SectionTitle eyebrow="Tasty & Delicious" title="Explore Our Menu" />
          <div className="menu-search">
            <i className="ri-search-line" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dishes..."
              aria-label="Filter menu dishes"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear menu search">
                <i className="ri-close-line" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <div className="menu-tabs" role="group" aria-label="Filter menu by meal">
            {menuTabs.map((tab) => (
              <button key={tab.key} type="button" onClick={() => setActive(tab.key)} aria-pressed={active === tab.key} className={active === tab.key ? "menu-tab active" : "menu-tab"}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map(({ item, index }) => (
            <article key={`${active}-${item.id}`} className="menu-item">
              <img className="menu-item-image" src={menuImages[active][index]} alt={item.menuItemName} loading="lazy" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-bold text-ink md:text-lg">{item.menuItemName}</h3>
                  <span className="shrink-0 font-display font-extrabold text-brand">{item.menuItemPrice}</span>
                </div>
                <p className="mt-1 text-sm text-ink-700/60">{item.menuItemDesc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex gap-0.5 text-xs text-amber-500" aria-label="Rated 5 out of 5"><i className="ri-star-fill" /><i className="ri-star-fill" /><i className="ri-star-fill" /><i className="ri-star-fill" /><i className="ri-star-fill" /></span>
                  <a className="menu-order" href={`tel:${siteConfig.contact.phone}`} aria-label={`Call to order ${item.menuItemName}`}>Order <i className="ri-arrow-right-line" /></a>
                </div>
              </div>
            </article>
          ))}
          {items.length === 0 ? (
            <p className="menu-empty md:col-span-2" role="status">No dishes match &quot;{query}&quot;. Try another search.</p>
          ) : null}
        </div>
        <div className="mt-9 text-center"><a href="/order" className="btn-outline">Order from the Full Menu <i className="ri-arrow-right-line" /></a></div>
      </Container>
    </section>
  );
};

export default ExploreMenu;
