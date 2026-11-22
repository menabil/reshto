"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { categories } from "@/data/data";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { FoodQuickViewModal } from "@/components/ui/FoodQuickViewModal";

export const PopularCategories = () => {
  const { isFavorite, toggleFavorite } = useStore();
  const { t, formatPrice } = useLanguage();
  const [quickViewDish, setQuickViewDish] = useState(null);

  return (
    <section
      id="specials"
      className="section signature-section bg-[#f2ece1] transition-colors duration-300 dark:bg-[#171614]"
    >
      {quickViewDish && (
        <FoodQuickViewModal
          dish={quickViewDish}
          onClose={() => setQuickViewDish(null)}
        />
      )}

      <Container>
        <Reveal className="signature-heading">
          <div>
            <span className="story-kicker">
              <span aria-hidden="true" />
              From our kitchen
            </span>
            <h2>Signatures worth<br className="hidden sm:block" /> slowing down for.</h2>
          </div>
          <Link href="/menu" className="story-text-link">
            See the full menu <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="signature-grid">
          {categories.slice(0, 4).map((item, index) => {
            const isFav = isFavorite(item.id);
            const enrichedItem = {
              ...item,
              menuItemName: item.recipesName,
              menuItemDesc: item.recipesSubTitle,
              menuItemPrice: item.recipesPrice,
              category: "Signature",
            };

            return (
              <Reveal key={item.id} delay={index * 65}>
                <article
                  onClick={() => setQuickViewDish(enrichedItem)}
                  className="signature-card group cursor-pointer relative"
                >
                  {/* Wishlist Heart Button (Task 5.2) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-3 right-3 z-20 grid h-8 w-8 place-items-center rounded-full backdrop-blur-md transition shadow-md ${
                      isFav
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-black/35 text-white hover:bg-black/60 hover:text-rose-400"
                    }`}
                  >
                    <i className={isFav ? "ri-heart-fill text-xs" : "ri-heart-line text-xs"} />
                  </button>

                  <div className="signature-image">
                    <SafeImage
                      src={item.image}
                      alt={item.recipesName}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="signature-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="signature-card-copy">
                    <div>
                      <h3>{item.recipesName}</h3>
                      <p>{item.recipesSubTitle}</p>
                    </div>
                    <span className="signature-price">{formatPrice(item.recipesPrice)}</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default PopularCategories;
