"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { useAuth } from "@/context/AuthContext";

const USER_MOCK = {
  name: "Tahmid Hassan",
  email: "tahmid.hassan@example.com",
  phone: "+880 1711-234567",
  membership: "Gold VIP Foodie",
  points: 480,
  joined: "March 2025",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
};

const USER_ORDERS = [
  {
    id: "ORD-8921",
    date: "Nov 16, 2026 &middot; 8:15 PM",
    items: [
      {
        name: "Classic Margherita Pizza",
        qty: 1,
        price: "$15.00",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Fresh Mint Lemonade",
        qty: 2,
        price: "$8.00",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
      },
    ],
    total: "$23.00",
    status: "Delivered",
    address: "House 24, Road 7, Banani, Dhaka",
  },
  {
    id: "ORD-8710",
    date: "Nov 10, 2026 &middot; 1:30 PM",
    items: [
      {
        name: "Caesar Salad",
        qty: 1,
        price: "$14.50",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Grilled Chicken Sandwich",
        qty: 1,
        price: "$16.00",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80",
      },
    ],
    total: "$30.50",
    status: "Delivered",
    address: "Gulshan-1 Circle, Dhaka",
  },
  {
    id: "ORD-8604",
    date: "Nov 02, 2026 &middot; 7:45 PM",
    items: [
      {
        name: "Prime Ribeye Steak",
        qty: 1,
        price: "$28.00",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Dark Chocolate Cake",
        qty: 1,
        price: "$8.00",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
      },
    ],
    total: "$36.00",
    status: "Delivered",
    address: "House 24, Road 7, Banani, Dhaka",
  },
];

const USER_RESERVATIONS = [
  {
    id: "RES-981",
    date: "Nov 20, 2026",
    time: "7:30 PM",
    guests: 4,
    table: "Table 4 (Patio Garden View)",
    status: "Confirmed",
    occasion: "Family Dinner",
  },
  {
    id: "RES-742",
    date: "Oct 28, 2026",
    time: "8:00 PM",
    guests: 2,
    table: "Table 2 (Window Corner)",
    status: "Completed",
    occasion: "Anniversary",
  },
];

const USER_FAVORITES = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    price: "$15.00",
    desc: "Traditional Italian Pizza with fresh mozzarella, basil and virgin olive oil",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Pan-Seared Salmon",
    price: "$26.00",
    desc: "Fresh and flavorful Atlantic fillet with lemon dill cream",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Fiery Beef Tacos",
    price: "$20.00",
    desc: "Spicy and savory beef with smoked chipotle salsa & fresh cilantro",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Specialty Roasted Coffee",
    price: "$3.00",
    desc: "Single-origin pour over with rich aroma",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  },
];

