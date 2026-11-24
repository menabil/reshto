"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { menuTabs } from "@/data/data";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { ReceiptModal } from "@/components/checkout/ReceiptModal";

export const AdminDashboard = () => {
  const { user, isAdmin, mounted, logout } = useAuth();
  const {
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    menuItems,
    addMenuItem,
    deleteMenuItem,
    toggleMenuItemStock,
  } = useStore();

  const [activeTab, setActiveTab] = useState("overview"); // overview, menu, orders, reservations
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState(null);

  // Menu Search & Filter
  const [menuSearch, setMenuSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Orders Search & Date Filter (Task 5.3)
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [orderDateFilter, setOrderDateFilter] = useState("");

  // Reservations Search & Date Filter (Task 5.3)
  const [resSearch, setResSearch] = useState("");
  const [resStatusFilter, setResStatusFilter] = useState("all");
  const [resZoneFilter, setResZoneFilter] = useState("all");
  const [resDateFilter, setResDateFilter] = useState("");

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const q = orderSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ord.customer?.toLowerCase().includes(q) ||
      ord.email?.toLowerCase().includes(q) ||
      ord.phone?.includes(q) ||
      ord.id?.toLowerCase().includes(q);

    const matchesStatus =
      orderStatusFilter === "all" || ord.status === orderStatusFilter;

    const matchesDate =
      !orderDateFilter || (ord.date && ord.date.includes(orderDateFilter));

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Filtered Reservations
  const filteredReservations = reservations.filter((res) => {
    const q = resSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      res.guestName?.toLowerCase().includes(q) ||
      res.email?.toLowerCase().includes(q) ||
      res.phone?.includes(q) ||
      res.id?.toLowerCase().includes(q);

    const matchesStatus =
      resStatusFilter === "all" || res.status === resStatusFilter;

    const matchesZone =
      resZoneFilter === "all" ||
      (res.seatingZone && res.seatingZone.includes(resZoneFilter));

    const matchesDate =
      !resDateFilter || (res.date && res.date.includes(resDateFilter));

    return matchesSearch && matchesStatus && matchesZone && matchesDate;
  });

  // Add Item Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    desc: "",
    category: "lunch",
    image: "",
  });

  // Filtered menu
  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch = item.menuItemName
      .toLowerCase()
      .includes(menuSearch.toLowerCase());
    const matchesCat =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Toggle in-stock
  const toggleStock = (itemId) => {
    toggleMenuItemStock(itemId);
  };

  // Delete dish
  const deleteDish = (itemId) => {
    if (confirm("Are you sure you want to remove this dish from the menu?")) {
      deleteMenuItem(itemId);
    }
  };

  // Handle Add Dish Submit
  const handleAddDishSubmit = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;

    addMenuItem(newDish);
    setShowAddModal(false);
    setNewDish({
      name: "",
      price: "",
      desc: "",
      category: "lunch",
      image: "",
    });
  };

  if (mounted && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#f7f3eb] pb-20 pt-32 transition-colors duration-300 dark:bg-[#0f0e0d] dark:text-[#f5f5f4] flex items-center justify-center">
        <Container className="max-w-md text-center">
          <div className="rounded-4xl border border-ink/10 bg-[#fffdf8] p-8 shadow-2xl dark:border-white/10 dark:bg-[#1e1c1a]">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-amber-500/10 text-3xl text-amber-500">
              <i className="ri-shield-keyhole-line" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink dark:text-white">
              Admin Access Required
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
              This dashboard is reserved for restaurant managers and kitchen chefs. Please sign in with administrator credentials.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link href="/login" className="btn-brand py-3! text-xs!">
                Go to Login Page <i className="ri-arrow-right-line" />
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
      <Container>
        {/* Top Header / Breadcrumb */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-ink/10 pb-6 dark:border-white/10 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-300">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span>Management</span>
            </div>
            <h1 className="mt-1 font-display text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
              Restaurant Admin Portal
            </h1>
            <p className="mt-1 text-sm text-ink-700/60 dark:text-white/60">
              Control menu items, live customer orders, table reservations, and daily metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Kitchen Live
            </span>
            <Link href="/order" className="btn-brand text-xs py-2.5! px-4!">
              View Storefront <i className="ri-external-link-line" />
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-5 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/60">
                Today&apos;s Revenue
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <i className="ri-money-dollar-circle-line text-xl" />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink dark:text-white">
              $14,850.00
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <i className="ri-arrow-up-line" /> +14.2% vs yesterday
            </span>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-5 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/60">
                Active Orders
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand dark:text-brand-300">
                <i className="ri-shopping-bag-3-line text-xl" />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink dark:text-white">
              {orders.length} Orders
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
              {orders.filter((o) => o.status === "Pending").length} pending review
            </span>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-5 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/60">
                Reservations
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <i className="ri-calendar-event-line text-xl" />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink dark:text-white">
              {reservations.length} Tables
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-purple-500">
              {reservations.filter((r) => r.status === "Confirmed").length} confirmed
            </span>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-5 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:text-white/60">
                Menu Dishes
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <i className="ri-restaurant-2-line text-xl" />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink dark:text-white">
              {menuItems.length} Dishes
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
              {menuItems.filter((m) => m.inStock).length} currently in stock
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-ink/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "overview"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-dashboard-3-line" /> Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "menu"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-restaurant-line" /> Menu Management ({menuItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "orders"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-list-check-2" /> Live Orders ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reservations")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === "reservations"
                ? "bg-brand text-white shadow-sm dark:text-[#171512]"
                : "bg-white/60 text-ink-700 hover:bg-white dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            <i className="ri-calendar-check-line" /> Bookings &amp; Tables ({reservations.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6">
              {/* Recent Orders Box */}
              <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                    Live Kitchen Queue
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-brand hover:underline dark:text-brand-300"
                  >
                    View All Orders &rarr;
                  </button>
                </div>
                <div className="divide-y divide-ink/5 dark:divide-white/5">
                  {orders.slice(0, 4).map((ord) => (
                    <div
                      key={ord.id}
                      className="flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink dark:text-white">
                            {ord.customer}
                          </span>
                          <span className="text-xs text-ink-700/50 dark:text-white/40">
                            {ord.id}
                          </span>
                          <span className="rounded-md bg-ink/5 px-2 py-0.5 text-[10px] font-bold uppercase text-ink-700 dark:bg-white/10 dark:text-white/70">
                            {ord.type}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-ink-700/70 dark:text-white/60">
                          {ord.itemsSummary || (Array.isArray(ord.items) ? ord.items.map((i) => `${i.name} (x${i.qty})`).join(", ") : ord.items)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span className="font-display font-bold text-brand dark:text-brand-300">
                          {ord.total}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            ord.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                              : ord.status === "Preparing"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                              : ord.status === "Pending"
                              ? "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Dishes Highlight */}
              <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
                <h3 className="mb-4 font-display text-lg font-bold text-ink dark:text-white">
                  Trending Menu Items
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {menuItems.slice(0, 4).map((dish) => (
                    <div
                      key={dish.id}
                      className="flex items-center gap-3 rounded-2xl border border-ink/5 p-3 dark:border-white/5"
                    >
                      <SafeImage
                        src={dish.image}
                        alt={dish.menuItemName}
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-bold text-sm text-ink dark:text-white">
                          {dish.menuItemName}
                        </h4>
                        <span className="text-xs font-bold text-brand dark:text-brand-300">
                          {dish.menuItemPrice}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Upcoming Bookings & System Health */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                    Tonight&apos;s Tables
                  </h3>
                  <button
                    onClick={() => setActiveTab("reservations")}
                    className="text-xs font-bold text-brand hover:underline dark:text-brand-300"
                  >
                    All &rarr;
                  </button>
                </div>
                <div className="space-y-3">
                  {reservations.slice(0, 3).map((res) => (
                    <div
                      key={res.id}
                      className="rounded-2xl border border-ink/5 p-3 dark:border-white/5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-ink dark:text-white">
                          {res.guestName}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {res.status}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs text-ink-700/60 dark:text-white/60">
                        <span>{res.date}</span>
                        <span>{res.guests} Guests</span>
                      </div>
                      <span className="mt-1 block text-[11px] font-semibold text-brand dark:text-brand-300">
                        {res.table}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kitchen Action Bar */}
              <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 dark:border-amber-500/20 dark:bg-amber-500/5">
                <h4 className="font-display font-bold text-amber-800 dark:text-amber-300">
                  <i className="ri-fire-line mr-1" /> Peak Hour Alert
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-amber-900/70 dark:text-amber-200/70">
                  Dinner rush predicted between 7:30 PM &mdash; 9:30 PM. All culinary stations are fully staffed.
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="btn-brand mt-4 w-full py-2.5! text-xs!"
                >
                  <i className="ri-add-line mr-1" /> Add Special Dish to Menu
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 2: MENU MANAGEMENT */}
        {activeTab === "menu" ? (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-ink/10 bg-[#fffdf8] p-5 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a] md:flex-row md:items-center">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative min-w-[220px] flex-1">
                  <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-700/50 dark:text-white/40" />
                  <input
                    type="search"
                    placeholder="Search dish title..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full rounded-xl border border-ink/15 bg-white py-2 pl-9 pr-3 text-sm text-ink outline-none transition focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                  />
                </div>

                {/* Category select */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {menuTabs.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>

              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="btn-brand shrink-0 py-2.5! px-4! text-xs!"
              >
                <i className="ri-add-line mr-1 text-sm" /> Add New Dish
              </button>
            </div>

            {/* Menu Table */}
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-[#fffdf8] shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-ink/[0.02] text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60">
                    <tr>
                      <th className="px-5 py-4">Dish</th>
                      <th className="px-5 py-4">Category</th>
                      <th className="px-5 py-4">Price</th>
                      <th className="px-5 py-4">Availability</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5 dark:divide-white/5">
                    {filteredMenu.map((item) => (
                      <tr key={item.id} className="hover:bg-ink/[0.01] dark:hover:bg-white/[0.01]">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <SafeImage
                              src={item.image}
                              alt={item.menuItemName}
                              className="h-12 w-12 rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-bold text-ink dark:text-white">
                                {item.menuItemName}
                              </p>
                              <p className="max-w-xs truncate text-xs text-ink-700/60 dark:text-white/50">
                                {item.menuItemDesc}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-ink/5 px-2.5 py-1 text-xs font-semibold capitalize text-ink-700 dark:bg-white/10 dark:text-white/80">
                            {item.categoryLabel || item.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-display font-bold text-brand dark:text-brand-300">
                          {item.menuItemPrice}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => toggleStock(item.id)}
                            className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                              item.inStock
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                                : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                          >
                            {item.inStock ? "In Stock" : "Sold Out"}
                          </button>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => deleteDish(item.id)}
                            className="text-rose-500 hover:text-rose-700 transition"
                            title="Delete dish"
                          >
                            <i className="ri-delete-bin-line text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === "orders" ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
              <div className="border-b border-ink/10 p-5 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                    Incoming &amp; Recent Orders ({filteredOrders.length})
                  </h3>
                  <p className="text-xs text-ink-700/60 dark:text-white/60">
                    Live updates with search by customer, phone, ID or date.
                  </p>
                </div>

                {/* Filter & Search Toolbar (Task 5.3) */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink dark:border-white/15 dark:bg-[#171614] dark:text-white">
                    <i className="ri-search-line text-ink-700/60 dark:text-white/40" />
                    <input
                      type="text"
                      placeholder="Search customer, ID, phone..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="bg-transparent outline-none text-xs w-36 sm:w-48 placeholder:text-ink-700/50 dark:placeholder:text-white/40"
                    />
                    {orderSearch && (
                      <button
                        type="button"
                        onClick={() => setOrderSearch("")}
                        className="text-ink-700/50 hover:text-ink dark:text-white/40"
                      >
                        <i className="ri-close-line" />
                      </button>
                    )}
                  </div>

                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs font-bold text-ink outline-none dark:border-white/15 dark:bg-[#171614] dark:text-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {(orderSearch || orderStatusFilter !== "all" || orderDateFilter) && (
                    <button
                      type="button"
                      onClick={() => {
                        setOrderSearch("");
                        setOrderStatusFilter("all");
                        setOrderDateFilter("");
                      }}
                      className="rounded-xl bg-ink/5 px-2.5 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-ink/[0.02] text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60">
                    <tr>
                      <th className="px-5 py-4">Order ID</th>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Items Ordered</th>
                      <th className="px-5 py-4">Total</th>
                      <th className="px-5 py-4">Fulfillment</th>
                      <th className="px-5 py-4">Status &amp; Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5 dark:divide-white/5">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-xs text-ink-700/60 dark:text-white/50">
                          <i className="ri-search-line text-2xl block mb-2" />
                          No orders matched your search or filters.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-ink/[0.01] dark:hover:bg-white/[0.01]">
                        <td className="px-5 py-4 font-mono font-bold text-xs text-brand dark:text-brand-300">
                          {ord.id}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-ink dark:text-white">{ord.customer}</p>
                          <p className="text-xs text-ink-700/60 dark:text-white/50">{ord.email}</p>
                        </td>
                        <td className="px-5 py-4 text-xs text-ink-700/80 dark:text-white/70 max-w-sm">
                          {ord.itemsSummary || (Array.isArray(ord.items) ? ord.items.map((i) => `${i.name} (x${i.qty})`).join(", ") : ord.items)}
                        </td>
                        <td className="px-5 py-4 font-display font-extrabold text-ink dark:text-white">
                          {ord.total}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-md bg-ink/5 px-2.5 py-1 text-xs font-semibold text-ink-700 dark:bg-white/10 dark:text-white/70">
                            {ord.type} &middot; {ord.time}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              className="rounded-lg border border-ink/15 bg-white px-2.5 py-1 text-xs font-bold text-ink outline-none dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => setSelectedOrderReceipt(ord)}
                              className="grid h-7 w-7 place-items-center rounded-lg border border-ink/15 bg-white text-xs font-bold text-ink hover:bg-ink/5 dark:border-white/15 dark:bg-[#2c2925] dark:text-white transition"
                              title="Print Invoice / View Receipt"
                            >
                              <i className="ri-printer-line" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 4: RESERVATIONS */}
        {activeTab === "reservations" ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
              <div className="border-b border-ink/10 p-5 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                    Table Reservations ({filteredReservations.length})
                  </h3>
                  <p className="text-xs text-ink-700/60 dark:text-white/60">
                    Manage guest bookings with filter by guest name, phone, zone, or status.
                  </p>
                </div>

                {/* Filter & Search Toolbar (Task 5.3) */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink dark:border-white/15 dark:bg-[#171614] dark:text-white">
                    <i className="ri-search-line text-ink-700/60 dark:text-white/40" />
                    <input
                      type="text"
                      placeholder="Search guest, ID, phone..."
                      value={resSearch}
                      onChange={(e) => setResSearch(e.target.value)}
                      className="bg-transparent outline-none text-xs w-36 sm:w-48 placeholder:text-ink-700/50 dark:placeholder:text-white/40"
                    />
                    {resSearch && (
                      <button
                        type="button"
                        onClick={() => setResSearch("")}
                        className="text-ink-700/50 hover:text-ink dark:text-white/40"
                      >
                        <i className="ri-close-line" />
                      </button>
                    )}
                  </div>

                  <select
                    value={resZoneFilter}
                    onChange={(e) => setResZoneFilter(e.target.value)}
                    className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs font-bold text-ink outline-none dark:border-white/15 dark:bg-[#171614] dark:text-white"
                  >
                    <option value="all">All Seating Zones</option>
                    <option value="Outdoor Garden Patio">Outdoor Patio</option>
                    <option value="Romantic Window Corner">Window Corner</option>
                    <option value="Indoor Grand Dining">Indoor Hall</option>
                    <option value="Private VIP Lounge">VIP Lounge</option>
                  </select>

                  <select
                    value={resStatusFilter}
                    onChange={(e) => setResStatusFilter(e.target.value)}
                    className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs font-bold text-ink outline-none dark:border-white/15 dark:bg-[#171614] dark:text-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {(resSearch || resStatusFilter !== "all" || resZoneFilter !== "all") && (
                    <button
                      type="button"
                      onClick={() => {
                        setResSearch("");
                        setResStatusFilter("all");
                        setResZoneFilter("all");
                        setResDateFilter("");
                      }}
                      className="rounded-xl bg-ink/5 px-2.5 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-ink/[0.02] text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60">
                    <tr>
                      <th className="px-5 py-4">Booking ID &amp; Guest</th>
                      <th className="px-5 py-4">Seating Zone &amp; Table</th>
                      <th className="px-5 py-4">Occasion &amp; Add-ons</th>
                      <th className="px-5 py-4">Party &amp; Schedule</th>
                      <th className="px-5 py-4">Live Status &amp; Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5 dark:divide-white/5">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-xs text-ink-700/60 dark:text-white/50">
                          <i className="ri-search-line text-2xl block mb-2" />
                          No table bookings matched your search or filters.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((res) => (
                      <tr key={res.id} className="hover:bg-ink/[0.01] dark:hover:bg-white/[0.01]">
                        <td className="px-5 py-4">
                          <span className="font-mono text-xs font-extrabold text-brand dark:text-brand-300 block">
                            {res.id}
                          </span>
                          <p className="font-bold text-ink dark:text-white">{res.guestName}</p>
                          <p className="text-xs text-ink-700/60 dark:text-white/50">{res.phone}</p>
                          {res.email && <p className="text-[11px] text-ink-700/50 dark:text-white/40">{res.email}</p>}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-ink/5 px-2 py-0.5 text-xs font-semibold text-ink-700 dark:bg-white/10 dark:text-white/80 block w-fit">
                            {res.seatingZone || "Main Hall"}
                          </span>
                          <p className="mt-1 text-xs font-bold text-brand dark:text-brand-300">
                            {res.table}
                          </p>
                        </td>

                        <td className="px-5 py-4 max-w-xs text-xs">
                          <span className="font-bold text-ink dark:text-white block">
                            {res.occasion || "Casual Dining"}
                          </span>
                          {res.addOns?.length > 0 && (
                            <p className="text-[11px] text-ink-700/70 dark:text-white/60 mt-0.5">
                              ✨ {res.addOns.join(", ")}
                            </p>
                          )}
                          {res.decorationNotes && (
                            <p className="italic text-amber-700 dark:text-amber-300 text-[11px] mt-0.5">
                              &ldquo;{res.decorationNotes}&rdquo;
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-semibold text-xs text-ink dark:text-white">
                            {res.guests} Guests
                          </p>
                          <p className="text-xs text-ink-700/80 dark:text-white/70">
                            {res.date}
                          </p>
                          <p className="text-[11px] text-ink-700/60 dark:text-white/50">
                            {res.time}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={res.status}
                              onChange={(e) => updateReservationStatus(res.id, e.target.value)}
                              className={`rounded-lg border px-2.5 py-1 text-xs font-bold outline-none transition ${
                                res.status === "Confirmed"
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                  : res.status === "Cancelled"
                                  ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400"
                                  : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                              }`}
                            >
                              <option value="Confirmed" className="text-ink">Confirmed</option>
                              <option value="Pending" className="text-ink">Pending</option>
                              <option value="Cancelled" className="text-ink">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* MODAL: ADD NEW DISH */}
        {showAddModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-2xl dark:border-white/10 dark:bg-[#1e1c1a]">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4 dark:border-white/10">
                <h3 className="font-display text-xl font-bold text-ink dark:text-white">
                  Add New Dish
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-ink-700/60 hover:text-ink dark:text-white/60 dark:hover:text-white"
                >
                  <i className="ri-close-line text-2xl" />
                </button>
              </div>

              <form onSubmit={handleAddDishSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Truffle Mushroom Risotto"
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                    className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                      Price *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="$22.50"
                      value={newDish.price}
                      onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                      className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                      Category *
                    </label>
                    <select
                      value={newDish.category}
                      onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                      className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                    >
                      {menuTabs.map((t) => (
                        <option key={t.key} value={t.key}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description of ingredients and flavors..."
                    value={newDish.desc}
                    onChange={(e) => setNewDish({ ...newDish, desc: e.target.value })}
                    className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newDish.image}
                    onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                    className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-ink/15 px-4 py-2 text-sm font-bold text-ink dark:border-white/15 dark:text-white"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-brand py-2! px-5! text-sm!">
                    Add to Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default AdminDashboard;
