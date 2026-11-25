"use client";

import { useState } from "react";
import { RESTAURANT_TABLES } from "@/constants/tableData";

export const TableFloorPlan = ({
  selectedTableId,
  selectedZone,
  onSelectTable,
  guests = 2,
  date,
  time,
  bookedTableIds = [],
}) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredTable, setHoveredTable] = useState(null);

  const partySize = Number(guests) || 2;

  // Filter tables by active tab
  const displayedTables = RESTAURANT_TABLES.filter((table) => {
    if (activeFilter === "ALL") return true;
    return table.zone === activeFilter;
  });

  const getTableStatus = (table) => {
    if (table.id === selectedTableId) return "selected";
    if (table.defaultOccupied || bookedTableIds.includes(table.id)) return "occupied";
    return "available";
  };

  return (
    <div className="rounded-3xl border border-ink/10 bg-[#faf8f5] p-5 dark:border-white/10 dark:bg-[#131211] shadow-inner">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-ink/10 pb-4 dark:border-white/10">
        <div>
          <h3 className="font-display text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <i className="ri-map-2-line text-brand text-lg" />
            Interactive 2D Floor Plan
          </h3>
          <p className="text-xs text-ink-700/70 dark:text-white/60">
            Click on any available table to reserve your exact seat in the restaurant.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-ink-700 dark:text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-emerald-500 border border-emerald-600 shadow-xs" />
            Available
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-brand border border-brand-600 shadow-xs ring-2 ring-brand/30" />
            Selected
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400/60 dark:bg-rose-500/40 border border-rose-500/50" />
            Occupied
          </span>
        </div>
      </div>

      {/* Zone View Switcher Pills */}
      <div className="mt-4 flex flex-wrap gap-1.5 pb-2">
        <button
          type="button"
          onClick={() => setActiveFilter("ALL")}
          className={`rounded-full px-3 py-1 text-xs font-bold transition ${
            activeFilter === "ALL"
              ? "bg-brand text-white shadow-xs"
              : "border border-ink/10 bg-white text-ink-700 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          }`}
        >
          All Floor ({RESTAURANT_TABLES.length} Tables)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("Outdoor Garden Patio")}
          className={`rounded-full px-3 py-1 text-xs font-bold transition flex items-center gap-1 ${
            activeFilter === "Outdoor Garden Patio"
              ? "bg-brand text-white shadow-xs"
              : "border border-ink/10 bg-white text-ink-700 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          }`}
        >
          <i className="ri-leaf-line" /> Garden Patio
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("Romantic Window Corner")}
          className={`rounded-full px-3 py-1 text-xs font-bold transition flex items-center gap-1 ${
            activeFilter === "Romantic Window Corner"
              ? "bg-brand text-white shadow-xs"
              : "border border-ink/10 bg-white text-ink-700 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          }`}
        >
          <i className="ri-heart-line" /> Window Corner
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("Indoor Grand Dining")}
          className={`rounded-full px-3 py-1 text-xs font-bold transition flex items-center gap-1 ${
            activeFilter === "Indoor Grand Dining"
              ? "bg-brand text-white shadow-xs"
              : "border border-ink/10 bg-white text-ink-700 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          }`}
        >
          <i className="ri-hotel-line" /> Grand Dining
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("Private VIP Lounge")}
          className={`rounded-full px-3 py-1 text-xs font-bold transition flex items-center gap-1 ${
            activeFilter === "Private VIP Lounge"
              ? "bg-brand text-white shadow-xs"
              : "border border-ink/10 bg-white text-ink-700 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          }`}
        >
          <i className="ri-vip-crown-line" /> VIP Lounge
        </button>
      </div>

      {/* Restaurant Architecture Map Grid */}
      <div className="relative mt-3 overflow-hidden rounded-2xl border border-ink/10 bg-white/70 p-4 dark:border-white/10 dark:bg-[#181614] backdrop-blur-xs">
        
        {/* Landmarks Banner */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-ink/5 pb-2 dark:border-white/5 text-[11px] text-ink-700/60 dark:text-white/40">
          <span className="flex items-center gap-1">
            <i className="ri-door-open-line text-brand" /> Entrance &amp; Host Stand
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-mic-line text-purple-400" /> Live Acoustic Stage
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-restaurant-line text-amber-500" /> Open Show Kitchen &amp; Bar
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-sun-line text-emerald-500" /> Glass Panoramic Windows
          </span>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5">
          {displayedTables.map((table) => {
            const status = getTableStatus(table);
            const isSelected = status === "selected";
            const isOccupied = status === "occupied";
            const isCapacityFit = table.capacity >= partySize;

            return (
              <div
                key={table.id}
                onMouseEnter={() => setHoveredTable(table)}
                onMouseLeave={() => setHoveredTable(null)}
                onClick={() => {
                  if (!isOccupied) {
                    onSelectTable(table);
                  }
                }}
                className={`relative flex flex-col justify-between rounded-2xl p-3.5 transition-all select-none ${
                  isOccupied
                    ? "cursor-not-allowed opacity-50 bg-rose-50/50 border border-rose-200/50 dark:bg-rose-950/10 dark:border-rose-900/20"
                    : isSelected
                    ? "cursor-pointer bg-brand/10 border-2 border-brand shadow-lg ring-4 ring-brand/20 dark:bg-brand/20 dark:border-brand-400"
                    : "cursor-pointer bg-white border border-ink/10 hover:border-emerald-500 hover:shadow-md dark:bg-[#201d1a] dark:border-white/10 dark:hover:border-emerald-400"
                }`}
              >
                {/* Table Top Header */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-mono font-bold ${
                        isSelected
                          ? "bg-brand text-white shadow-xs"
                          : isOccupied
                          ? "bg-rose-500/20 text-rose-600 dark:text-rose-300"
                          : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      {table.number}
                    </span>
                    <span className="text-xs font-bold text-ink dark:text-white truncate">
                      {table.id}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  {isSelected ? (
                    <span className="flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[9px] font-extrabold text-white">
                      <i className="ri-check-line" /> Chosen
                    </span>
                  ) : isOccupied ? (
                    <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[9px] font-bold text-rose-600 dark:text-rose-400">
                      Booked
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-400">
                      Open
                    </span>
                  )}
                </div>

                {/* Simulated 2D Table Architecture Graphic */}
                <div className="my-3 flex items-center justify-center">
                  <div
                    className={`relative flex items-center justify-center rounded-xl p-2 transition ${
                      isSelected
                        ? "bg-brand text-white"
                        : isOccupied
                        ? "bg-ink/10 text-ink/40 dark:bg-white/10 dark:text-white/40"
                        : "bg-ink/5 text-ink-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-white/10 dark:text-white/80 dark:hover:bg-emerald-950/20"
                    } ${table.capacity >= 8 ? "w-28 h-12" : table.capacity >= 6 ? "w-24 h-11" : "w-16 h-11"}`}
                  >
                    {/* Chair Dots Graphic */}
                    <span className="absolute -top-1.5 flex gap-1.5">
                      {Array.from({ length: Math.ceil(table.capacity / 2) }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-2.5 rounded-xs ${
                            isSelected ? "bg-amber-300" : isOccupied ? "bg-rose-300 dark:bg-rose-800" : "bg-emerald-400 dark:bg-emerald-600"
                          }`}
                        />
                      ))}
                    </span>

                    <span className="text-[11px] font-bold tracking-tight">
                      {table.type.split(" ")[0]}
                    </span>

                    <span className="absolute -bottom-1.5 flex gap-1.5">
                      {Array.from({ length: Math.floor(table.capacity / 2) }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-2.5 rounded-xs ${
                            isSelected ? "bg-amber-300" : isOccupied ? "bg-rose-300 dark:bg-rose-800" : "bg-emerald-400 dark:bg-emerald-600"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>

                {/* Table Footer Specs */}
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      !isCapacityFit && !isOccupied
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-ink-700/80 dark:text-white/70"
                    }`}
                  >
                    <i className="ri-user-line" /> {table.capacity} Seats
                  </span>
                  <span className="text-[10px] text-ink-700/50 dark:text-white/40 truncate max-w-21.25">
                    {table.view.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover / Selected Live Info Bar */}
        {(hoveredTable || selectedTableId) && (
          <div className="mt-4 rounded-xl border border-brand/20 bg-brand/5 p-3 dark:border-brand-400/20 dark:bg-brand/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            {(() => {
              const activeTable = hoveredTable || RESTAURANT_TABLES.find((t) => t.id === selectedTableId);
              if (!activeTable) return null;
              const isFit = activeTable.capacity >= partySize;

              return (
                <>
                  <div className="flex items-center gap-2.5 text-xs text-ink dark:text-white">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white font-mono font-bold text-sm">
                      {activeTable.number}
                    </span>
                    <div>
                      <strong className="block font-bold">
                        {activeTable.label} &bull; {activeTable.zone}
                      </strong>
                      <span className="text-ink-700/70 dark:text-white/60 text-[11px]">
                        ✨ View: {activeTable.view} | Capacity: Up to {activeTable.capacity} Guests
                      </span>
                    </div>
                  </div>

                  {!isFit && (
                    <span className="rounded-lg bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                      ⚠️ Note: Your party has {partySize} guests.
                    </span>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableFloorPlan;
