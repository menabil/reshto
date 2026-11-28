"use client";

export const AdminReservationsManagement = ({
  activeTab,
  filteredReservations,
  resSearch,
  setResSearch,
  resZoneFilter,
  setResZoneFilter,
  resStatusFilter,
  setResStatusFilter,
  resDateFilter,
  setResDateFilter,
  reservations,
  updateReservationStatus,
}) => (
  <>
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
                Manage guest bookings with filter by guest name, phone, zone, or
                status.
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

              {(resSearch ||
                resStatusFilter !== "all" ||
                resZoneFilter !== "all") && (
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
              <thead className="border-b border-ink/10 bg-ink/2 text-xs font-bold uppercase tracking-wider text-ink-700/60 dark:border-white/10 dark:bg-white/2 dark:text-white/60">
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
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-xs text-ink-700/60 dark:text-white/50"
                    >
                      <i className="ri-search-line text-2xl block mb-2" />
                      {reservations.length === 0
                        ? "No table reservations have been made yet."
                        : "No table bookings matched your search or filters."}
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res) => (
                    <tr
                      key={res.id}
                      className="hover:bg-ink/1 dark:hover:bg-white/1"
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-extrabold text-brand dark:text-brand-300 block">
                          {res.id}
                        </span>
                        <p className="font-bold text-ink dark:text-white">
                          {res.guestName}
                        </p>
                        <p className="text-xs text-ink-700/60 dark:text-white/50">
                          {res.phone}
                        </p>
                        {res.email && (
                          <p className="text-[11px] text-ink-700/50 dark:text-white/40">
                            {res.email}
                          </p>
                        )}
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
                            onChange={(e) =>
                              updateReservationStatus(res.id, e.target.value)
                            }
                            className={`rounded-lg border px-2.5 py-1 text-xs font-bold outline-none transition ${
                              res.status === "Confirmed"
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                : res.status === "Cancelled"
                                  ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400"
                                  : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                            }`}
                          >
                            <option value="Confirmed" className="text-ink">
                              Confirmed
                            </option>
                            <option value="Pending" className="text-ink">
                              Pending
                            </option>
                            <option value="Cancelled" className="text-ink">
                              Cancelled
                            </option>
                          </select>
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

export default AdminReservationsManagement;
