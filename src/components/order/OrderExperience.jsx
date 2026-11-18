"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { menuImages } from "@/constants/images";
import { siteConfig } from "@/constants/site";
import { menu, menuTabs } from "@/data/data";

const allMenuItems = menuTabs.flatMap((tab) =>
  menu[tab.key].map((item, index) => ({
    ...item,
    category: tab.key,
    categoryLabel: tab.label,
    image: menuImages[tab.key][index],
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
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = `${item.menuItemName} ${item.menuItemDesc} ${item.categoryLabel}`
      .toLowerCase()
      .includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });
  const selectedItems = allMenuItems.filter((item) => quantities[item.cartId] > 0);
  const itemCount = selectedItems.reduce((total, item) => total + quantities[item.cartId], 0);
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
          <span className="hero-eyebrow"><i className="ri-restaurant-2-fill" /> Fresh from our kitchen</span>
          <h1>Make it a <span>Reshto</span> moment.</h1>
          <p>Pick your favorites, build your order, and call us to confirm delivery or pickup.</p>
        </Container>
      </section>

      <section className="order-section">
        <Container>
          <div className="order-intro">
            <div>
              <span className="section-pill"><i className="ri-leaf-line" /> Made fresh to order</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">What sounds good?</h2>
              <p className="mt-2 text-sm leading-6 text-ink-700/65">Explore the menu and add a little something to your order.</p>
            </div>
            <Link href="/#menu" className="order-back-link"><i className="ri-arrow-left-line" /> Back to home</Link>
          </div>

          <div className="order-layout">
            <div className="order-catalog">
              <div className="menu-search order-search">
                <i className="ri-search-line" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search dishes or ingredients..."
                  aria-label="Search order menu"
                />
                {query ? (
                  <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                    <i className="ri-close-line" aria-hidden="true" />
                  </button>
                ) : null}
              </div>

              <div className="order-categories" role="group" aria-label="Filter menu by category">
                <button
                  type="button"
                  className={activeCategory === "all" ? "order-category active" : "order-category"}
                  aria-pressed={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                >
                  All dishes
                </button>
                {menuTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    className={activeCategory === tab.key ? "order-category active" : "order-category"}
                    aria-pressed={activeCategory === tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <p className="order-result-count" role="status">
                {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"}
                {normalizedQuery ? ` matching "${query.trim()}"` : ""}
              </p>

              <div className="order-menu-grid">
                {filteredItems.map((item) => (
                  <article className="order-card" key={item.cartId}>
                    <img src={item.image} alt={item.menuItemName} loading="lazy" />
                    <div className="order-card-content">
                      <span className="order-card-category">{item.categoryLabel}</span>
                      <h3>{item.menuItemName}</h3>
                      <p>{item.menuItemDesc}</p>
                      <div className="order-card-footer">
                        <strong>{item.menuItemPrice}</strong>
                        {quantities[item.cartId] ? (
                          <div className="quantity-control" aria-label={`${item.menuItemName} quantity`}>
                            <button type="button" onClick={() => changeQuantity(item.cartId, -1)} aria-label={`Remove one ${item.menuItemName}`}>
                              <i className="ri-subtract-line" aria-hidden="true" />
                            </button>
                            <span aria-live="polite">{quantities[item.cartId]}</span>
                            <button type="button" onClick={() => changeQuantity(item.cartId, 1)} aria-label={`Add one ${item.menuItemName}`}>
                              <i className="ri-add-line" aria-hidden="true" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="order-add"
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
                  <div className="order-empty">
                    <i className="ri-search-eye-line" aria-hidden="true" />
                    <h3>No dishes found</h3>
                    <p>Try a different search or choose another category.</p>
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="order-summary" aria-label="Your order">
              <div className="order-summary-heading">
                <div>
                  <span className="order-card-category">Your selection</span>
                  <h2>Your order</h2>
                </div>
                <span className="order-count">{itemCount}</span>
              </div>

              {selectedItems.length ? (
                <ul className="order-summary-items">
                  {selectedItems.map((item) => (
                    <li key={item.cartId}>
                      <span>
                        <strong>{item.menuItemName}</strong>
                        <small>{item.menuItemPrice} each</small>
                      </span>
                      <div className="quantity-control compact" aria-label={`${item.menuItemName} quantity`}>
                        <button type="button" onClick={() => changeQuantity(item.cartId, -1)} aria-label={`Remove one ${item.menuItemName}`}>
                          <i className="ri-subtract-line" aria-hidden="true" />
                        </button>
                        <span>{quantities[item.cartId]}</span>
                        <button type="button" onClick={() => changeQuantity(item.cartId, 1)} aria-label={`Add one ${item.menuItemName}`}>
                          <i className="ri-add-line" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="order-summary-empty">
                  <span className="order-empty-icon"><i className="ri-shopping-bag-3-line" aria-hidden="true" /></span>
                  <p>Your order is waiting for something delicious.</p>
                  <small>Add a dish to get started.</small>
                </div>
              )}

              <div className="order-subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <p className="order-disclaimer">Taxes, delivery, and availability are confirmed when you call.</p>
              {itemCount > 0 ? (
                <a className="btn-brand order-call" href={`tel:${phoneLink}`}>
                  Call to confirm <i className="ri-phone-line" aria-hidden="true" />
                </a>
              ) : (
                <button className="btn-brand order-call" type="button" disabled>
                  Add items to continue
                </button>
              )}
              <a className="order-phone" href={`tel:${phoneLink}`}>
                <i className="ri-phone-line" aria-hidden="true" /> {siteConfig.contact.phone}
              </a>
              <p className="order-hours"><i className="ri-time-line" aria-hidden="true" /> {siteConfig.contact.hours.join(" · ")}</p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
};
