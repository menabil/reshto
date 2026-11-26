"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { ReceiptModal } from "@/components/checkout/ReceiptModal";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminMenuManagement } from "@/components/admin/AdminMenuManagement";
import { AdminOrdersManagement } from "@/components/admin/AdminOrdersManagement";
import { AdminReservationsManagement } from "@/components/admin/AdminReservationsManagement";
import { AddDishModal } from "@/components/admin/AddDishModal";

export const AdminDashboard = () => {
  const { isAdmin, mounted } = useAuth();
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
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayOrders = orders.filter(
    (order) =>
      Number.isFinite(Number(order.createdAt)) &&
      Number(order.createdAt) >= startOfToday.getTime(),
  );
  const todayRevenue = todayOrders.reduce((total, order) => {
    const amount = Number(
      order.totalNumber ?? String(order.total || "").replace(/[^0-9.-]/g, ""),
    );
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);
  const activeOrdersCount = orders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order.status),
  ).length;

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
              This dashboard is reserved for restaurant managers and kitchen
              chefs. Please sign in with administrator credentials.
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
              Control menu items, live customer orders, table reservations, and
              daily metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
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
                Today&apos;s Order Value
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <i className="ri-money-dollar-circle-line text-xl" />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink dark:text-white">
              {todayRevenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {todayOrders.length}{" "}
              {todayOrders.length === 1 ? "order" : "orders"} today
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
              {activeOrdersCount} Orders
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
              {orders.filter((order) => order.status === "Pending").length}{" "}
              pending
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
              {reservations.filter((r) => r.status === "Confirmed").length}{" "}
              confirmed
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
            <i className="ri-restaurant-line" /> Menu Management (
            {menuItems.length})
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
            <i className="ri-list-check-2" /> Orders ({orders.length})
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
            <i className="ri-calendar-check-line" /> Bookings &amp; Tables (
            {reservations.length})
          </button>
        </div>

        <AdminOverview
          activeTab={activeTab}
          orders={orders}
          menuItems={menuItems}
          reservations={reservations}
          setActiveTab={setActiveTab}
          setShowAddModal={setShowAddModal}
        />
        <AdminMenuManagement
          activeTab={activeTab}
          filteredMenu={filteredMenu}
          menuItems={menuItems}
          menuSearch={menuSearch}
          setMenuSearch={setMenuSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setShowAddModal={setShowAddModal}
          toggleStock={toggleStock}
          deleteDish={deleteDish}
        />
        <AdminOrdersManagement
          activeTab={activeTab}
          filteredOrders={filteredOrders}
          orderSearch={orderSearch}
          setOrderSearch={setOrderSearch}
          orderStatusFilter={orderStatusFilter}
          setOrderStatusFilter={setOrderStatusFilter}
          orderDateFilter={orderDateFilter}
          setOrderDateFilter={setOrderDateFilter}
          orders={orders}
          updateOrderStatus={updateOrderStatus}
          setSelectedOrderReceipt={setSelectedOrderReceipt}
        />
        <AdminReservationsManagement
          activeTab={activeTab}
          filteredReservations={filteredReservations}
          resSearch={resSearch}
          setResSearch={setResSearch}
          resZoneFilter={resZoneFilter}
          setResZoneFilter={setResZoneFilter}
          resStatusFilter={resStatusFilter}
          setResStatusFilter={setResStatusFilter}
          resDateFilter={resDateFilter}
          setResDateFilter={setResDateFilter}
          reservations={reservations}
          updateReservationStatus={updateReservationStatus}
        />
        <AddDishModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          handleAddDishSubmit={handleAddDishSubmit}
          newDish={newDish}
          setNewDish={setNewDish}
        />
      </Container>
    </div>
  );
};

export default AdminDashboard;
