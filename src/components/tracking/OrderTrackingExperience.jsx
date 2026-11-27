"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ReceiptModal } from "@/components/checkout/ReceiptModal";
import { SafeImage } from "@/components/ui/SafeImage";

const TRACKING_STAGES = [
  {
    step: 0,
    statusKey: "Pending",
    label: "Order Confirmed",
    title: "Order Confirmed",
    desc: "Your order status is confirmed.",
    icon: "ri-checkbox-circle-fill",
    color: "text-emerald-500",
    bg: "bg-emerald-500",
  },
  {
    step: 1,
    statusKey: "Preparing",
    label: "In the Kitchen",
    title: "Being Prepared",
    desc: "Your order is currently being prepared by the kitchen.",
    icon: "ri-fire-fill",
    color: "text-amber-500",
    bg: "bg-amber-500",
  },
  {
    step: 2,
    statusKey: "Out for Delivery",
    label: "On the Way",
    title: "Out for Delivery",
    desc: "Your order has been marked as out for delivery.",
    icon: "ri-e-bike-2-fill",
    color: "text-blue-500",
    bg: "bg-blue-500",
  },
  {
    step: 3,
    statusKey: "Delivered",
    label: "Delivered",
    title: "Order Delivered",
    desc: "Your order has been marked as delivered. Thank you for dining with Biteon!",
    icon: "ri-gift-fill",
    color: "text-emerald-600",
    bg: "bg-emerald-600",
  },
];

