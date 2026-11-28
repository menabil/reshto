"use client";

export const AdminOrdersManagement = ({
  activeTab,
  filteredOrders,
  orderSearch,
  setOrderSearch,
  orderStatusFilter,
  setOrderStatusFilter,
  orderDateFilter,
  setOrderDateFilter,
  orders,
  updateOrderStatus,
  setSelectedOrderReceipt,
}) => (
  <>
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
                Manage orders with search by customer, phone, ID or date.
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

              {(orderSearch ||
                orderStatusFilter !== "all" ||
                orderDateFilter) && (
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
              <thead className="border-b border-ink/10 bg-ink/2 text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:border-white/10 dark:bg-white/2 dark:text-white/60">
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
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-xs text-ink-700/60 dark:text-white/50"
                    >
                      <i className="ri-search-line text-2xl block mb-2" />
                      {orders.length === 0
                        ? "No customer orders have been placed yet."
                        : "No orders matched your search or filters."}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr
                      key={ord.id}
                      className="hover:bg-ink/1 dark:hover:bg-white/1"
                    >
                      <td className="px-5 py-4 font-mono font-bold text-xs text-brand dark:text-brand-300">
                        {ord.id}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-ink dark:text-white">
                          {ord.customer}
                        </p>
                        <p className="text-xs text-ink-700/60 dark:text-white/50">
                          {ord.email}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-xs text-ink-700/80 dark:text-white/70 max-w-sm">
                        {ord.itemsSummary ||
                          (Array.isArray(ord.items)
                            ? ord.items
                                .map((i) => `${i.name} (x${i.qty})`)
                                .join(", ")
                            : ord.items)}
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
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value)
                            }
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

export default AdminOrdersManagement;
