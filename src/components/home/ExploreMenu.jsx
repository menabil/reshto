"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SafeImage } from "@/components/ui/SafeImage";
import { menu, menuTabs } from "@/data/data";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { FoodQuickViewModal } from "@/components/ui/FoodQuickViewModal";

const TAB_KEYS = {
  breakfast: "cat.breakfast",
  lunch: "cat.lunch",
  dinner: "cat.dinner",
  dessert: "cat.desserts",
  drinks: "cat.drinks",
};

export const ExploreMenu = () => {
  const { isFavorite, toggleFavorite, updateQuantity, openCart } = useStore();
  const { t, formatPrice } = useLanguage();
  const [activeTab, setActiveTab] = useState("breakfast");
  const [query, setQuery] = useState("");
  const [quickViewDish, setQuickViewDish] = useState(null);

  const rawItems = menu[activeTab] || [];

  const items = rawItems.filter((item) =>
    `${item.menuItemName} ${item.menuItemDesc}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <section id="menu" className="section bg-[#f2ece1] transition-colors duration-300 dark:bg-[#171614]">
      {quickViewDish && (
        <FoodQuickViewModal
          dish={quickViewDish}
          onClose={() => setQuickViewDish(null)}
        />
      )}
      <Container>
        <div className="mb-10 flex flex-col items-center gap-6 text-center">
          <SectionTitle
            eyebrow={t("menu.eyebrow", "Tasty & Delicious")}
            title={t("menu.title", "Explore Our Menu")}
          />

          {/* Search bar */}
          <div className="menu-search dark:bg-[#1e1c1a] dark:border-white/10 dark:text-white">
            <i className="ri-search-line" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("menu.searchPlaceholder", "Search dishes by name or ingredient...")}
              aria-label="Filter menu dishes"
              className="dark:text-white placeholder:dark:text-white/40"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("menu.clear", "Clear search")}
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
            {menuTabs.map((tab) => {
              const label = t(TAB_KEYS[tab.key] || tab.label, tab.label);
              return (
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
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => {
            const dishId = item.id;
            const isFav = isFavorite(dishId);
            const enrichedItem = { ...item, category: activeTab };

            return (
              <article
                key={`${activeTab}-${item.id}`}
                onClick={() => setQuickViewDish(enrichedItem)}
                className="menu-item relative dark:bg-[#1e1c1a] dark:border-white/10 group cursor-pointer hover:border-brand/40 transition-all"
              >
                {/* Floating Wishlist Heart Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dishId);
                  }}
                  aria-label={isFav ? "Remove from wishlist" : "Save to wishlist"}
                  className={`absolute top-3 left-3 z-10 grid h-7 w-7 place-items-center rounded-full backdrop-blur-md transition shadow-xs ${
                    isFav
                      ? "bg-rose-500 text-white animate-pulse"
                      : "bg-black/35 text-white/90 hover:bg-black/60 hover:text-rose-400"
                  }`}
                  title={isFav ? "Saved to favorites" : "Add to favorites"}
                >
                  <i className={isFav ? "ri-heart-fill text-xs" : "ri-heart-line text-xs"} />
                </button>

                <SafeImage
                  className="menu-item-image rounded-xl group-hover:scale-105 transition-transform duration-300"
                  src={item.image}
                  alt={item.menuItemName}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-bold text-ink dark:text-white md:text-lg">
                      {item.menuItemName}
                    </h3>
                    <span className="shrink-0 font-display font-extrabold text-brand dark:text-brand-300">
                      {formatPrice(item.menuItemPrice)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-ink-700/70 dark:text-white/60">
                    {item.menuItemDesc}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-2.5 dark:border-white/5">
                    <span className="text-[11px] font-bold text-ink-700/60 dark:text-white/50 flex items-center gap-1">
                      <i className="ri-information-line" /> {t("menu.quickView", "Quick View")}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(`${activeTab}-${item.id}`, 1);
                        openCart();
                      }}
                      className="menu-order hover:underline text-xs font-bold text-brand"
                    >
                      {t("menu.addToCart", "+ Add to Cart")} <i className="ri-shopping-bag-3-line ml-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {items.length === 0 ? (
            <p
              className="menu-empty md:col-span-2 dark:border-white/15 dark:text-white/60"
              role="status"
            >
              {t("menu.noDishes", `No dishes found for "${query}". Try another search.`)}
            </p>
          ) : null}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/order"
            className="btn-outline dark:bg-[#1e1c1a] dark:text-white dark:border-white/15 dark:hover:border-brand"
          >
            {t("menu.fullCatalogBtn", "Order from the Full Menu")} <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ExploreMenu;
