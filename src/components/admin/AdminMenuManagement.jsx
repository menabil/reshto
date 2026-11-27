"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { menuTabs } from "@/data/data";

export const AdminMenuManagement = ({
  activeTab,
  filteredMenu,
  menuItems,
  menuSearch,
  setMenuSearch,
  selectedCategory,
  setSelectedCategory,
  setShowAddModal,
  toggleStock,
  deleteDish,
}) => (
  <>
        {/* TAB 2: MENU MANAGEMENT */}
        {activeTab === "menu" ? (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-ink/10 bg-[#fffdf8] p-5 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a] md:flex-row md:items-center">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative min-w-55 flex-1">
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
                  <thead className="border-b border-ink/10 bg-ink/2 text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:border-white/10 dark:bg-white/2 dark:text-white/60">
                    <tr>
                      <th className="px-5 py-4">Dish</th>
                      <th className="px-5 py-4">Category</th>
                      <th className="px-5 py-4">Price</th>
                      <th className="px-5 py-4">Availability</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5 dark:divide-white/5">
                    {filteredMenu.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-12 text-center text-xs text-ink-700/60 dark:text-white/50"
                        >
                          {menuItems.length === 0
                            ? "No menu items have been added yet."
                            : "No menu items match your search or category."}
                        </td>
                      </tr>
                    ) : (
                      filteredMenu.map((item) => (
                        <tr
                          key={item.cartId}
                          className="hover:bg-ink/1 dark:hover:bg-white/1"
                        >
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
                              onClick={() => toggleStock(item.cartId)}
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
                              onClick={() => deleteDish(item.cartId)}
                              className="text-rose-500 hover:text-rose-700 transition"
                              title={
                                item.isDefault
                                  ? "Delete until refresh; this default dish returns after refreshing"
                                  : "Delete dish"
                              }
                            >
                              <i className="ri-delete-bin-line text-lg" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}


  </>
);

export default AdminMenuManagement;
