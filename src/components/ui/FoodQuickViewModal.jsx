"use client";

import { useEffect, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { getDishMetadata } from "@/lib/dishMetadata";

export const FoodQuickViewModal = ({ dish, onClose }) => {
  const {
    updateQuantity,
    reviews,
    addReview,
    openCart,
  } = useStore();
  const { t, formatPrice } = useLanguage();

  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const metadata = getDishMetadata(dish);

  // Filter reviews matching this dish
  const dishReviews = reviews.filter(
    (r) =>
      r.dishId === dish.id ||
      r.dishName?.toLowerCase() === (dish.menuItemName || dish.name || "").toLowerCase()
  );

  const averageRating =
    dishReviews.length > 0
      ? (
          dishReviews.reduce((sum, r) => sum + r.rating, 0) / dishReviews.length
        ).toFixed(1)
      : "5.0";

  const handleAddToCart = () => {
    const cartId = dish.cartId || `${dish.category || "lunch"}-${dish.id}`;
    updateQuantity(cartId, quantity);
    onClose();
    openCart();
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReview({
      dishId: dish.id,
      dishName: dish.menuItemName || dish.name || dish.recipesName,
      customerName: reviewAuthor.trim() || "Foodie Guest",
      rating: reviewRating,
      comment: reviewComment.trim(),
    });

    setReviewSubmitted(true);
    setReviewComment("");
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-xs animate-in fade-in sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-4xl border border-ink/10 bg-white text-ink shadow-2xl dark:border-white/10 dark:bg-[#1a1816] sm:max-h-[calc(100dvh-3rem)]">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close food quick view"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition"
        >
          <i className="ri-close-line text-xl" />
        </button>

        {/* Dish Hero Image Banner */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-ink/10 dark:bg-white/5 sm:h-56 md:h-64">
          <SafeImage
            src={dish.image}
            alt={dish.menuItemName || dish.name || "Delicious dish"}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                {dish.categoryLabel || dish.category || "Specialty"}
              </span>
              <h2 className="mt-2 font-display text-2xl font-black md:text-3xl">
                {dish.menuItemName || dish.name || dish.recipesName}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-display text-2xl font-black text-amber-300">
                {formatPrice(dish.menuItemPrice || dish.recipesPrice || "$15.00")}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
          
          {/* Quick Metrics (Calories, Prep Time, Spiciness, Rating) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                {t("modal.heatLevel", "Heat Level")}
              </span>
              <span className="mt-0.5 text-xs font-bold text-ink dark:text-white block">
                {metadata.spiciness.icon} {metadata.spiciness.label}
              </span>
            </div>

            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                {t("modal.calories", "Calories")}
              </span>
              <span className="mt-0.5 text-xs font-bold text-ink dark:text-white block">
                🔥 {metadata.calories}
              </span>
            </div>

            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                {t("modal.prepTime", "Prep Time")}
              </span>
              <span className="mt-0.5 text-xs font-bold text-ink dark:text-white block">
                ⏱️ {metadata.prepTime}
              </span>
            </div>

            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                {t("modal.rating", "Rating")}
              </span>
              <span className="mt-0.5 text-xs font-bold text-amber-500 block">
                ★ {averageRating} ({dishReviews.length + 12})
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-display text-sm font-bold text-ink dark:text-white">
              {t("modal.chefDesc", "Chef's Culinary Description")}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-700 dark:text-white/70">
              {dish.menuItemDesc || dish.desc || dish.recipesSubTitle || "Prepared fresh to order by our culinary masters using locally-sourced organic ingredients."}
            </p>
          </div>

          {/* Ingredients Breakdown */}
          <div>
            <h3 className="font-display text-sm font-bold text-ink dark:text-white flex items-center gap-1.5">
              <i className="ri-leaf-line text-emerald-600 dark:text-emerald-400" />
              {t("modal.ingredients", "Fresh Ingredients & Recipe Blend")}
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {metadata.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="rounded-xl border border-ink/10 bg-[#faf8f5] px-3 py-1.5 text-xs font-medium text-ink-700 dark:border-white/10 dark:bg-[#22201d] dark:text-white/80"
                >
                  &bull; {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Allergen & Dietary Information */}
          <div>
            <h3 className="font-display text-sm font-bold text-ink dark:text-white flex items-center gap-1.5">
              <i className="ri-shield-check-line text-brand dark:text-brand-300" />
              {t("modal.allergens", "Dietary & Allergen Transparency")}
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {metadata.allergens.map((alg, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold ${
                    alg.highlight
                      ? "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30"
                      : "bg-[#faf8f5] text-ink-700 dark:bg-[#22201d] dark:text-white/70 border border-ink/10 dark:border-white/10"
                  }`}
                >
                  <i className={alg.icon} /> {alg.label}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews & Ratings Section */}
          <div className="border-t border-ink/10 pt-5 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-ink dark:text-white">
                  {t("modal.reviews", "Guest Reviews & Ratings")}
                </h3>
                <p className="text-[11px] text-ink-700/60 dark:text-white/50">
                  {dishReviews.length} verified reviews from diners
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm((v) => !v)}
                className="rounded-xl border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand/20 dark:text-brand-300 transition"
              >
                <i className="ri-edit-line mr-1" />
                {showReviewForm ? "Cancel" : t("modal.writeReview", "Write a Review")}
              </button>
            </div>

            {/* Review submission feedback */}
            {reviewSubmitted && (
              <div className="mt-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <i className="ri-checkbox-circle-fill text-base" />
                Thank you! Your verified rating and review have been recorded.
              </div>
            )}

            {/* Write Review Form */}
            {showReviewForm && !reviewSubmitted && (
              <form onSubmit={handleSubmitReview} className="mt-3.5 space-y-3 rounded-2xl border border-ink/10 bg-[#faf8f5] p-4 dark:border-white/10 dark:bg-[#22201d]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink dark:text-white">Your Rating:</span>
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="text-lg hover:scale-110 transition"
                      >
                        <i className={star <= reviewRating ? "ri-star-fill text-amber-500" : "ri-star-line text-ink-700/30 dark:text-white/30"} />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="Your Name (e.g. Ayesha Rahman)"
                  className="w-full rounded-xl border border-ink/15 bg-white dark:bg-[#1a1816] px-3 py-1.5 text-xs outline-none focus:border-brand"
                />

                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How was the flavor, texture, and presentation? Share your thoughts..."
                  rows={2}
                  className="w-full rounded-xl border border-ink/15 bg-white dark:bg-[#1a1816] px-3 py-2 text-xs outline-none focus:border-brand"
                  required
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-brand py-1.5! px-4! text-xs!"
                  >
                    {t("modal.postReview", "Post Review")}
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="mt-3 space-y-2.5">
              {dishReviews.length > 0 ? (
                dishReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-2xl border border-ink/5 bg-[#faf8f5] p-3 text-xs dark:border-white/5 dark:bg-[#22201d]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink dark:text-white">
                        {rev.customerName}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <i key={i} className="ri-star-fill text-[11px]" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1 text-ink-700/80 dark:text-white/70 italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                    <span className="mt-1 block text-[10px] text-ink-700/50 dark:text-white/40">
                      {rev.date || "Recently"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-ink-700/60 dark:text-white/50 italic py-1">
                  Be the first to review this mouthwatering dish!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex shrink-0 items-center justify-between border-t border-ink/10 bg-[#faf8f5] px-4 py-3 dark:border-white/10 dark:bg-[#22201d] sm:px-6 sm:py-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-ink dark:text-white">{t("modal.qty", "Qty:")}</span>
            <div className="flex items-center gap-1 rounded-xl border border-ink/15 bg-white p-1 dark:border-white/15 dark:bg-[#1a1816]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-6 w-6 place-items-center rounded-lg text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/10"
              >
                <i className="ri-subtract-line text-xs" />
              </button>
              <span className="min-w-6 text-center text-xs font-bold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="grid h-6 w-6 place-items-center rounded-lg text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/10"
              >
                <i className="ri-add-line text-xs" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-brand flex items-center gap-2 py-2.5 px-5 text-xs! font-bold shadow-md"
            >
              <i className="ri-shopping-bag-3-line text-sm" /> {t("modal.addToOrder", "Add to Order")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodQuickViewModal;
