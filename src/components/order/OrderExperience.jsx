"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/constants/site";
import { menu, menuTabs } from "@/data/data";

const allMenuItems = menuTabs.flatMap((tab) =>
  menu[tab.key].map((item) => ({
    ...item,
    category: tab.key,
    categoryLabel: tab.label,
    cartId: `${tab.key}-${item.id}`,
  }))
);

const getPrice = (price) => Number(price.replace("$", ""));

export const OrderExperience = ({ initialSearch }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState(initialSearch);
  const [quantities, setQuantities] = useState({});

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = allMenuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      `${item.menuItemName} ${item.menuItemDesc} ${item.categoryLabel}`
        .toLowerCase()
        .includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const selectedItems = allMenuItems.filter((item) => quantities[item.cartId] > 0);
  const itemCount = selectedItems.reduce(
    (total, item) => total + quantities[item.cartId],
    0
  );
  const subtotal = selectedItems.reduce(
    (total, item) => total + getPrice(item.menuItemPrice) * quantities[item.cartId],
    0
  );
  const phoneLink = siteConfig.contact.phone.replace(/[^\d+]/g, "");

  const changeQuantity = (cartId, amount) => {
    setQuantities((current) => {
      const quantity = (current[cartId] || 0) + amount;
      const next = { ...current };

      if (quantity > 0) {
        next[cartId] = quantity;
      } else {
        delete next[cartId];
      }

      return next;
    });
  };

  return (
    <>
      <section className="subpage-hero order-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-restaurant-2-fill" /> Fresh from our kitchen
          </span>
          <h1>
            Make it a <span>Reshto</span> moment.
          </h1>
          <p>Pick your favorites, build your order, and call us or check out online.</p>
        </Container>
      </section>

      <section className="order-section transition-colors duration-300 dark:bg-[#0c1612]">
        <Container>
          <div className="order-intro">
            <div>
              <span className="section-pill dark:bg-brand-900/40 dark:text-brand-300">
                <i className="ri-leaf-line" /> Made fresh to order
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
                What sounds good?
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-700/65 dark:text-white/60">
                Explore the menu and add your favorite dishes.
              </p>
            </div>
            <Link
              href="/#menu"
              className="order-back-link dark:text-white/70 hover:dark:text-brand-300"
            >
              <i className="ri-arrow-left-line" /> Back to home
            </Link>
          </div>

          <div className="order-layout">
            <div className="order-catalog">
              {/* Search */}
              <div className="menu-search order-search dark:bg-[#15241d] dark:border-white/10">
                <i className="ri-search-line" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search dishes or ingredients..."
                  aria-label="Search order menu"
                  className="dark:text-white placeholder:dark:text-white/40"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
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
                      : "order-category dark:bg-[#15241d] dark:text-white/70 dark:border-white/10"
                  }
                  aria-pressed={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                >
                  All dishes
                </button>
                {menuTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    className={
                      activeCategory === tab.key
                        ? "order-category active"
                        : "order-category dark:bg-[#15241d] dark:text-white/70 dark:border-white/10"
                    }
                    aria-pressed={activeCategory === tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <p className="order-result-count dark:text-white/60" role="status">
                {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"}
                {normalizedQuery ? ` matching "${query.trim()}"` : ""}
              </p>

              {/* Dish list */}
              <div className="order-menu-grid">
                {filteredItems.map((item) => (
                  <article
                    className="order-card dark:bg-[#15241d] dark:border-white/10"
                    key={item.cartId}
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.menuItemName}
                      className="w-24 sm:w-28 object-cover"
                    />
                    <div className="order-card-content">
                      <span className="order-card-category dark:text-brand-300">
                        {item.categoryLabel}
                      </span>
                      <h3 className="dark:text-white">{item.menuItemName}</h3>
                      <p className="dark:text-white/60">{item.menuItemDesc}</p>
                      <div className="order-card-footer dark:border-white/5">
                        <strong className="dark:text-white">
                          {item.menuItemPrice}
                        </strong>
                        {quantities[item.cartId] ? (
                          <div
                            className="quantity-control dark:bg-[#1a2f26] dark:border-white/10"
                            aria-label={`${item.menuItemName} quantity`}
                          >
                            <button
                              type="button"
                              onClick={() => changeQuantity(item.cartId, -1)}
                              aria-label={`Remove one ${item.menuItemName}`}
                              className="dark:bg-[#253f33] dark:text-white"
                            >
                              <i className="ri-subtract-line" aria-hidden="true" />
                            </button>
                            <span aria-live="polite" className="dark:text-white">
                              {quantities[item.cartId]}
                            </span>
                            <button
                              type="button"
                              onClick={() => changeQuantity(item.cartId, 1)}
                              aria-label={`Add one ${item.menuItemName}`}
                              className="dark:bg-[#253f33] dark:text-white"
                            >
                              <i className="ri-add-line" aria-hidden="true" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="order-add dark:bg-white/10 dark:text-white dark:hover:bg-brand"
                            onClick={() => changeQuantity(item.cartId, 1)}
                            aria-label={`Add ${item.menuItemName} to order`}
                          >
                            Add <i className="ri-add-line" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}

                {filteredItems.length === 0 ? (
                  <div className="order-empty dark:border-white/15 dark:text-white/60">
                    <i className="ri-search-eye-line" aria-hidden="true" />
                    <h3 className="dark:text-white">No dishes found</h3>
                    <p>Try a different search or choose another category.</p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside
              className="order-summary dark:bg-[#15241d]/95 dark:border-white/10"
              aria-label="Your order"
            >
              <div className="order-summary-heading dark:border-white/10">
                <div>
                  <span className="order-card-category dark:text-brand-300">
                    Your selection
                  </span>
                  <h2 className="dark:text-white">Your order</h2>
                </div>
                <span className="order-count dark:bg-white/10 dark:text-white">
                  {itemCount}
                </span>
              </div>

              {selectedItems.length ? (
                <ul className="order-summary-items">
                  {selectedItems.map((item) => (
                    <li key={item.cartId}>
                      <span>
                        <strong className="dark:text-white">
                          {item.menuItemName}
                        </strong>
                        <small className="dark:text-white/60">
                          {item.menuItemPrice} each
                        </small>
                      </span>
                      <div
                        className="quantity-control compact dark:bg-[#1a2f26] dark:border-white/10"
                        aria-label={`${item.menuItemName} quantity`}
                      >
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.cartId, -1)}
                          aria-label={`Remove one ${item.menuItemName}`}
                          className="dark:bg-[#253f33] dark:text-white"
                        >
                          <i className="ri-subtract-line" aria-hidden="true" />
                        </button>
                        <span className="dark:text-white">
                          {quantities[item.cartId]}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.cartId, 1)}
                          aria-label={`Add one ${item.menuItemName}`}
                          className="dark:bg-[#253f33] dark:text-white"
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
                    Your order is waiting for something delicious.
                  </p>
                  <small className="dark:text-white/60">
                    Add a dish to get started.
                  </small>
                </div>
              )}

              <div className="order-subtotal dark:border-white/10 dark:text-white">
                <span>Subtotal</span>
                <strong className="dark:text-brand-300">
                  ${subtotal.toFixed(2)}
                </strong>
              </div>
              <p className="order-disclaimer dark:text-white/50">
                Taxes, delivery, and availability are confirmed when you call.
              </p>
              {itemCount > 0 ? (
                <a className="btn-brand order-call" href={`tel:${phoneLink}`}>
                  Call to confirm <i className="ri-phone-line" aria-hidden="true" />
                </a>
              ) : (
                <button className="btn-brand order-call" type="button" disabled>
                  Add items to continue
                </button>
              )}
              <a
                className="order-phone dark:text-white hover:dark:text-brand-300"
                href={`tel:${phoneLink}`}
              >
                <i className="ri-phone-line" aria-hidden="true" />{" "}
                {siteConfig.contact.phone}
              </a>
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
