"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ReceiptModal } from "@/components/checkout/ReceiptModal";

export const CheckoutExperience = () => {
  const { user, isAuthenticated, mounted } = useAuth();
  const { t, formatPrice } = useLanguage();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    couponDiscount,
    deliveryFee,
    taxAmount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    placeOrder,
  } = useStore();

  const [orderType, setOrderType] = useState("Delivery"); // "Delivery" or "Pickup"
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: "",
    paymentMethod: "Cash on Delivery",
  });

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCodeInput("");
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const currentDeliveryFee = orderType === "Pickup" ? 0 : deliveryFee;
  const currentTotal = Math.max(
    0,
    cartSubtotal - couponDiscount + currentDeliveryFee + taxAmount
  );

  const fullAddress =
    orderType === "Delivery"
      ? `${formData.address}${formData.city ? `, ${formData.city}` : ""}${
          formData.zip ? ` - ${formData.zip}` : ""
        }`
      : "Pickup at Reshto Restaurant Counter (3667 Nutters Washington Barn, IA)";

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const customerPhone = user?.phone || formData.phone;
    if (!user?.name?.trim() || !customerPhone.trim()) {
      alert("Please provide your account name and a contact phone number.");
      return;
    }
    if (orderType === "Delivery" && !formData.address.trim()) {
      alert("Please provide your complete delivery address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = placeOrder({
        customer: user.name,
        email: user.email,
        phone: customerPhone,
        address: fullAddress,
        orderType,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        subtotalNumber: cartSubtotal,
        discountNumber: couponDiscount,
        deliveryNumber: currentDeliveryFee,
        taxNumber: taxAmount,
        totalNumber: currentTotal,
      });

      setConfirmedOrder(newOrder);
      setShowReceiptModal(true);
      setIsSubmitting(false);
    }, 600);
  };

  // If order was placed, show confirmation state
  if (confirmedOrder) {
    return (
      <>
        {showReceiptModal && (
          <ReceiptModal
            order={confirmedOrder}
            onClose={() => setShowReceiptModal(false)}
          />
        )}

        <div className="min-h-screen bg-[#faf8f5] pb-24 pt-32 transition-colors duration-300 dark:bg-[#0f0e0d] dark:text-[#f5f5f4]">
          <Container className="max-w-3xl">
            <div className="overflow-hidden rounded-4xl border border-ink/10 bg-white p-8 text-center shadow-2xl dark:border-white/10 dark:bg-[#1a1816] md:p-12">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-emerald-500/10 text-4xl text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <i className="ri-checkbox-circle-fill" />
              </span>

              <span className="mt-4 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Order Received &bull; Kitchen Preparing
              </span>

              <h1 className="mt-3 font-display text-3xl font-black text-ink dark:text-white md:text-4xl">
                Thank You for Your Order!
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-white/60">
                Your order <strong className="text-ink dark:text-white">#{confirmedOrder.id}</strong> has been successfully placed. Our master chefs are already crafting your meal to perfection.
              </p>

              {/* Order Quick Summary Card */}
              <div className="mt-8 rounded-3xl bg-[#faf8f5] p-6 text-left dark:bg-[#22201d]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-ink/10 pb-4 dark:border-white/10 text-xs">
                  <div>
                    <span className="text-ink-700 dark:text-white/50 block">Customer</span>
                    <strong className="text-ink dark:text-white text-sm">{confirmedOrder.customer}</strong>
                  </div>
                  <div>
                    <span className="text-ink-700 dark:text-white/50 block">Est. Delivery Time</span>
                    <strong className="text-brand dark:text-brand-300 text-sm">30 - 45 Minutes</strong>
                  </div>
                  <div>
                    <span className="text-ink-700 dark:text-white/50 block">Total Amount</span>
                    <strong className="text-ink dark:text-white text-sm">{confirmedOrder.total}</strong>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-bold text-ink dark:text-white block mb-2">
                    Dishes in this order:
                  </span>
                  <p className="text-xs text-ink-700 dark:text-white/70">
                    {confirmedOrder.itemsSummary}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/order-tracking?orderId=${confirmedOrder.id}`}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-xs font-bold text-white transition shadow-sm"
                >
                  <i className="ri-e-bike-2-fill text-base" /> Track Live Delivery
                </Link>

                <button
                  type="button"
                  onClick={() => setShowReceiptModal(true)}
                  className="btn-brand flex items-center gap-2 px-6 py-3 text-xs! font-bold"
                >
                  <i className="ri-printer-line text-base" /> View &amp; Print Receipt
                </button>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-ink/15 bg-transparent px-5 py-3 text-xs font-bold text-ink hover:bg-ink/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5 transition"
                >
                  My Dashboard &rarr;
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }

  // If cart is empty and no order confirmed yet
  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5] pb-24 pt-36 transition-colors duration-300 dark:bg-[#0f0e0d] dark:text-[#f5f5f4]">
        <Container className="max-w-md text-center">
          <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#1a1816]">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand/10 text-3xl text-brand dark:bg-white/5 dark:text-brand-300">
              <i className="ri-shopping-cart-2-line" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink dark:text-white">
              Your Cart is Empty
            </h1>
            <p className="mt-2 text-xs text-ink-700 dark:text-white/60">
              You need to add at least one dish to your order before proceeding to checkout.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/order" className="btn-brand py-3! text-xs!">
                Explore Food Menu <i className="ri-arrow-right-line" />
              </Link>
              <Link
                href="/"
                className="text-xs font-semibold text-ink-700/60 hover:text-brand dark:text-white/50"
              >
                &larr; Return to Homepage
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div
        className="min-h-screen bg-[#faf8f5] dark:bg-[#0f0e0d]"
        aria-busy="true"
        aria-label="Loading checkout"
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f5] pb-24 pt-36 transition-colors duration-300 dark:bg-[#0f0e0d] dark:text-[#f5f5f4]">
        <Container className="max-w-md text-center">
          <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#1a1816]">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand/10 text-3xl text-brand dark:bg-white/5 dark:text-brand-300">
              <i className="ri-user-line" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink dark:text-white">
              Sign In to Continue
            </h1>
            <p className="mt-2 text-xs text-ink-700 dark:text-white/60">
              Please sign in or create an account before checking out.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/login?next=%2Fcheckout"
                className="btn-brand py-3! text-xs!"
              >
                Sign In <i className="ri-arrow-right-line" />
              </Link>
              <Link
                href="/register?next=%2Fcheckout"
                className="btn-outline py-3! text-xs!"
              >
                Create Account
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      {showReceiptModal && confirmedOrder && (
        <ReceiptModal
          order={confirmedOrder}
          onClose={() => setShowReceiptModal(false)}
        />
      )}

      {/* Subpage Hero */}
      <section className="subpage-hero order-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-secure-payment-line" /> Express &amp; Safe Checkout
          </span>
          <h1>
            Complete Your <span>Order</span>.
          </h1>
          <p>
            Review your dishes, apply coupons, enter delivery details, and confirm your meal in minutes.
          </p>
        </Container>
      </section>

      {/* Checkout Form & Order Summary Section */}
      <section className="py-12 md:py-16 bg-[#faf8f5] dark:bg-[#0f0e0d] transition-colors duration-300">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Delivery & Customer Info Form */}
            <div className="lg:col-span-7">
              <form
                id="checkout-form"
                onSubmit={handleSubmitOrder}
                className="space-y-6"
              >
                
                {/* 1. Fulfillment Type (Delivery vs Pickup) */}
                <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                  <h2 className="font-display text-lg font-bold text-ink dark:text-white flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">1</span>
                    Order Fulfillment Method
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderType("Delivery")}
                      className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-4 text-center transition ${
                        orderType === "Delivery"
                          ? "border-brand bg-brand/5 dark:bg-brand/10 text-brand dark:text-brand-300 font-bold shadow-xs"
                          : "border-ink/10 dark:border-white/10 text-ink dark:text-white hover:border-brand/40"
                      }`}
                    >
                      <i className="ri-e-bike-2-line text-2xl" />
                      <span className="text-xs font-bold">Home Delivery</span>
                      <small className="text-[10px] text-ink-700/70 dark:text-white/50">
                        Delivered fresh to your doorstep
                      </small>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType("Pickup")}
                      className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-4 text-center transition ${
                        orderType === "Pickup"
                          ? "border-brand bg-brand/5 dark:bg-brand/10 text-brand dark:text-brand-300 font-bold shadow-xs"
                          : "border-ink/10 dark:border-white/10 text-ink dark:text-white hover:border-brand/40"
                      }`}
                    >
                      <i className="ri-store-2-line text-2xl" />
                      <span className="text-xs font-bold">Dine-in / Takeaway Pickup</span>
                      <small className="text-[10px] text-ink-700/70 dark:text-white/50">
                        Pick up directly at the counter
                      </small>
                    </button>
                  </div>
                </div>

                {/* 2. Customer Contact Information */}
                <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                  <h2 className="font-display text-lg font-bold text-ink dark:text-white flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">2</span>
                    Customer Information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl bg-[#faf8f5] p-4 text-xs dark:bg-[#22201d] sm:grid-cols-3">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-ink-700/60 dark:text-white/50">
                        Name
                      </span>
                      <strong className="mt-1 block text-ink dark:text-white">
                        {user?.name || "Not provided"}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-ink-700/60 dark:text-white/50">
                        Phone
                      </span>
                      {user?.phone ? (
                        <strong className="mt-1 block text-ink dark:text-white">
                          {user.phone}
                        </strong>
                      ) : (
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Add a contact phone number"
                          aria-label="Contact phone number"
                          className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-2.5 py-2 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                        />
                      )}
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-ink-700/60 dark:text-white/50">
                        Email
                      </span>
                      <strong className="mt-1 block break-all text-ink dark:text-white">
                        {user?.email || "Not provided"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 3. Delivery Address (Visible only for delivery) */}
                {orderType === "Delivery" && (
                  <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                    <h2 className="font-display text-lg font-bold text-ink dark:text-white flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">3</span>
                      Delivery Destination
                    </h2>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                          Street Address / House / Flat <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="House 24, Road 7, Banani"
                          className="w-full rounded-xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                          City / Area
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Dhaka"
                          className="w-full rounded-xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                          Postal / ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="1213"
                          className="w-full rounded-xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Special Cooking Instructions */}
                <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                  <h2 className="font-display text-lg font-bold text-ink dark:text-white flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">
                      {orderType === "Delivery" ? "4" : "3"}
                    </span>
                    Special Cooking &amp; Kitchen Notes
                  </h2>

                  <div className="mt-4">
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any allergen preferences, spice levels, or delivery instructions (e.g. Ring the bell, extra spicy, no peanuts)..."
                      className="w-full rounded-xl border border-ink/15 bg-transparent p-3 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white resize-none"
                    />
                  </div>
                </div>

                {/* 5. Payment Method */}
                <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                  <h2 className="font-display text-lg font-bold text-ink dark:text-white flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">
                      {orderType === "Delivery" ? "5" : "4"}
                    </span>
                    Payment Method
                  </h2>

                  <div className="mt-4 space-y-3">
                    <label className="flex items-center gap-3 rounded-2xl border border-ink/10 p-3.5 cursor-pointer dark:border-white/10 hover:border-brand/40 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={formData.paymentMethod === "Cash on Delivery"}
                        onChange={handleInputChange}
                        className="text-brand focus:ring-brand"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-ink dark:text-white block">
                          {orderType === "Delivery" ? "Cash on Delivery (COD)" : "Pay at Restaurant Counter"}
                        </span>
                        <small className="text-[11px] text-ink-700/70 dark:text-white/50">
                          Pay by cash or card upon receiving your order
                        </small>
                      </div>
                      <i className="ri-hand-coin-line text-xl text-brand" />
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-ink/10 p-3.5 opacity-60 dark:border-white/10">
                      <div className="flex-1">
                        <span className="text-xs font-bold text-ink dark:text-white block">
                          Credit / Debit Card (Unavailable)
                        </span>
                        <small className="text-[11px] text-ink-700/70 dark:text-white/50">
                          Online payment processing is not connected yet.
                        </small>
                      </div>
                      <i className="ri-bank-card-line text-xl text-brand" />
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-ink/10 p-3.5 opacity-60 dark:border-white/10">
                      <div className="flex-1">
                        <span className="text-xs font-bold text-ink dark:text-white block">
                          bKash / Nagad / Rocket (Unavailable)
                        </span>
                        <small className="text-[11px] text-ink-700/70 dark:text-white/50">
                          Mobile wallet processing is not connected yet.
                        </small>
                      </div>
                      <i className="ri-smartphone-line text-xl text-brand" />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Right Column: Order Summary & Coupon Code */}
            <div className="lg:col-span-5">
              <aside className="sticky top-28 space-y-6">
                
                {/* Cart Items List Card */}
                <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                  <div className="flex items-center justify-between border-b border-ink/10 pb-4 dark:border-white/10">
                    <h3 className="font-display text-base font-bold text-ink dark:text-white">
                      Order Summary ({cartCount})
                    </h3>
                    <Link
                      href="/order"
                      className="text-xs font-bold text-brand dark:text-brand-300 hover:underline"
                    >
                      Edit Menu
                    </Link>
                  </div>

                  {/* Items scroll */}
                  <div className="divide-y divide-ink/8 dark:divide-white/8 max-h-72 overflow-y-auto my-3 pr-1">
                    {cartItems.map((item) => (
                      <div key={item.cartId} className="flex items-center gap-3 py-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-ink/5 dark:bg-white/5">
                          <SafeImage
                            src={item.image}
                            alt={item.menuItemName}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="truncate text-xs font-bold text-ink dark:text-white">
                            {item.menuItemName}
                          </h4>
                          <span className="text-[11px] text-ink-700 dark:text-white/60">
                            {formatPrice(item.menuItemPrice)} &times; {item.quantity}
                          </span>
                        </div>

                        {/* Quantity mini buttons */}
                        <div className="flex items-center gap-1 rounded-md border border-ink/10 bg-[#faf8f5] p-0.5 dark:border-white/10 dark:bg-[#22201d]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="grid h-4 w-4 place-items-center rounded-sm bg-transparent text-[10px] font-bold text-ink transition-colors hover:bg-brand hover:text-white dark:bg-transparent dark:text-white dark:hover:bg-brand dark:hover:text-[#171512]"
                          >
                            -
                          </button>
                          <span className="text-[10px] font-bold px-1 text-ink dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="grid h-4 w-4 place-items-center rounded-sm bg-transparent text-[10px] font-bold text-ink transition-colors hover:bg-brand hover:text-white dark:bg-transparent dark:text-white dark:hover:bg-brand dark:hover:text-[#171512]"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-ink dark:text-white">
                          {formatPrice(item.itemTotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input Box */}
                  <div className="border-t border-ink/10 pt-4 dark:border-white/10">
                    <span className="text-xs font-bold text-ink dark:text-white flex items-center justify-between mb-2">
                      <span className="flex items-center gap-1">
                        <i className="ri-coupon-3-line text-brand" /> {t("cart.promoCoupon", "Promo Coupon")}
                      </span>
                      <span className="text-[10px] text-ink-700/60 dark:text-white/50">
                        {t("cart.tryCoupons", "Try: SAVE20 or FREESHIP")}
                      </span>
                    </span>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 px-3 py-2 border border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <div className="flex items-center gap-1.5">
                          <i className="ri-checkbox-circle-fill text-sm" />
                          <span>{appliedCoupon.code} ({appliedCoupon.desc})</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-xs text-rose-500 hover:underline"
                        >
                          {t("cart.remove", "Remove")}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponCodeInput}
                          onChange={(e) => setCouponCodeInput(e.target.value)}
                          placeholder="SAVE20"
                          className="flex-1 rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-xs font-semibold uppercase text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                        />
                        <button
                          type="submit"
                          className="rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white transition hover:bg-brand/90"
                        >
                          {t("cart.apply", "Apply")}
                        </button>
                      </form>
                    )}

                    {couponFeedback && (
                      <p
                        className={`mt-2 text-[11px] font-semibold ${
                          couponFeedback.success ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                        }`}
                      >
                        {couponFeedback.message}
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="mt-4 border-t border-ink/10 pt-4 space-y-2 text-xs dark:border-white/10">
                    <div className="flex justify-between text-ink-700 dark:text-white/70">
                      <span>{t("cart.subtotal", "Food Subtotal")}</span>
                      <span className="font-bold text-ink dark:text-white">
                        {formatPrice(cartSubtotal)}
                      </span>
                    </div>

                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>{t("cart.discount", "Discount")} ({appliedCoupon?.code})</span>
                        <span>-{formatPrice(couponDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-ink-700 dark:text-white/70">
                      <span>{t("cart.deliveryFee", "Delivery Service Fee")}</span>
                      <span className="font-bold text-ink dark:text-white">
                        {currentDeliveryFee === 0 ? (
                          <span className="text-emerald-600 font-bold">{t("cart.free", "FREE")}</span>
                        ) : (
                          formatPrice(currentDeliveryFee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-ink-700 dark:text-white/70">
                      <span>{t("cart.tax", "Estimated Tax (5%)")}</span>
                      <span className="font-bold text-ink dark:text-white">
                        {formatPrice(taxAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-black text-ink dark:border-white/10 dark:text-white">
                      <span>{t("cart.total", "Total Amount")}</span>
                      <span className="font-display text-lg text-brand dark:text-brand-300">
                        {formatPrice(currentTotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="btn-brand mt-5 flex w-full items-center justify-center gap-2 py-4 text-sm! font-bold shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" /> Processing Order...
                      </>
                    ) : (
                      <>
                        <i className="ri-checkbox-circle-line text-base" />
                        {t("checkout.placeOrder", "Confirm & Place Order")} &bull;{" "}
                        {formatPrice(currentTotal)}
                      </>
                    )}
                  </button>
                </div>

                {/* Guarantee Banner */}
                <div className="rounded-2xl border border-ink/10 bg-[#fffdf8] p-4 text-xs dark:border-white/10 dark:bg-[#22201d] flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-lg">
                    <i className="ri-shield-check-line" />
                  </span>
                  <div>
                    <strong className="block text-ink dark:text-white font-bold">
                      100% Fresh &amp; Hygienic Guarantee
                    </strong>
                    <span className="text-ink-700 dark:text-white/60 text-[11px]">
                      Prepared with organic ingredients and sealed safely for delivery.
                    </span>
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CheckoutExperience;
