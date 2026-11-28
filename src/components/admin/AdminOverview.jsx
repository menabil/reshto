"use client";

import { SafeImage } from "@/components/ui/SafeImage";

export const AdminOverview = ({
  activeTab,
  orders,
  menuItems,
  reservations,
  setActiveTab,
  setShowAddModal,
}) => (
  <>
    {/* TAB 1: OVERVIEW */}
    {activeTab === "overview" ? (
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {/* Recent Orders Box */}
          <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                Order Queue
              </h3>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs font-bold text-brand hover:underline dark:text-brand-300"
              >
                View All Orders &rarr;
              </button>
            </div>
            <div className="divide-y divide-ink/5 dark:divide-white/5">
              {orders.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink-700/60 dark:text-white/50">
                  No orders yet. Customer orders will appear here.
                </p>
              ) : (
                orders.slice(0, 4).map((ord) => (
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
                        {ord.itemsSummary ||
                          (Array.isArray(ord.items)
                            ? ord.items
                                .map((i) => `${i.name} (x${i.qty})`)
                                .join(", ")
                            : ord.items)}
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
                ))
              )}
            </div>
          </div>

          {/* Popular Dishes Highlight */}
          <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <h3 className="mb-4 font-display text-lg font-bold text-ink dark:text-white">
              Current Menu Items
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {menuItems.length === 0 ? (
                <p className="text-sm text-ink-700/60 dark:text-white/50">
                  No menu items have been added yet.
                </p>
              ) : (
                menuItems.slice(0, 4).map((dish) => (
                  <div
                    key={dish.cartId}
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
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Bookings & System Health */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-ink/10 bg-[#fffdf8] p-6 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                Recent Reservations
              </h3>
              <button
                onClick={() => setActiveTab("reservations")}
                className="text-xs font-bold text-brand hover:underline dark:text-brand-300"
              >
                All &rarr;
              </button>
            </div>
            <div className="space-y-3">
              {reservations.length === 0 ? (
                <p className="py-4 text-sm text-ink-700/60 dark:text-white/50">
                  No table reservations yet.
                </p>
              ) : (
                reservations.slice(0, 3).map((res) => (
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
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 dark:border-amber-500/20 dark:bg-amber-500/5">
            <h4 className="font-display font-bold text-amber-800 dark:text-amber-300">
              <i className="ri-settings-3-line mr-1" /> Quick Actions
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-amber-900/70 dark:text-amber-200/70">
              Add a menu item here. Your changes are saved in this browser.
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
  </>
);

export default AdminOverview;