export const UserDashboard = () => {
  const { user: authUser, isAuthenticated, mounted, login } = useAuth();
  const [activeTab, setActiveTab] = useState("orders"); // orders, bookings, favorites, profile
  const [user, setUser] = useState(() => (authUser ? { ...USER_MOCK, ...authUser } : USER_MOCK));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (mounted && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7f4ed] pb-20 pt-32 transition-colors duration-300 dark:bg-[#09110d] dark:text-[#e5ede8] flex items-center justify-center">
        <Container className="max-w-md text-center">
          <div className="rounded-4xl border border-ink/10 bg-[#fffdf8] p-8 shadow-2xl dark:border-white/10 dark:bg-[#122119]">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand/10 text-3xl text-brand">
              <i className="ri-user-smile-line" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink dark:text-white">
              Customer Sign In
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
              Please sign in or register to view your order history, manage table reservations, and view saved favorite dishes.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link href="/login" className="btn-brand py-3! text-xs!">
                Sign In / Register <i className="ri-arrow-right-line" />
              </Link>
              <button
                type="button"
                onClick={() => login({ email: "user@reshto.com", role: "user" })}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300 transition"
              >
                <i className="ri-user-smile-fill mr-1" /> Quick One-Click Customer Login
              </button>
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
    <div className="min-h-screen bg-[#f7f4ed] pb-20 pt-28 transition-colors duration-300 dark:bg-[#09110d] dark:text-[#e5ede8]">
      <Container>
        {/* User Profile Header Card */}
        <div className="relative mb-8 overflow-hidden rounded-4xl border border-ink/10 bg-gradient-to-br from-[#12231d] via-[#1a3328] to-[#12231d] p-6 text-white shadow-xl dark:border-white/10 md:p-8">
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
                  <span className="rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-bold text-amber-300 border border-amber-400/30">
                    <i className="ri-vip-crown-fill mr-1" /> {user.membership}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/70">
                  {user.email} &middot; {user.phone}
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  Valued Reshto patron since {user.joined}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-center backdrop-blur-md">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Foodie Points
                </span>
                <span className="font-display text-xl font-extrabold">
                  {user.points} pts
                </span>
              </div>
              <Link href="/order" className="btn-brand py-2.5! px-4! text-xs!">
                Order Food <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-ink/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "orders"
                ? "bg-brand text-white shadow-sm"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#122119] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-shopping-bag-3-line" /> My Orders ({USER_ORDERS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "bookings"
                ? "bg-brand text-white shadow-sm"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#122119] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-calendar-check-line" /> My Reservations ({USER_RESERVATIONS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "favorites"
                ? "bg-brand text-white shadow-sm"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#122119] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-heart-3-line" /> Saved Favorites ({USER_FAVORITES.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "profile"
                ? "bg-brand text-white shadow-sm"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#122119] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-user-settings-line" /> Account Settings
          </button>
        </div>

        {/* TAB 1: MY ORDERS */}
        {activeTab === "orders" ? (
          <div className="space-y-4">
            {USER_ORDERS.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm transition-all hover:border-brand/40 dark:border-white/10 dark:bg-[#122119]"
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
                      {order.total}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {order.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-2xl border border-ink/5 bg-ink/[0.02] p-3 dark:border-white/5 dark:bg-white/[0.02]"
                    >
                      <SafeImage
                        src={it.image}
                        alt={it.name}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-sm text-ink dark:text-white">
                          {it.name}
                        </p>
                        <p className="text-xs text-ink-700/60 dark:text-white/60">
                          Qty: {it.qty} &middot; {it.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end gap-3 pt-2">
                  <Link
                    href="/order"
                    className="btn-outline text-xs py-2! px-4! dark:bg-[#1a2e23] dark:text-white dark:border-white/10"
                  >
                    <i className="ri-repeat-line mr-1" /> Reorder Dishes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* TAB 2: MY RESERVATIONS */}
        {activeTab === "bookings" ? (
          <div className="space-y-4">
            {USER_RESERVATIONS.map((res) => (
              <div
                key={res.id}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#122119] sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-brand dark:text-brand-300">
                      {res.id}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        res.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                          : "bg-ink/5 text-ink-700 dark:bg-white/10 dark:text-white/70"
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink dark:text-white">
                    Table for {res.guests} &middot; {res.occasion}
                  </h3>
                  <p className="text-xs text-ink-700/60 dark:text-white/60">
                    <i className="ri-calendar-line mr-1" /> {res.date} at {res.time}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-brand dark:text-brand-300">
                    <i className="ri-restaurant-line mr-1" /> {res.table}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a href="#book" className="btn-brand text-xs py-2.5! px-4!">
                    <i className="ri-add-line mr-1" /> New Table Booking
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* TAB 3: SAVED FAVORITES */}
        {activeTab === "favorites" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {USER_FAVORITES.map((fav) => (
              <div
                key={fav.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-[#fffdf8] shadow-sm dark:border-white/10 dark:bg-[#122119]"
              >
                <div className="relative h-44">
                  <SafeImage
                    src={fav.image}
                    alt={fav.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white text-rose-500 shadow-md dark:bg-[#1c3025]">
                    <i className="ri-heart-3-fill" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display font-bold text-base text-ink dark:text-white">
                    {fav.name}
                  </h3>
                  <p className="mt-1 flex-1 text-xs text-ink-700/60 dark:text-white/60 line-clamp-2">
                    {fav.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3 dark:border-white/5">
                    <span className="font-display font-extrabold text-brand dark:text-brand-300">
                      {fav.price}
                    </span>
                    <Link
                      href="/order"
                      className="btn-brand text-xs py-1.5! px-3!"
                    >
                      Order <i className="ri-arrow-right-line" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* TAB 4: ACCOUNT SETTINGS */}
        {activeTab === "profile" ? (
          <div className="max-w-2xl rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#122119]">
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
                    className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0c1612] dark:text-white"
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
                    className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0c1612] dark:text-white"
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
                  className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0c1612] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                  Primary Delivery Address
                </label>
                <input
                  type="text"
                  defaultValue="House 24, Road 7, Block D, Banani, Dhaka"
                  className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0c1612] dark:text-white"
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
