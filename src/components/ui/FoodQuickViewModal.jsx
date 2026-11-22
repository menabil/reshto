"use client";

import { useEffect, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { useStore } from "@/context/StoreContext";
import { getDishMetadata } from "@/lib/dishMetadata";

export const FoodQuickViewModal = ({ dish, onClose }) => {
  const {
    quantities,
    updateQuantity,
    isFavorite,
    toggleFavorite,
    reviews,
    addReview,
    openCart,
  } = useStore();

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
  const dishId = dish.id || dish.cartId;
  const isFav = isFavorite(dish.id) || isFavorite(dish.cartId);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl rounded-4xl bg-white shadow-2xl dark:bg-[#1a1816] text-ink dark:text-white border border-ink/10 dark:border-white/10 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close food quick view"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition"
        >
          <i className="ri-close-line text-xl" />
        </button>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={() => toggleFavorite(dishId)}
          aria-label={isFav ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute left-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition shadow-md ${
            isFav
              ? "bg-rose-500 text-white animate-pulse"
              : "bg-white/90 text-ink-700 hover:text-rose-500 dark:bg-black/40 dark:text-white"
          }`}
        >
          <i className={isFav ? "ri-heart-fill" : "ri-heart-line"} />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-ink/5 dark:bg-white/5">
          <SafeImage
            src={dish.image}
            alt={dish.menuItemName || dish.name || "Dish"}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
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
                {dish.menuItemPrice || dish.recipesPrice || "$15.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Quick Metrics (Calories, Prep Time, Spiciness, Rating) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                Heat Level
              </span>
              <span className="mt-0.5 text-xs font-bold text-ink dark:text-white block">
                {metadata.spiciness.icon} {metadata.spiciness.label}
              </span>
            </div>

            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                Calories
              </span>
              <span className="mt-0.5 text-xs font-bold text-ink dark:text-white block">
                🔥 {metadata.calories}
              </span>
            </div>

            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                Prep Time
              </span>
              <span className="mt-0.5 text-xs font-bold text-ink dark:text-white block">
                ⏱️ {metadata.prepTime}
              </span>
            </div>

            <div className="rounded-2xl bg-[#faf8f5] p-3 dark:bg-[#22201d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/50 block">
                Rating
              </span>
              <span className="mt-0.5 text-xs font-bold text-amber-500 block">
                ★ {averageRating} ({dishReviews.length + 12})
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-display text-sm font-bold text-ink dark:text-white">
              Chef&apos;s Description
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-700 dark:text-white/70">
              {dish.menuItemDesc || dish.desc || dish.recipesSubTitle || "Prepared fresh to order by our culinary masters using locally-sourced organic ingredients."}
            </p>
          </div>

          {/* Ingredients Breakdown (Task 5.1) */}
          <div>
            <h3 className="font-display text-sm font-bold text-ink dark:text-white flex items-center gap-1.5">
              <i className="ri-leaf-line text-emerald-600 dark:text-emerald-400" />
              Fresh Ingredients &amp; Recipe Blend
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

          {/* Allergen & Dietary Information (Task 5.1) */}
          <div>
            <h3 className="font-display text-sm font-bold text-ink dark:text-white flex items-center gap-1.5">
              <i className="ri-shield-check-line text-brand dark:text-brand-300" />
              Dietary &amp; Allergen Transparency
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {metadata.allergens.map((alg, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold ${
                    alg.type === "warning"
                      ? "bg-amber-500/10 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/20"
                  }`}
                >
                  <span>{alg.icon}</span>
                  <span>{alg.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Customer Reviews & Star Ratings (Task 5.4) */}
          <div className="border-t border-ink/10 pt-4 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink dark:text-white flex items-center gap-1.5">
                <i className="ri-star-smile-line text-amber-500" />
                Guest Reviews ({dishReviews.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowReviewForm((v) => !v)}
                className="text-xs font-bold text-brand hover:underline dark:text-brand-300"
              >
                {showReviewForm ? "Hide Form" : "+ Write a Review"}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mt-3 rounded-2xl bg-[#faf8f5] p-4 dark:bg-[#22201d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink dark:text-white">Your Star Rating:</span>
                  <div className="flex items-center gap-1 text-amber-500 text-base cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={star <= reviewRating ? "ri-star-fill" : "ri-star-line"}
                      />
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Your Name (e.g. Farhana Ahmed)"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 bg-white dark:bg-[#1a1816] px-3 py-2 text-xs text-ink outline-none dark:border-white/15 dark:text-white"
                />

                <textarea
                  rows={2}
                  required
                  placeholder="Share your culinary experience with this dish..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 bg-white dark:bg-[#1a1816] p-2.5 text-xs text-ink outline-none dark:border-white/15 dark:text-white resize-none"
                />

                <div className="flex justify-between items-center">
                  {reviewSubmitted ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      🎉 Review submitted successfully!
                    </span>
                  ) : <span />}
                  <button
                    type="submit"
                    className="btn-brand py-1.5! px-4! text-xs!"
                  >
                    Post Review
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
        <div className="flex items-center justify-between border-t border-ink/10 bg-[#faf8f5] px-6 py-4 dark:border-white/10 dark:bg-[#22201d]">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-ink dark:text-white">Qty:</span>
            <div className="flex items-center gap-1 rounded-xl border border-ink/15 bg-white p-1 dark:border-white/15 dark:bg-[#1a1816]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-6 w-6 place-items-center rounded-lg text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/10"
              >
                <i className="ri-subtract-line text-xs" />
              </button>
              <span className="min-w-[1.5rem] text-center text-xs font-bold">
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
              <i className="ri-shopping-bag-3-line text-sm" /> Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodQuickViewModal;
