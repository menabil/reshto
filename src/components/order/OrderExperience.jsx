"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/constants/site";
import { menuTabs } from "@/data/data";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import { FoodQuickViewModal } from "@/components/ui/FoodQuickViewModal";

const TAB_KEYS = {
  breakfast: "cat.breakfast",
  lunch: "cat.lunch",
  dinner: "cat.dinner",
  dessert: "cat.desserts",
  drinks: "cat.drinks",
};

export const OrderExperience = ({ initialSearch }) => {
  const {
    menuItems,
    quantities,
    updateQuantity,
    cartItems,
    cartCount,
    cartSubtotal,
    isFavorite,
    toggleFavorite,
  } = useStore();
  const { t, formatPrice } = useLanguage();

  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState(initialSearch);
  const [quickViewDish, setQuickViewDish] = useState(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      `${item.menuItemName} ${item.menuItemDesc} ${item.categoryLabel || ""}`
        .toLowerCase()
        .includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const phoneLink = siteConfig.contact.phone.replace(/[^\d+]/g, "");

  return (
    <>
      {quickViewDish && (
        <FoodQuickViewModal
          dish={quickViewDish}
          onClose={() => setQuickViewDish(null)}
        />
      )}
      <section className="subpage-hero order-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-restaurant-2-fill" /> {t("hero.eyebrow", "Fresh from our kitchen")}
          </span>
          <h1>
            {t("hero.title1", "Make it a")} <span>Reshto</span> {t("hero.title2", "moment.")}
          </h1>
          <p>{t("hero.subtitle", "Pick your favorites, build your order, and call us or check out online.")}</p>
        </Container>
      </section>

      <section className="order-section transition-colors duration-300 dark:bg-[#0f0e0d]">
        <Container>
          <div className="order-intro">
            <div>
              <span className="section-pill dark:bg-brand-900/40 dark:text-brand-300">
                <i className="ri-leaf-line" /> {t("menu.eyebrow", "Made fresh to order")}
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
                {t("menu.title", "What sounds good?")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-700/65 dark:text-white/60">
                {t("cart.browseMenu", "Explore the menu and add your favorite dishes.")}
              </p>
            </div>
            <Link
              href="/#menu"
              className="order-back-link dark:text-white/70 hover:dark:text-brand-300"
            >
              <i className="ri-arrow-left-line" /> {t("nav.home", "Back to home")}
            </Link>
          </div>

          <div className="order-layout">
            <div className="order-catalog">
              {/* Search */}
              <div className="menu-search order-search dark:bg-[#1e1c1a] dark:border-white/10">
                <i className="ri-search-line" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("menu.searchPlaceholder", "Search dishes or ingredients...")}
                  aria-label="Search order menu"
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

              {/* Meal Category Filters */}
              <div
                className="order-categories"
                role="group"
                aria-label="Filter menu by category"
              >
                <button
                  type="button"
                  className={
                    activeCategory === "all"
                      ? "order-category active"
                      : "order-category dark:bg-[#1e1c1a] dark:text-white/70 dark:border-white/10"
                  }
                  aria-pressed={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                >
                  {t("cat.all", "All dishes")}
                </button>
                {menuTabs.map((tab) => {
                  const label = t(TAB_KEYS[tab.key] || tab.label, tab.label);
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      className={
                        activeCategory === tab.key
                          ? "order-category active"
                          : "order-category dark:bg-[#1e1c1a] dark:text-white/70 dark:border-white/10"
                      }
                      aria-pressed={activeCategory === tab.key}
                      onClick={() => setActiveCategory(tab.key)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <p className="order-result-count dark:text-white/60" role="status">
                {filteredItems.length} {t("cat.all", "dishes")}
                {normalizedQuery ? ` matching "${query.trim()}"` : ""}
              </p>

              {/* Dish list */}
              <div className="order-menu-grid">
                {filteredItems.map((item) => {
                  const dishId = item.id || item.cartId;
                  const isFav = isFavorite(dishId);

                  return (
                    <article
                      className="order-card relative dark:bg-[#1e1c1a] dark:border-white/10 group cursor-pointer"
                      key={item.cartId}
                      onClick={() => setQuickViewDish(item)}
                    >
                      {/* Floating Wishlist Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(dishId);
                        }}
                        aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
                        className={`absolute top-2.5 left-2.5 z-10 grid h-7 w-7 place-items-center rounded-full backdrop-blur-md transition shadow-xs ${
                          isFav
                            ? "bg-rose-500 text-white animate-pulse"
                            : "bg-black/35 text-white/90 hover:bg-black/60 hover:text-rose-400"
                        }`}
                        title={isFav ? "Saved to favorites" : "Add to favorites"}
                      >
                        <i className={isFav ? "ri-heart-fill text-xs" : "ri-heart-line text-xs"} />
                      </button>

                      <SafeImage
                        src={item.image}
                        alt={item.menuItemName}
                        className="w-24 sm:w-28 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="order-card-content">
                        <div className="flex items-center justify-between">
                          <span className="order-card-category dark:text-brand-300">
                            {t(TAB_KEYS[item.category] || item.categoryLabel, item.categoryLabel)}
                          </span>
                          <span className="text-[10px] text-ink-700/60 dark:text-white/40 flex items-center gap-0.5">
                            <i className="ri-information-line" /> {t("menu.details", "details")}
                          </span>
                        </div>
                        <h3 className="dark:text-white">{item.menuItemName}</h3>
                        <p className="dark:text-white/60">{item.menuItemDesc}</p>
                        <div
                          className="order-card-footer dark:border-white/5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <strong className="dark:text-white">
                            {formatPrice(item.menuItemPrice)}
                          </strong>
                          {item.inStock === false ? (
                            <span className="rounded-lg bg-rose-500/10 px-2 py-1 text-[11px] font-bold text-rose-500 dark:bg-rose-500/20 dark:text-rose-400">
                              {t("menu.soldOut", "Sold Out")}
                            </span>
                          ) : quantities[item.cartId] ? (
                            <div
                              className="quantity-control dark:bg-[#0f0e0d] dark:border-white/10"
                              aria-label={`${item.menuItemName} quantity`}
                            >
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartId, -1)}
                                aria-label={`Remove one ${item.menuItemName}`}
                                className="dark:bg-[#2c2925] dark:text-white"
                              >
                                <i className="ri-subtract-line" aria-hidden="true" />
                              </button>
                              <span aria-live="polite" className="dark:text-white">
                                {quantities[item.cartId]}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartId, 1)}
                                aria-label={`Add one ${item.menuItemName}`}
                                className="dark:bg-[#2c2925] dark:text-white"
                              >
                                <i className="ri-add-line" aria-hidden="true" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="btn-brand order-button"
                            >
                              {t("dish.addToCart", "Add to Cart")}
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}

                {!filteredItems.length && (
                  <div className="order-empty dark:border-white/10 dark:text-white/60">
                    <p>{t("menu.noDishes", "No dishes found. Try another search.")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Order Summary */}
            <aside className="order-summary dark:bg-[#1e1c1a] dark:border-white/10">
              <div className="order-summary-header">
                <div>
                  <h2 className="dark:text-white">{t("checkout.orderSummary", "Order Summary")}</h2>
                  <p className="dark:text-white/60">
                    {cartCount ? `${cartCount} ${t("cart.itemsSelected", "items selected")}` : t("cart.emptyTitle", "Your tray is empty")}
                  </p>
                </div>
                <span className="order-count dark:bg-white/10 dark:text-white">
                  {cartCount}
                </span>
              </div>

              {cartItems.length ? (
                <ul className="order-summary-items">
                  {cartItems.map((item) => (
                    <li key={item.cartId}>
                      <span>
                        <strong className="dark:text-white">
                          {item.menuItemName}
                        </strong>
                        <small className="dark:text-white/60">
                          {formatPrice(item.menuItemPrice)} {t("menu.each", "each")}
                        </small>
                      </span>
                      <div
                        className="quantity-control compact dark:bg-[#0f0e0d] dark:border-white/10"
                        aria-label={`${item.menuItemName} quantity`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, -1)}
                          aria-label={`Remove one ${item.menuItemName}`}
                          className="dark:bg-[#2c2925] dark:text-white"
                        >
                          <i className="ri-subtract-line" aria-hidden="true" />
                        </button>
                        <span className="dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, 1)}
                          aria-label={`Add one ${item.menuItemName}`}
                          className="dark:bg-[#2c2925] dark:text-white"
                        >
                          <i className="ri-add-line" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="order-summary-empty">
                  <span className="order-empty-icon dark:bg-white/5 dark:text-brand-300">
                    <i className="ri-shopping-bag-3-line" aria-hidden="true" />
                  </span>
                  <p className="dark:text-white">
                    {t("cart.emptyDesc", "Your order is waiting for something delicious.")}
                  </p>
                  <small className="dark:text-white/60">
                    {t("cart.browseMenu", "Add a dish to get started.")}
                  </small>
                </div>
              )}

              <div className="order-subtotal dark:border-white/10 dark:text-white">
                <span>{t("cart.subtotal", "Subtotal")}</span>
                <strong className="dark:text-brand-300">
                  {formatPrice(cartSubtotal)}
                </strong>
              </div>
              <p className="order-disclaimer dark:text-white/50">
                {t("cart.tax", "Applicable taxes, delivery fee, and coupons calculated at checkout.")}
              </p>
              {cartCount > 0 ? (
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/checkout"
                    className="btn-brand flex w-full items-center justify-center gap-2 py-3 text-xs! font-bold shadow-md"
                  >
                    <i className="ri-secure-payment-line text-sm" /> {t("cart.proceedCheckout", "Proceed to Checkout")}
                  </Link>

                  <a
                    href={generateWhatsAppOrderUrl({
                      items: cartItems,
                      subtotal: formatPrice(cartSubtotal),
                      total: formatPrice(cartSubtotal),
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs font-bold text-white transition shadow-xs"
                  >
                    <i className="ri-whatsapp-line text-base" /> {t("cart.orderWhatsApp", "Order via WhatsApp")}
                  </a>

                  <a
                    className="order-phone mt-2 text-center text-xs dark:text-white hover:dark:text-brand-300"
                    href={`tel:${phoneLink}`}
                  >
                    <i className="ri-phone-line" aria-hidden="true" /> {t("contact.phone", "Call us")}: {siteConfig.contact.phone}
                  </a>
                </div>
              ) : (
                <button className="btn-brand order-call mt-4" type="button" disabled>
                  {t("cart.browseMenu", "Add items to continue")}
                </button>
              )}
              <p className="order-hours dark:text-white/50">
                <i className="ri-time-line" aria-hidden="true" />{" "}
                {siteConfig.contact.hours.join(" · ")}
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
};

export default OrderExperience;
