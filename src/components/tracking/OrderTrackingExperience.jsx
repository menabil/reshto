"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { ReceiptModal } from "@/components/checkout/ReceiptModal";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/constants/site";

const TRACKING_STAGES = [
  {
    step: 0,
    statusKey: "Pending",
    label: "Order Confirmed",
    title: "Order Placed & Confirmed",
    desc: "Your order has been received by our kitchen terminal and approved.",
    icon: "ri-checkbox-circle-fill",
    color: "text-emerald-500",
    bg: "bg-emerald-500",
    estimatedMins: "35 mins",
  },
  {
    step: 1,
    statusKey: "Preparing",
    label: "In the Kitchen",
    title: "Chef is Handcrafting Your Meal",
    desc: "Executive Chef & team are grilling, tossing, and plating your fresh dishes.",
    icon: "ri-fire-fill",
    color: "text-amber-500",
    bg: "bg-amber-500",
    estimatedMins: "25 mins",
  },
  {
    step: 2,
    statusKey: "Out for Delivery",
    label: "On the Way",
    title: "Courier Speeding to Your Door",
    desc: "Your hot meal has been sealed in thermal carriers and is on the road.",
    icon: "ri-e-bike-2-fill",
    color: "text-blue-500",
    bg: "bg-blue-500",
    estimatedMins: "10 mins",
  },
  {
    step: 3,
    statusKey: "Delivered",
    label: "Delivered",
    title: "Delivered & Bon Appétit!",
    desc: "Meal delivered safely to your location. Thank you for dining with Reshto!",
    icon: "ri-gift-fill",
    color: "text-emerald-600",
    bg: "bg-emerald-600",
    estimatedMins: "Arrived",
  },
];

const DEFAULT_DEMO_ORDER = {
  id: "ORD-982",
  date: "Today",
  customer: "Tahmid Hassan",
  phone: "+880 1711-234567",
  email: "tahmid@example.com",
  address: "House 24, Road 7, Block D, Banani, Dhaka",
  orderType: "Delivery",
  paymentMethod: "Cash on Delivery",
  status: "Preparing",
  itemsSummary: "Artisanal Margherita Pizza (x1), Prime Ribeye Steak (x1), Truffle Fries (x1)",
  items: [
    {
      id: 1,
      name: "Artisanal Margherita Pizza",
      price: "$18.50",
      qty: 1,
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Prime Ribeye Steak",
      price: "$34.00",
      qty: 1,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Crispy Truffle Fries",
      price: "$8.50",
      qty: 1,
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    },
  ],
  subtotal: "$61.00",
  discount: "-$6.10",
  delivery: "$5.00",
  tax: "$4.88",
  total: "$64.78",
};

