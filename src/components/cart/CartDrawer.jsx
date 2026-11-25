"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { SafeImage } from "@/components/ui/SafeImage";

export const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartCount,
    cartSubtotal,
    couponDiscount,
    deliveryFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    orders,
  } = useStore();
  const { isAuthenticated } = useAuth();
  const { formatPrice } = useLanguage();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState(null);
  const activeOrder = orders?.find((order) => order.isCustomerOrder);
  const canTrackActiveOrder = isAuthenticated && Boolean(activeOrder);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
    if (res.success) {
      setCouponInput("");
    }
    setTimeout(() => setCouponMessage(null), 4000);
  };

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="relative w-screen max-w-md bg-[#faf8f5] shadow-2xl transition-all duration-300 dark:bg-[#1a1816] flex flex-col border-l border-ink/10 dark:border-white/10">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-300">
                <i className="ri-shopping-bag-3-line text-lg" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-ink dark:text-white">
                  Your Cart
                </h2>
                <p className="text-[11px] text-ink-700 dark:text-white/50">
                  {cartCount} items selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartCount > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-8 w-8 place-items-center rounded-full bg-ink/5 text-ink hover:bg-ink/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {/* Active Order Tracker */}
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-2xl border border-brand/20 bg-brand/5 p-4 shadow-xs dark:border-brand-400/20 dark:bg-brand/10 sm:flex sm:justify-between">
              <div className="col-span-2 grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 sm:col-span-1 sm:flex sm:items-center">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-base text-white shadow-xs">
                  <i className="ri-e-bike-2-fill" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-brand dark:text-brand-300">
                    {activeOrder ? "Active Order" : "No order to track yet"}
                  </span>
                  {activeOrder ? (
                    <>
                      <strong className="mt-0.5 block break-words text-sm font-bold text-ink dark:text-white">
                        #{activeOrder.id}
                      </strong>
                      <p className="mt-1 flex flex-wrap gap-x-1 text-xs text-ink-700 dark:text-white/70">
                        <span>Status:</span>
                        <span className="font-semibold text-ink dark:text-white">
                          {activeOrder.status}
                        </span>
                      </p>
                    </>
                  ) : null}
                </div>
              </div>

              {canTrackActiveOrder ? (
                <Link
                  href={`/order-tracking?orderId=${activeOrder.id}`}
                  onClick={closeCart}
                  className="col-span-2 flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-brand-600 sm:col-span-1 sm:min-h-9 sm:whitespace-nowrap"
                >
                  Track Live <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="col-span-2 min-h-10 cursor-not-allowed rounded-xl bg-ink/10 px-4 py-2 text-xs font-bold text-ink/40 dark:bg-white/10 dark:text-white/40 sm:col-span-1 sm:min-h-9 sm:whitespace-nowrap"
                  aria-label={
                    isAuthenticated
                      ? "Track order unavailable until you place an order"
                      : "Sign in to track your order"
                  }
                >
                  Track Live
                </button>
              )}
            </div>

            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-3 shadow-xs transition hover:border-brand/40 dark:border-white/10 dark:bg-[#22201d]"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink/5 dark:bg-white/5">
                    <SafeImage
                      src={item.image}
                      alt={item.menuItemName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-sm font-bold text-ink dark:text-white">
                      {item.menuItemName}
                    </h3>
                    <p className="text-xs font-semibold text-brand dark:text-brand-300">
                      {formatPrice(item.menuItemPrice)}
                    </p>

                    {/* Quantity controls */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-lg border border-ink/10 bg-[#f7f3eb] p-0.5 dark:border-white/10 dark:bg-[#171512]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="grid h-5 w-5 place-items-center rounded text-xs text-ink hover:bg-white dark:text-white dark:hover:bg-white/10"
                          aria-label="Decrease quantity"
                        >
                          <i className="ri-subtract-line" />
                        </button>
                        <span className="min-w-5 text-center text-xs font-bold text-ink dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="grid h-5 w-5 place-items-center rounded text-xs text-ink hover:bg-white dark:text-white dark:hover:bg-white/10"
                          aria-label="Increase quantity"
                        >
                          <i className="ri-add-line" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-ink dark:text-white">
                        {formatPrice(item.itemTotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartId)}
                    className="grid h-7 w-7 place-items-center rounded-lg text-ink-700/50 hover:bg-rose-50 hover:text-rose-600 dark:text-white/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition"
                    title="Remove item"
                  >
                    <i className="ri-delete-bin-line text-sm" />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-3xl bg-brand/10 text-3xl text-brand dark:bg-white/5 dark:text-brand-300">
                  <i className="ri-shopping-cart-2-line" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink dark:text-white">
                  Your cart is empty
                </h3>
                <p className="mt-1 max-w-60 text-xs text-ink-700 dark:text-white/60">
                  Looks like you haven&apos;t added any delicious dishes to your
                  tray yet.
                </p>
                <Link
                  href="/order"
                  onClick={closeCart}
                  className="btn-brand mt-5 py-2.5 px-5 text-xs!"
                >
                  Browse Menu &amp; Order <i className="ri-arrow-right-line" />
                </Link>
              </div>
            )}

            {/* Quick Coupons Section */}
            {cartCount > 0 && (
              <div className="pt-2">
                <div className="rounded-2xl border border-ink/10 bg-white p-3.5 dark:border-white/10 dark:bg-[#22201d]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink dark:text-white flex items-center gap-1.5">
                      <i className="ri-ticket-2-line text-brand" /> Promo Coupon
                    </span>
                    <span className="text-[10px] text-ink-700/70 dark:text-white/50">
                      Try: <strong>SAVE20</strong> or <strong>FREESHIP</strong>
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="mt-2.5 flex items-center justify-between rounded-xl bg-emerald-500/10 px-3 py-2 border border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      <div className="flex items-center gap-1.5">
                        <i className="ri-checkbox-circle-fill text-sm" />
                        <span>
                          {appliedCoupon.code} applied ({appliedCoupon.desc})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-rose-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleApplyCoupon}
                      className="mt-2 flex gap-2"
                    >
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="SAVE20"
                        className="flex-1 rounded-xl border border-ink/15 bg-transparent px-3 py-1.5 text-xs font-semibold uppercase text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-brand px-3 py-1.5 text-xs font-bold text-white transition hover:bg-brand/90"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponMessage && (
                    <p
                      className={`mt-2 text-[11px] font-semibold ${
                        couponMessage.success
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-500"
                      }`}
                    >
                      {couponMessage.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Actions */}
          {cartCount > 0 && (
            <div className="border-t border-ink/10 bg-white p-5 dark:border-white/10 dark:bg-[#1e1c1a]">
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-ink-700 dark:text-white/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink dark:text-white">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-ink-700 dark:text-white/70">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-ink dark:text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-2 text-sm font-extrabold text-ink dark:text-white border-t border-ink/8 dark:border-white/10">
                  <span>Total Amount</span>
                  <span className="text-base text-brand dark:text-brand-300 font-display">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={
                    isAuthenticated ? "/checkout" : "/login?next=%2Fcheckout"
                  }
                  onClick={closeCart}
                  className="btn-brand flex w-full items-center justify-center gap-2 py-3 text-xs! font-bold shadow-md"
                >
                  <i className="ri-secure-payment-line text-sm" />
                  {isAuthenticated
                    ? "Proceed to Payment"
                    : "Sign In to Continue"}
                </Link>
              </div>

              <div className="mt-2.5 text-center">
                <Link
                  href="/order"
                  onClick={closeCart}
                  className="text-[11px] font-semibold text-ink-700/60 hover:text-brand dark:text-white/50 dark:hover:text-brand-300"
                >
                  Or view full interactive order catalog &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
