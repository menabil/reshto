"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/constants/site";
import { menu, menuTabs } from "@/data/data";

export const ExploreMenu = () => {
  const [activeTab, setActiveTab] = useState("breakfast");
  const [query, setQuery] = useState("");

  const rawItems = menu[activeTab] || [];

  const items = rawItems.filter((item) =>
    `${item.menuItemName} ${item.menuItemDesc}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <section id="menu" className="section bg-[#f2ece1] transition-colors duration-300 dark:bg-[#171614]">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-6 text-center">
          <SectionTitle eyebrow="Tasty & Delicious" title="Explore Our Menu" />

          {/* Search bar */}
          <div className="menu-search dark:bg-[#1e1c1a] dark:border-white/10 dark:text-white">
            <i className="ri-search-line" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dishes by name or ingredient..."
              aria-label="Filter menu dishes"
              className="dark:text-white placeholder:dark:text-white/40"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear menu search"
                className="dark:bg-white/10 dark:text-white"
              >
                <i className="ri-close-line" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          {/* Category Tabs */}
          <div
            className="menu-tabs dark:bg-[#1e1c1a] dark:border-white/10"
            role="group"
            aria-label="Filter menu by meal"
          >
            {menuTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={activeTab === tab.key}
                className={
                  activeTab === tab.key
                    ? "menu-tab active"
                    : "menu-tab dark:text-white/70 hover:dark:text-white"
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={`${activeTab}-${item.id}`}
              className="menu-item dark:bg-[#1e1c1a] dark:border-white/10"
            >
              <SafeImage
                className="menu-item-image rounded-xl"
                src={item.image}
                alt={item.menuItemName}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-bold text-ink dark:text-white md:text-lg">
                    {item.menuItemName}
                  </h3>
                  <span className="shrink-0 font-display font-extrabold text-brand dark:text-brand-300">
                    {item.menuItemPrice}
                  </span>
                </div>

                <p className="mt-1 text-sm text-ink-700/70 dark:text-white/60">
                  {item.menuItemDesc}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-2.5 dark:border-white/5">
                  <span
                    className="flex gap-0.5 text-xs text-amber-500"
                    aria-label="Rated 5 out of 5"
                  >
                    <i className="ri-star-fill" />
                    <i className="ri-star-fill" />
                    <i className="ri-star-fill" />
                    <i className="ri-star-fill" />
                    <i className="ri-star-fill" />
                  </span>
                  <a
                    className="menu-order hover:underline"
                    href={`tel:${siteConfig.contact.phone}`}
                    aria-label={`Call to order ${item.menuItemName}`}
                  >
                    Order <i className="ri-arrow-right-line" />
                  </a>
                </div>
              </div>
            </article>
          ))}

          {items.length === 0 ? (
            <p
              className="menu-empty md:col-span-2 dark:border-white/15 dark:text-white/60"
              role="status"
            >
              No dishes found for &quot;{query}&quot;. Try another search.
            </p>
          ) : null}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/order"
            className="btn-outline dark:bg-[#1e1c1a] dark:text-white dark:border-white/15 dark:hover:border-brand"
          >
            Order from the Full Menu <i className="ri-arrow-right-line" />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default ExploreMenu;