export const OrderTrackingExperience = () => {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get("orderId");

  const { orders, hydrated } = useStore();
  const { t, formatPrice } = useLanguage();

  const [searchInput, setSearchInput] = useState(urlOrderId || "");
  const [selectedOrderId, setSelectedOrderId] = useState(urlOrderId || "");
  const [showReceipt, setShowReceipt] = useState(false);
  const customerOrders = useMemo(
    () => orders?.filter((order) => order.isCustomerOrder) || [],
    [orders],
  );

  // Show only customer orders; never substitute a fabricated tracking order.
  const currentOrder = useMemo(() => {
    if (selectedOrderId) {
      return customerOrders.find(
        (o) => o.id.toLowerCase() === selectedOrderId.toLowerCase()
      ) || null;
    }
    return customerOrders[0] || null;
  }, [selectedOrderId, customerOrders]);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSelectedOrderId(searchInput.trim());
  };

  const activeStepIndex = Math.max(
    0,
    TRACKING_STAGES.findIndex(
      (stage) =>
        stage.statusKey.toLowerCase() === currentOrder?.status?.toLowerCase(),
    ),
  );
  const currentStage = TRACKING_STAGES[activeStepIndex];

  if (!hydrated) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-48 h-6 bg-ink/10 rounded animate-pulse mb-4" />
        <div className="w-80 h-4 bg-ink/10 rounded animate-pulse mb-2" />
        <div className="w-80 h-4 bg-ink/10 rounded animate-pulse" />
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <>
        <section className="subpage-hero">
          <Container>
            <span className="hero-eyebrow">
              <i className="ri-file-search-line" /> Order Status
            </span>
            <h1>
              Track Your <span>Order</span>.
            </h1>
            <p>Enter an order ID to view its latest saved status.</p>
          </Container>
        </section>
        <section className="bg-[#faf8f5] py-12 transition-colors duration-300 dark:bg-[#0f0e0d]">
          <Container className="max-w-2xl">
            <div className="rounded-3xl border border-ink/10 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
              <p className="font-semibold text-ink dark:text-white">
                {selectedOrderId
                  ? `No order found for #${selectedOrderId}.`
                  : "No orders are available to track yet."}
              </p>
              <form
                onSubmit={handleSearch}
                className="mx-auto mt-5 flex max-w-md gap-2"
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Enter your order ID"
                  aria-label="Order ID"
                  className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-transparent px-3 py-2.5 text-xs font-mono text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                />
                <button
                  type="submit"
                  className="btn-brand px-4! py-2.5! text-xs!"
                >
                  Track
                </button>
              </form>
              <Link
                href="/menu"
                className="mt-5 inline-flex text-xs font-bold text-brand hover:underline dark:text-brand-300"
              >
                Browse Menu <i className="ri-arrow-right-line ml-1" />
              </Link>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      {showReceipt && (
        <ReceiptModal
          order={currentOrder}
          onClose={() => setShowReceipt(false)}
        />
      )}

      {/* Subpage Hero */}
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-file-list-3-line" /> Order Status
          </span>
          <h1>
            Order <span>Tracking</span>.
          </h1>
          <p>
            View the latest status saved for your order.
          </p>
        </Container>
      </section>

      {/* Main Tracking Section */}
      <section className="py-12 md:py-20 bg-[#faf8f5] dark:bg-[#0f0e0d] transition-colors duration-300">
        <Container className="max-w-4xl space-y-8">
          
          {/* Order Search & Selector Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-700/50 dark:text-white/40" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Order ID (e.g. ORD-982 or ORD-101)..."
                  className="w-full rounded-2xl border border-ink/15 bg-transparent py-2.5 pl-10 pr-4 text-xs font-mono text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="btn-brand px-5 py-2.5 text-xs! font-bold whitespace-nowrap"
              >
                Track
              </button>
            </form>

            {/* Quick dropdown if user has local orders */}
            {customerOrders.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-ink-700/60 dark:text-white/40 whitespace-nowrap">
                  My Orders:
                </span>
                <select
                  value={currentOrder?.id}
                  onChange={(e) => {
                    setSelectedOrderId(e.target.value);
                    setSearchInput(e.target.value);
                  }}
                  className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-xs font-mono font-bold text-ink outline-none dark:border-white/15 dark:bg-[#22201d] dark:text-white"
                >
                  {customerOrders.map((o) => (
                    <option key={o.id} value={o.id}>
                      #{o.id} ({o.status})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Live Tracking Card */}
          <div className="overflow-hidden rounded-4xl border border-ink/10 bg-white shadow-xl dark:border-white/10 dark:bg-[#1a1816]">
            
            {/* Order status summary */}
            <div className="bg-linear-to-r from-[#1c1a18] via-[#24211d] to-[#3a2916] p-6 md:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand/20 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-300 ring-1 ring-brand-300/30">
                    {currentOrder.status}
                  </span>
                  <span className="font-mono text-xs text-white/60">
                    Order ID: <strong>#{currentOrder.id}</strong>
                  </span>
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl font-black">
                  {currentStage.title}
                </h2>
                <p className="mt-1 text-xs text-white/70 max-w-lg">
                  {currentStage.desc}
                </p>
              </div>

            </div>

            {/* Stepper Progress Bar */}
            <div className="p-6 md:p-8 border-b border-ink/10 dark:border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                {TRACKING_STAGES.map((stage, idx) => {
                  const isDone = idx < activeStepIndex;
                  const isCurrent = idx === activeStepIndex;

                  return (
                    <div
                      key={stage.step}
                      aria-current={isCurrent ? "step" : undefined}
                      className="flex flex-col items-center text-center relative"
                    >
                      {/* Step Circle */}
                      <div
                        className={`relative z-10 grid h-12 w-12 place-items-center rounded-2xl text-xl transition-all duration-300 ${
                          isCurrent
                            ? `${stage.bg} text-white shadow-lg ring-4 ring-brand/25 scale-110`
                            : isDone
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "bg-ink/5 text-ink-700/40 dark:bg-white/10 dark:text-white/40"
                        }`}
                      >
                        <i className={stage.icon} />
                      </div>

                      <span
                        className={`mt-3 text-xs font-bold transition ${
                          isCurrent
                            ? "text-brand dark:text-brand-300 scale-105"
                            : isDone
                            ? "text-ink dark:text-white"
                            : "text-ink-700/50 dark:text-white/40"
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress track line */}
              <div className="relative mt-6 h-2 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                <div
                  className="h-full bg-linear-to-r from-emerald-500 via-brand to-amber-500 transition-all duration-700 ease-out"
                  style={{
                    width: `${((activeStepIndex) / (TRACKING_STAGES.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

          </div>

          {/* Ordered Dishes & Invoice Summary Card */}
          <div className="rounded-4xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4 dark:border-white/10">
              <h3 className="font-display text-lg font-bold text-ink dark:text-white flex items-center gap-2">
                <i className="ri-file-list-3-line text-brand" />
                Items in Order #{currentOrder.id}
              </h3>
              <button
                type="button"
                onClick={() => setShowReceipt(true)}
                className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
              >
                <i className="ri-printer-line" /> View Full Printable Receipt
              </button>
            </div>

            {/* Dishes list */}
            <div className="mt-4 divide-y divide-ink/5 dark:divide-white/5">
              {currentOrder.items && currentOrder.items.length > 0 ? (
                currentOrder.items.map((dish, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      {dish.image && (
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-ink/5 dark:bg-white/5">
                          <SafeImage
                            src={dish.image}
                            alt={dish.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-ink dark:text-white">
                          {dish.name}
                        </h4>
                        <span className="text-[11px] text-ink-700/60 dark:text-white/50">
                          Qty: {dish.qty || 1}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-ink dark:text-white">
                      {formatPrice(dish.price)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-ink-700/70 dark:text-white/70 py-3">
                  {currentOrder.itemsSummary}
                </p>
              )}
            </div>

            {/* Financial summary */}
            <div className="mt-4 border-t border-ink/10 pt-4 dark:border-white/10 space-y-1.5 text-xs text-ink-700 dark:text-white/70">
              <div className="flex justify-between">
                <span>{t("cart.subtotal", "Subtotal")}</span>
                <strong className="text-ink dark:text-white">{formatPrice(currentOrder.subtotal)}</strong>
              </div>
              {currentOrder.discount && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>{t("cart.discount", "Coupon Discount")}</span>
                  <strong>-{formatPrice(currentOrder.discount)}</strong>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t("cart.deliveryFee", "Delivery Fee")}</span>
                <strong className="text-ink dark:text-white">{formatPrice(currentOrder.delivery || 5)}</strong>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-2 text-sm font-black text-ink dark:text-white dark:border-white/10">
                <span>{t("cart.total", "Total Paid")}</span>
                <span className="text-brand dark:text-brand-300 font-mono text-base">{formatPrice(currentOrder.total)}</span>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-ink/10 dark:border-white/10">
              <Link
                href="/dashboard"
                className="text-xs font-bold text-ink-700 hover:text-brand dark:text-white/70 dark:hover:text-brand-300 flex items-center gap-1"
              >
                &larr; Back to My Dashboard
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/menu"
                  className="btn-outline text-xs! py-2.5! px-4! dark:bg-[#201d1a] dark:text-white dark:border-white/15"
                >
                  Order More Food
                </Link>
                <button
                  type="button"
                  onClick={() => setShowReceipt(true)}
                  className="btn-brand text-xs! py-2.5! px-5! font-bold"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default OrderTrackingExperience;
