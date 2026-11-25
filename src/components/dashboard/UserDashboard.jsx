"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ReceiptModal } from "@/components/checkout/ReceiptModal";

const USER_MOCK = {
  name: "Tahmid Hassan",
  email: "tahmid.hassan@example.com",
  phone: "+880 1711-234567",
  joined: "March 2025",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
};

export const UserDashboard = () => {
  const { user: authUser, isAuthenticated, mounted } = useAuth();
  const { t, formatPrice } = useLanguage();
  const {
    orders,
    reservations,
    updateReservationStatus,
    reviews,
    addReview,
  } = useStore();
  const [activeTab, setActiveTab] = useState("orders"); // orders, bookings, reviews, profile
  const [user, setUser] = useState(() => (authUser ? { ...USER_MOCK, ...authUser } : USER_MOCK));
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState(null);

  // Review modal state (Task 5.4)
  const [reviewModalData, setReviewModalData] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const userOrders = authUser
    ? orders.filter(
        (o) =>
          !o.email ||
          o.email.toLowerCase() === authUser.email.toLowerCase() ||
          o.customer === authUser.name
      )
    : orders;

  const userReservations = authUser
    ? reservations.filter(
        (r) =>
          !r.email ||
          r.email.toLowerCase() === authUser.email.toLowerCase() ||
          r.guestName === authUser.name
      )
    : reservations;

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (mounted && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7f3eb] pb-20 pt-32 transition-colors duration-300 dark:bg-[#0f0e0d] dark:text-[#f5f5f4] flex items-center justify-center">
        <Container className="max-w-md text-center">
          <div className="rounded-4xl border border-ink/10 bg-[#fffdf8] p-8 shadow-2xl dark:border-white/10 dark:bg-[#1e1c1a]">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand/10 text-3xl text-brand">
              <i className="ri-user-smile-line" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink dark:text-white">
              Customer Sign In
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
              Please sign in or register to view your order history and manage table reservations.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link href="/login" className="btn-brand py-3! text-xs!">
                Sign In / Register <i className="ri-arrow-right-line" />
              </Link>
              <Link
                href="/"
                className="mt-2 text-xs font-semibold text-ink-700/60 hover:text-brand dark:text-white/50"
              >
                &larr; Return to Homepage
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3eb] pb-20 pt-28 transition-colors duration-300 dark:bg-[#0f0e0d] dark:text-[#f5f5f4]">
      {selectedOrderReceipt && (
        <ReceiptModal
          order={selectedOrderReceipt}
          onClose={() => setSelectedOrderReceipt(null)}
        />
      )}

      {/* Client-Side Review & Rating Modal (Task 5.4) */}
      {reviewModalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1a1816] dark:text-white border border-ink/10 dark:border-white/10">
            <button
              type="button"
              onClick={() => setReviewModalData(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full hover:bg-ink/10 dark:hover:bg-white/10"
            >
              <i className="ri-close-line text-lg" />
            </button>

            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/10 text-2xl text-amber-500">
              <i className="ri-star-smile-fill" />
            </span>

            <h3 className="mt-3 font-display text-xl font-bold text-ink dark:text-white">
              Rate &amp; Review Dish
            </h3>
            <p className="mt-1 text-xs text-ink-700 dark:text-white/60">
              Share your feedback on <strong>{reviewModalData.dishName}</strong>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!reviewComment.trim()) return;
                addReview({
                  dishId: reviewModalData.dishId || 1,
                  dishName: reviewModalData.dishName,
                  customerName: user.name || "Foodie Patron",
                  rating: reviewRating,
                  comment: reviewComment.trim(),
                });
                setReviewSuccess(true);
                setTimeout(() => {
                  setReviewSuccess(false);
                  setReviewModalData(null);
                  setReviewComment("");
                }, 1800);
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                  Overall Rating:
                </label>
                <div className="flex items-center gap-2 text-2xl text-amber-500 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={star <= reviewRating ? "ri-star-fill" : "ri-star-line"}
                    />
                  ))}
                  <span className="text-xs font-bold text-ink-700 dark:text-white/70 ml-2">
                    {reviewRating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                  Your Review / Food Experience:
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How was the flavor, texture, warmth, and culinary presentation?..."
                  className="w-full rounded-2xl border border-ink/15 bg-[#faf8f5] p-3 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:bg-[#22201d] dark:text-white resize-none"
                />
              </div>

              {reviewSuccess ? (
                <div className="rounded-xl bg-emerald-500/10 p-3 text-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  🎉 Thank you! Your review was successfully published.
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalData(null)}
                    className="rounded-xl border border-ink/15 px-4 py-2 text-xs font-bold text-ink hover:bg-ink/5 dark:border-white/15 dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-brand py-2! px-5! text-xs!"
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <Container>
        {/* User Profile Header Card */}
        <div className="relative mb-8 overflow-hidden rounded-4xl border border-ink/10 bg-linear-to-br from-[#171512] via-[#24211d] to-[#171512] p-6 text-white shadow-xl dark:border-white/10 md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <SafeImage
                  src={user.avatar}
                  alt={user.name}
                  className="h-20 w-20 rounded-2xl border-2 border-brand-300 object-cover shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-xs text-white">
                  <i className="ri-check-line" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-extrabold md:text-3xl">
                    {user.name}
                  </h1>
                </div>
                <p className="mt-1 text-sm text-white/70">
                  {user.email} &middot; {user.phone}
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  Valued Reshto patron since {user.joined}
                </p>
              </div>
            </div>

            <Link href="/order" className="btn-brand py-2.5! px-4! text-xs!">
              Order Food <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-ink/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "orders"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-shopping-bag-3-line" /> My Orders ({userOrders.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "bookings"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-calendar-check-line" /> My Reservations ({userReservations.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "reviews"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-star-smile-line" /> My Reviews &amp; Ratings ({reviews.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "profile"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-user-settings-line" /> Account Settings
          </button>
        </div>

        {/* TAB 1: MY ORDERS */}
        {activeTab === "orders" ? (
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-ink/20 p-12 text-center dark:border-white/20">
                <i className="ri-shopping-bag-3-line text-4xl text-ink-700/40 dark:text-white/40" />
                <h4 className="mt-3 font-display text-lg font-bold text-ink dark:text-white">No orders yet</h4>
                <p className="mt-1 text-xs text-ink-700/60 dark:text-white/60">Explore our delicious menu and place your first order.</p>
                <Link href="/order" className="btn-brand mt-4 inline-flex py-2! text-xs!">
                  Order Now <i className="ri-arrow-right-line" />
                </Link>
              </div>
            ) : (
              userOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm transition-all hover:border-brand/40 dark:border-white/10 dark:bg-[#1e1c1a]"
                >
                  <div className="flex flex-col justify-between gap-3 border-b border-ink/5 pb-4 dark:border-white/5 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-extrabold text-brand dark:text-brand-300">
                          {order.id}
                        </span>
                        <span className="text-xs text-ink-700/60 dark:text-white/50">
                          &middot; {order.date}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-700/60 dark:text-white/60">
                        <i className="ri-map-pin-line mr-1" />
                        {order.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                        <i className="ri-checkbox-circle-fill mr-1" />
                        {order.status}
                      </span>
                      <span className="font-display text-lg font-extrabold text-ink dark:text-white">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="mt-4">
                    <p className="text-xs text-ink-700/70 dark:text-white/70">
                      <strong>Items:</strong> {order.itemsSummary || (order.items && order.items.map((i) => `${i.name} (x${i.qty})`).join(", "))}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-end gap-3 pt-2">
                    <Link
                      href={`/order-tracking?orderId=${order.id}`}
                      className="btn-brand text-xs py-2! px-3.5! flex items-center gap-1.5 shadow-xs"
                    >
                      <i className="ri-e-bike-2-fill" /> Track Live
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setReviewModalData({
                          dishId: order.items?.[0]?.id || 1,
                          dishName:
                            order.items?.[0]?.name ||
                            order.itemsSummary?.split(",")[0] ||
                            "Featured Dish",
                        })
                      }
                      className="btn-outline text-xs py-2! px-3.5! flex items-center gap-1.5 dark:bg-[#1e1c1a] dark:text-amber-400 dark:border-white/10 text-amber-700"
                    >
                      <i className="ri-star-smile-line" /> Rate &amp; Review Dish
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedOrderReceipt(order)}
                      className="btn-outline text-xs py-2! px-3.5! flex items-center gap-1.5 dark:bg-[#1e1c1a] dark:text-white dark:border-white/10"
                    >
                      <i className="ri-printer-line" /> View &amp; Print Receipt
                    </button>
                    <Link
                      href="/order"
                      className="btn-outline text-xs py-2! px-4! dark:bg-[#1e1c1a] dark:text-white dark:border-white/10"
                    >
                      <i className="ri-repeat-line mr-1" /> Reorder Dishes
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : null}

        {/* TAB 2: MY RESERVATIONS */}
        {activeTab === "bookings" ? (
          <div className="space-y-4">
            {userReservations.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-ink/20 p-12 text-center dark:border-white/20">
                <i className="ri-calendar-check-line text-4xl text-ink-700/40 dark:text-white/40" />
                <h4 className="mt-3 font-display text-lg font-bold text-ink dark:text-white">No table bookings yet</h4>
                <p className="mt-1 text-xs text-ink-700/60 dark:text-white/60">Reserve a table in advance for an unforgettable dining experience.</p>
                <Link href="/reservation" className="btn-brand mt-4 inline-flex py-2! text-xs!">
                  Book a Table <i className="ri-arrow-right-line" />
                </Link>
              </div>
            ) : (
              userReservations.map((res) => (
                <div
                  key={res.id}
                  className="flex flex-col justify-between gap-4 rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a] hover:border-brand/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-brand dark:text-brand-300">
                        {res.id}
                      </span>

                      {/* Status Tag Polish (Task 4.3) */}
                      {res.status === "Confirmed" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300">
                          <i className="ri-checkbox-circle-fill text-sm" /> Confirmed &bull; Reserved
                        </span>
                      ) : res.status === "Cancelled" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400">
                          <i className="ri-close-circle-fill text-sm" /> Cancelled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300">
                          <i className="ri-time-fill text-sm animate-pulse" /> Pending Host Review
                        </span>
                      )}

                      {/* Seating Layout Tag (Task 4.1) */}
                      <span className="rounded-lg bg-ink/5 px-2.5 py-1 text-[11px] font-semibold text-ink-700 dark:bg-white/10 dark:text-white/80">
                        <i className="ri-map-pin-2-line mr-1 text-brand" /> {res.seatingZone || "Main Hall"}
                      </span>

                      {/* Occasion Tag (Task 4.2) */}
                      <span className="rounded-lg bg-brand/5 px-2.5 py-1 text-[11px] font-semibold text-brand dark:bg-brand/20 dark:text-brand-300">
                        <i className="ri-sparkling-fill mr-1" /> {res.occasion || "Dining"}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                        Table for {res.guests} &middot; {res.guestName}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-700/70 dark:text-white/60">
                        <span>
                          <i className="ri-calendar-line mr-1 text-brand" /> {res.date} at {res.time}
                        </span>
                        <span>&bull;</span>
                        <span className="font-bold text-brand dark:text-brand-300">
                          <i className="ri-restaurant-line mr-1" /> {res.table}
                        </span>
                        {res.phone && (
                          <>
                            <span>&bull;</span>
                            <span><i className="ri-phone-line mr-1" /> {res.phone}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Add-ons & Decoration Notes Display */}
                    {(res.addOns?.length > 0 || res.decorationNotes) && (
                      <div className="rounded-2xl bg-[#faf8f5] p-3 text-xs dark:bg-[#22201d] space-y-1">
                        {res.addOns?.length > 0 && (
                          <p className="text-ink-700 dark:text-white/70">
                            <strong>Add-ons:</strong> {res.addOns.join(" &bull; ")}
                          </p>
                        )}
                        {res.decorationNotes && (
                          <p className="italic text-amber-700 dark:text-amber-300">
                            <strong>Note:</strong> &ldquo;{res.decorationNotes}&rdquo;
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 sm:self-center">
                    {res.status !== "Cancelled" && (
                      <button
                        type="button"
                        onClick={() => updateReservationStatus(res.id, "Cancelled")}
                        className="rounded-xl border border-rose-500/20 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                    <Link href="/reservation" className="btn-brand text-xs py-2! px-3.5!">
                      <i className="ri-add-line mr-1" /> New Booking
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : null}

        {/* TAB 3: MY REVIEWS & RATINGS (Task 5.4) */}
        {activeTab === "reviews" ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 pb-4 dark:border-white/10">
              <div>
                <h3 className="font-display text-xl font-bold text-ink dark:text-white">
                  Customer Dish Reviews &amp; Ratings
                </h3>
                <p className="text-xs text-ink-700/60 dark:text-white/60">
                  Read community reviews and share your culinary feedback on dishes you tried.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setReviewModalData({
                    dishId: 1,
                    dishName: "Classic Margherita Pizza",
                  })
                }
                className="btn-brand text-xs py-2! px-4! flex items-center gap-1.5"
              >
                <i className="ri-edit-line" /> Write a Review
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-[#fffdf8] p-5 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a] hover:border-brand/30 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[11px] font-bold text-brand dark:bg-brand/20 dark:text-brand-300">
                        {rev.dishName}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <i key={i} className="ri-star-fill text-xs" />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-ink dark:text-white/80 italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3 text-[11px] text-ink-700/60 dark:border-white/5 dark:text-white/50">
                    <span className="font-bold text-ink dark:text-white">
                      By: {rev.customerName}
                    </span>
                    <span>{rev.date || "Verified Diner"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* TAB 4: ACCOUNT SETTINGS */}
        {activeTab === "profile" ? (
          <div className="max-w-2xl rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <h3 className="font-display text-xl font-bold text-ink dark:text-white">
              Profile &amp; Delivery Preferences
            </h3>
            <p className="mt-1 text-xs text-ink-700/60 dark:text-white/60">
              Manage your personal info and default dining preferences.
            </p>

            {savedSuccess ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <i className="ri-checkbox-circle-fill text-base" /> Profile saved successfully!
              </div>
            ) : null}

            <form onSubmit={handleProfileSave} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                  Primary Delivery Address
                </label>
                <input
                  type="text"
                  defaultValue="House 24, Road 7, Block D, Banani, Dhaka"
                  className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-brand py-2.5! px-6! text-sm!">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default UserDashboard;