export const OrderTrackingExperience = () => {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get("orderId");

  const { orders, updateOrderStatus } = useStore();
  const { t, formatPrice } = useLanguage();

  const [searchInput, setSearchInput] = useState(urlOrderId || "");
  const [selectedOrderId, setSelectedOrderId] = useState(urlOrderId || "");
  const [showReceipt, setShowReceipt] = useState(false);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(1420); // 23 mins 40 secs
  const [activeStepIndex, setActiveStepIndex] = useState(1); // default Preparing

  // Resolve matching order from store or fallback
  const currentOrder = useMemo(() => {
    if (selectedOrderId) {
      const match = orders?.find(
        (o) => o.id.toLowerCase() === selectedOrderId.toLowerCase()
      );
      if (match) return match;
    }
    if (orders && orders.length > 0) {
      return orders[0];
    }
    return DEFAULT_DEMO_ORDER;
  }, [selectedOrderId, orders]);

  // Sync step index with order's actual status
  useEffect(() => {
    if (currentOrder?.status) {
      const idx = TRACKING_STAGES.findIndex(
        (s) => s.statusKey.toLowerCase() === currentOrder.status.toLowerCase()
      );
      if (idx !== -1) {
        /* eslint-disable react-hooks/set-state-in-effect */
        setActiveStepIndex(idx);
        /* eslint-enable react-hooks/set-state-in-effect */
      }
    }
  }, [currentOrder?.status]);

  // Live countdown timer
  useEffect(() => {
    if (activeStepIndex === 3) return; // arrived
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeStepIndex]);

  // Auto-simulation interval
  useEffect(() => {
    if (!isAutoSimulating) return;

    const simTimer = setInterval(() => {
      setActiveStepIndex((prev) => {
        const next = (prev + 1) % TRACKING_STAGES.length;
        const nextStatus = TRACKING_STAGES[next].statusKey;
        if (currentOrder?.id) {
          updateOrderStatus(currentOrder.id, nextStatus);
        }
        return next;
      });
    }, 8000);

    return () => clearInterval(simTimer);
  }, [isAutoSimulating, currentOrder?.id, updateOrderStatus]);

  // Set manual step
  const handleSetStep = (index) => {
    setActiveStepIndex(index);
    const newStatus = TRACKING_STAGES[index].statusKey;
    if (currentOrder?.id) {
      updateOrderStatus(currentOrder.id, newStatus);
    }
  };

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSelectedOrderId(searchInput.trim());
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const currentStage = TRACKING_STAGES[activeStepIndex];

  // WhatsApp courier message
  const courierWhatsAppUrl = () => {
    const cleanPhone = (siteConfig.contact.phone || "+14155551234").replace(/[^\d]/g, "");
    const msg = `Hello Tanvir! I am ${currentOrder.customer}, tracking Order #${currentOrder.id}. Any updates on delivery? Thanks!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  // Add a brief loading skeleton before the main UI renders
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching delay (e.g., 300ms) – replace with real async fetch as needed
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-48 h-6 bg-ink/10 rounded animate-pulse mb-4" />
        <div className="w-80 h-4 bg-ink/10 rounded animate-pulse mb-2" />
        <div className="w-80 h-4 bg-ink/10 rounded animate-pulse" />
      </div>
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
            <i className="ri-radar-line" /> Realtime Food Tracker
          </span>
          <h1>
            Live Order <span>Tracking</span>.
          </h1>
          <p>
            Watch your meal journey in real-time from the kitchen flame to your doorstep.
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
            {orders && orders.length > 0 && (
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
                  {orders.map((o) => (
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
            
            {/* Top Banner with ETA Countdown */}
            <div className="bg-gradient-to-r from-[#1c1a18] via-[#24211d] to-[#3a2916] p-6 md:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand/20 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-300 ring-1 ring-brand-300/30">
                    Live Dispatch
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

              {/* Countdown Dial */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md min-w-[140px] text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Estimated Arrival
                </span>
                <span className="mt-0.5 font-mono text-2xl font-black text-brand-300">
                  {activeStepIndex === 3 ? "Delivered" : formatTimer(remainingSeconds)}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live GPS Synced
                </span>
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
                      onClick={() => handleSetStep(idx)}
                      className="group cursor-pointer flex flex-col items-center text-center relative"
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
                      <span className="text-[10px] text-ink-700/60 dark:text-white/40 font-mono mt-0.5">
                        {stage.estimatedMins}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress track line */}
              <div className="relative mt-6 h-2 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-brand to-amber-500 transition-all duration-700 ease-out"
                  style={{
                    width: `${((activeStepIndex) / (TRACKING_STAGES.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Interactive Animated Route Map Graphic */}
            <div className="p-6 md:p-8 bg-[#faf8f5]/60 dark:bg-[#141312] border-b border-ink/10 dark:border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink dark:text-white flex items-center gap-1.5">
                  <i className="ri-road-map-line text-brand text-sm" /> Live Road Route Simulation
                </h3>
                <span className="text-[11px] font-semibold text-ink-700/60 dark:text-white/50">
                  Banani &bull; 2.8 km away
                </span>
              </div>

              {/* SVG Delivery Route Visualization */}
              <div className="relative h-36 w-full rounded-2xl border border-ink/10 bg-white dark:border-white/10 dark:bg-[#1e1c1a] overflow-hidden flex items-center px-8 shadow-inner">
                {/* Background Map Grid Pattern */}
                <div className="absolute inset-0 opacity-15 [background-size:24px_24px] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />

                {/* Road Path (SVG) */}
                <svg className="absolute inset-x-8 h-10 w-[calc(100%-64px)] overflow-visible" preserveAspectRatio="none">
                  {/* Road Base */}
                  <line x1="0" y1="20" x2="100%" y2="20" stroke="#e2d9cc" strokeWidth="8" strokeLinecap="round" className="dark:stroke-white/10" />
                  {/* Animated Road Dash */}
                  <line x1="0" y1="20" x2="100%" y2="20" stroke="#c49a45" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
                </svg>

                {/* Pickup Node (Restaurant) */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white shadow-md">
                    <i className="ri-store-2-fill text-lg" />
                  </span>
                  <span className="mt-1 text-[10px] font-bold text-ink dark:text-white whitespace-nowrap">
                    Reshto Kitchen
                  </span>
                </div>

                {/* Moving Courier Scooter */}
                <div
                  className="absolute z-20 flex flex-col items-center transition-all duration-1000 ease-in-out"
                  style={{
                    left: `calc(32px + ${activeStepIndex * 28}% - 16px)`,
                  }}
                >
                  <span className="relative grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-white shadow-xl animate-bounce">
                    <i className="ri-e-bike-2-fill text-base" />
                    <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping" />
                  </span>
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[9px] font-bold text-white shadow-sm whitespace-nowrap mt-0.5">
                    Rider
                  </span>
                </div>

                <div className="flex-1" />

                {/* Dropoff Node (Customer Location) */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-md">
                    <i className="ri-map-pin-user-fill text-lg" />
                  </span>
                  <span className="mt-1 text-[10px] font-bold text-ink dark:text-white whitespace-nowrap max-w-[120px] truncate text-center">
                    {currentOrder.address?.split(",")[0] || "Delivery Dropoff"}
                  </span>
                </div>
              </div>
            </div>

            {/* Courier Profile & Contact Options */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl bg-ink/10 dark:bg-white/10 border-2 border-brand/40">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Courier Partner"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-ink dark:text-white">
                      Tanvir Ahmed
                    </strong>
                    <span className="flex items-center text-xs font-bold text-amber-500">
                      <i className="ri-star-fill mr-0.5" /> 4.9
                    </span>
                  </div>
                  <p className="text-xs text-ink-700/70 dark:text-white/60">
                    Reshto Express Rider &bull; Honda CB150
                  </p>
                  <span className="font-mono text-[11px] text-ink-700/50 dark:text-white/40">
                    Plate: DHAKA-METRO-HA-421
                  </span>
                </div>
              </div>

              {/* Courier Actions */}
              <div className="flex flex-wrap items-center md:justify-end gap-2.5">
                <a
                  href={`tel:${currentOrder.phone || "+8801700000000"}`}
                  className="flex items-center gap-1.5 rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-xs font-bold text-ink hover:bg-ink/5 dark:border-white/15 dark:bg-[#201d1a] dark:text-white transition shadow-xs"
                >
                  <i className="ri-phone-line text-sm text-brand" /> Call Rider
                </a>
                <a
                  href={courierWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition shadow-xs"
                >
                  <i className="ri-whatsapp-line text-sm" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Simulation Controls & Status Switcher */}
            <div className="p-4 md:px-8 bg-brand/5 dark:bg-brand/10 border-t border-brand/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <i className="ri-flask-line text-brand text-base" />
                <span className="font-bold text-ink dark:text-white">
                  Demo Simulation Controls:
                </span>
                <span className="text-ink-700/70 dark:text-white/60 text-[11px]">
                  (Click any stage or toggle auto-play)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoSimulating(!isAutoSimulating)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition flex items-center gap-1 ${
                    isAutoSimulating
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white border border-ink/15 text-ink hover:bg-ink/5 dark:bg-[#201d1a] dark:text-white dark:border-white/15"
                  }`}
                >
                  <i className={isAutoSimulating ? "ri-pause-fill" : "ri-play-fill"} />
                  {isAutoSimulating ? "Pause Auto Simulation" : "Auto-Simulate Delivery (8s)"}
                </button>

                <button
                  type="button"
                  onClick={() => handleSetStep((activeStepIndex + 1) % TRACKING_STAGES.length)}
                  className="rounded-xl bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-600 transition"
                >
                  Next Stage &rarr;
                </button>
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
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-ink/5 dark:bg-white/5">
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
