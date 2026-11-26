"use client";

import { menuTabs } from "@/data/data";

export const AddDishModal = ({ showAddModal, setShowAddModal, handleAddDishSubmit, newDish, setNewDish }) => (
  <>
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
                    onChange={(e) =>
                      setNewDish({ ...newDish, name: e.target.value })
                    }
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
                      onChange={(e) =>
                        setNewDish({ ...newDish, price: e.target.value })
                      }
                      className="w-full rounded-xl border border-ink/15 bg-white p-2.5 text-sm text-ink outline-none focus:border-brand dark:border-white/10 dark:bg-[#0f0e0d] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-ink-700 dark:text-white/80">
                      Category *
                    </label>
                    <select
                      value={newDish.category}
                      onChange={(e) =>
                        setNewDish({ ...newDish, category: e.target.value })
                      }
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
                    onChange={(e) =>
                      setNewDish({ ...newDish, desc: e.target.value })
                    }
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
                    onChange={(e) =>
                      setNewDish({ ...newDish, image: e.target.value })
                    }
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
                  <button
                    type="submit"
                    className="btn-brand py-2! px-5! text-sm!"
                  >
                    Add to Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

  </>
);

export default AddDishModal;
