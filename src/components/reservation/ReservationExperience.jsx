"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { sendBookingNotification } from "@/lib/emailService";
import { TableFloorPlan } from "@/components/reservation/TableFloorPlan";
import { RESTAURANT_TABLES } from "@/constants/tableData";

const SEATING_ZONES = [
  {
    id: "Outdoor Garden Patio",
    name: "Outdoor Garden Patio",
    badge: "Al Fresco",
    icon: "ri-leaf-line",
    desc: "Dining under strings of warm fairy lights with garden view & fresh evening breeze.",
    popular: true,
  },
  {
    id: "Romantic Window Corner",
    name: "Romantic Window Corner",
    badge: "Intimate",
    icon: "ri-heart-line",
    desc: "Cozy corner table overlooking the scenic boulevard, ideal for dates & conversations.",
    popular: false,
  },
  {
    id: "Indoor Grand Dining",
    name: "Indoor Grand Dining",
    badge: "Classic",
    icon: "ri-hotel-line",
    desc: "Vibrant hall ambiance, live acoustic melodies, and elegant spacious tables.",
    popular: false,
  },
  {
    id: "Private VIP Lounge",
    name: "Private VIP Lounge",
    badge: "Exclusive",
    icon: "ri-vip-crown-line",
    desc: "Secluded velvet booth with personalized butler service and supreme privacy.",
    popular: false,
  },
];

const OCCASIONS = [
  { id: "Casual Dining", label: "Casual Dining", icon: "ri-restaurant-2-line" },
  { id: "Birthday Celebration", label: "Birthday Party", icon: "ri-cake-3-line" },
  { id: "Anniversary", label: "Anniversary / Date", icon: "ri-hearts-line" },
  { id: "Business Dinner", label: "Business Meeting", icon: "ri-briefcase-4-line" },
  { id: "Family Gathering", label: "Family Reunion", icon: "ri-group-line" },
];

const ADDONS = [
  { id: "rose_petals", label: "Fresh Rose Table Decor & Petals", icon: "ri-flower-line" },
  { id: "surprise_cake", label: "Complimentary Chef's Cake Platter", icon: "ri-cake-2-line" },
  { id: "candlelight", label: "Ambient Romantic Candlelight Setup", icon: "ri-fire-line" },
  { id: "sparkling_cider", label: "Chilled Sparkling Celebration Cider", icon: "ri-goblet-line" },
];

const POPULAR_TIME_SLOTS = [
  "12:30 PM",
  "01:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
];

export const ReservationExperience = () => {
  const { addReservation, reservations } = useStore();
  const { user } = useAuth();

  const [seatingZone, setSeatingZone] = useState("Outdoor Garden Patio");
  const [selectedTableId, setSelectedTableId] = useState("T-01");
  const [viewMode, setViewMode] = useState("map"); // "map" | "cards"
  const [occasion, setOccasion] = useState("Casual Dining");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07:30 PM");
  const [decorationNotes, setDecorationNotes] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "Tahmid Hassan",
    phone: user?.phone || "+880 1711-234567",
    email: user?.email || "tahmid@example.com",
  });

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  // Sync user info if logged in
  useEffect(() => {
    if (user) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
      }));
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [user]);

  // Extract booked tables from existing reservations
  const bookedTableIds = (reservations || [])
    .filter((r) => r.status !== "Cancelled" && (r.date === date || !date))
    .map((r) => {
      if (r.tableId) return r.tableId;
      const match = r.table?.match(/(T-\d+|VIP-\d+)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  const handleSelectTable = (table) => {
    setSelectedTableId(table.id);
    setSeatingZone(table.zone);
    if (table.capacity && Number(guests) > table.capacity) {
      setGuests(String(table.capacity));
    }
  };

  const handleSelectZone = (zoneId) => {
    setSeatingZone(zoneId);
    const firstTable = RESTAURANT_TABLES.find(
      (t) => t.zone === zoneId && !t.defaultOccupied && !bookedTableIds.includes(t.id)
    );
    if (firstTable) {
      setSelectedTableId(firstTable.id);
    }
  };

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Please provide your contact name and phone number.");
      return;
    }
    if (!date) {
      alert("Please select a reservation date.");
      return;
    }

    const selectedTableObj = RESTAURANT_TABLES.find((t) => t.id === selectedTableId);
    const tableString = selectedTableObj
      ? `${selectedTableObj.label} (${selectedTableObj.id} • ${selectedTableObj.zone})`
      : `Table ${Math.floor(Math.random() * 12) + 1} (${seatingZone})`;

    const resolvedAddonLabels = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean);

    const newRes = addReservation({
      guestName: formData.name,
      phone: formData.phone,
      email: formData.email,
      guests: Number(guests),
      date,
      time,
      seatingZone,
      tableId: selectedTableObj?.id || "T-01",
      tableNumber: selectedTableObj?.number || "01",
      table: tableString,
      occasion,
      addOns: resolvedAddonLabels,
      decorationNotes,
      status: "Confirmed",
    });

    // Zero-backend email notification to restaurant inbox (Task 6.1)
    sendBookingNotification(newRes);

    setConfirmedReservation(newRes);
  };

  // WhatsApp confirmation url
  const getWhatsAppBookingUrl = (res) => {
    const cleanPhone = (siteConfig.contact.phone || "+1 415-555-1234").replace(/[^\d]/g, "");
    const msg = [
      `🏛️ *TABLE RESERVATION - RESHTO RESTAURANT*`,
      `🔖 *Booking ID:* ${res.id}`,
      `👤 *Guest Name:* ${res.guestName}`,
      `📞 *Phone:* ${res.phone}`,
      `👥 *Party Size:* ${res.guests} Guests`,
      `📅 *Date & Time:* ${res.date} at ${res.time}`,
      `📍 *Seating Zone:* ${res.seatingZone}`,
      `🪑 *Assigned Table:* ${res.table}`,
      `🎉 *Occasion:* ${res.occasion}`,
      res.addOns?.length ? `✨ *Add-ons:* ${res.addOns.join(", ")}` : null,
      res.decorationNotes ? `📝 *Special Request:* ${res.decorationNotes}` : null,
      `----------------------------------------`,
      `Please confirm my reservation. Thank you!`,
    ].filter(Boolean).join("\n");

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Subpage Hero */}
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-calendar-event-line" /> Fine Dining Experience
          </span>
          <h1>
            Reserve Your <span>Exclusive</span> Table.
          </h1>
          <p>
            Choose your preferred dining zone, customize special celebrations, and enjoy unforgettable hospitality.
          </p>
        </Container>
      </section>

      {/* Main Reservation Section */}
      <section className="py-12 md:py-20 bg-[#faf8f5] dark:bg-[#0f0e0d] transition-colors duration-300">
        <Container className="max-w-4xl">
          {confirmedReservation ? (
            /* Celebration Success Card */
            <div className="overflow-hidden rounded-4xl border border-ink/10 bg-white p-8 text-center shadow-2xl dark:border-white/10 dark:bg-[#1a1816] md:p-12 animate-in fade-in">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-emerald-500/10 text-4xl text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <i className="ri-checkbox-circle-fill" />
              </span>

              <span className="mt-4 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Reservation Confirmed &bull; Table Reserved
              </span>

              <h2 className="mt-3 font-display text-3xl font-black text-ink dark:text-white md:text-4xl">
                We Can&apos;t Wait to Host You!
              </h2>

              <p className="mt-2 text-sm text-ink-700 dark:text-white/60">
                Booking reference <strong className="text-ink dark:text-white font-mono">#{confirmedReservation.id}</strong> has been confirmed for <strong>{confirmedReservation.guestName}</strong>.
              </p>

              {/* Reservation Details Card */}
              <div className="mt-8 rounded-3xl bg-[#faf8f5] p-6 text-left dark:bg-[#22201d] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-ink/10 pb-4 dark:border-white/10 text-xs">
                  <div>
                    <span className="text-ink-700 dark:text-white/50 block">Guests</span>
                    <strong className="text-ink dark:text-white text-sm font-bold">
                      {confirmedReservation.guests} People
                    </strong>
                  </div>
                  <div>
                    <span className="text-ink-700 dark:text-white/50 block">Date &amp; Time</span>
                    <strong className="text-ink dark:text-white text-sm font-bold">
                      {confirmedReservation.date} &bull; {confirmedReservation.time}
                    </strong>
                  </div>
                  <div>
                    <span className="text-ink-700 dark:text-white/50 block">Seating Zone</span>
                    <strong className="text-brand dark:text-brand-300 text-sm font-bold">
                      {confirmedReservation.seatingZone}
                    </strong>
                  </div>
                  <div>
                    <span className="text-ink-700 dark:text-white/50 block">Assigned Table</span>
                    <strong className="text-ink dark:text-white text-sm font-bold">
                      {confirmedReservation.table}
                    </strong>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-ink-700 dark:text-white/70">
                    <strong>Occasion:</strong> {confirmedReservation.occasion}
                  </p>
                  {confirmedReservation.addOns?.length > 0 && (
                    <p className="text-ink-700 dark:text-white/70">
                      <strong>Decorative Add-ons:</strong> {confirmedReservation.addOns.join(", ")}
                    </p>
                  )}
                  {confirmedReservation.decorationNotes && (
                    <p className="italic text-amber-700 dark:text-amber-300">
                      <strong>Special Request:</strong> &ldquo;{confirmedReservation.decorationNotes}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={getWhatsAppBookingUrl(confirmedReservation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-xs font-bold text-white transition shadow-sm"
                >
                  <i className="ri-whatsapp-line text-base" /> Send to WhatsApp
                </a>

                <Link
                  href="/dashboard"
                  className="btn-brand px-6 py-3 text-xs! font-bold"
                >
                  View in My Dashboard &rarr;
                </Link>

                <button
                  type="button"
                  onClick={() => setConfirmedReservation(null)}
                  className="rounded-xl border border-ink/15 bg-white px-5 py-3 text-xs font-bold text-ink hover:bg-ink/5 dark:border-white/15 dark:bg-[#1a1816] dark:text-white transition"
                >
                  Reserve Another Table
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* STEP 1: SEATING ZONE & INTERACTIVE TABLE SELECTION */}
              <div className="rounded-4xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-ink/10 pb-4 dark:border-white/10">
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink dark:text-white flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">1</span>
                      Select Seating Zone &amp; Interactive Table
                    </h2>
                    <p className="mt-1 text-xs text-ink-700 dark:text-white/60">
                      Pick your exact table on the restaurant map or choose by dining zone.
                    </p>
                  </div>

                  {/* View Mode Switcher */}
                  <div className="flex items-center gap-1 rounded-2xl bg-ink/5 p-1 dark:bg-white/10 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setViewMode("map")}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                        viewMode === "map"
                          ? "bg-brand text-white shadow-xs"
                          : "text-ink-700 hover:text-ink dark:text-white/70 dark:hover:text-white"
                      }`}
                    >
                      <i className="ri-map-2-line" /> 2D Floor Plan
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("cards")}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                        viewMode === "cards"
                          ? "bg-brand text-white shadow-xs"
                          : "text-ink-700 hover:text-ink dark:text-white/70 dark:hover:text-white"
                      }`}
                    >
                      <i className="ri-layout-grid-line" /> Zone Cards
                    </button>
                  </div>
                </div>

                {/* View 1: 2D Floor Plan */}
                {viewMode === "map" ? (
                  <div className="mt-6">
                    <TableFloorPlan
                      selectedTableId={selectedTableId}
                      selectedZone={seatingZone}
                      onSelectTable={handleSelectTable}
                      guests={guests}
                      date={date}
                      time={time}
                      bookedTableIds={bookedTableIds}
                    />
                  </div>
                ) : (
                  /* View 2: Zone Overview Cards */
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SEATING_ZONES.map((zone) => {
                      const isSelected = seatingZone === zone.id;
                      return (
                        <div
                          key={zone.id}
                          onClick={() => handleSelectZone(zone.id)}
                          className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border p-5 transition-all ${
                            isSelected
                              ? "border-brand bg-brand/5 shadow-md dark:border-brand-300 dark:bg-brand/10"
                              : "border-ink/10 hover:border-brand/40 dark:border-white/10 dark:hover:border-white/30"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span
                              className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl transition ${
                                isSelected
                                  ? "bg-brand text-white shadow-sm"
                                  : "bg-ink/5 text-ink dark:bg-white/10 dark:text-white"
                              }`}
                            >
                              <i className={zone.icon} />
                            </span>

                            <div className="flex items-center gap-1.5">
                              <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-[10px] font-bold text-ink-700 dark:bg-white/10 dark:text-white/70">
                                {zone.badge}
                              </span>
                              {isSelected && (
                                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-[10px] text-white">
                                  <i className="ri-check-line" />
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="font-display text-base font-bold text-ink dark:text-white">
                              {zone.name}
                            </h3>
                            <p className="mt-1 text-xs leading-relaxed text-ink-700/80 dark:text-white/60">
                              {zone.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Selected Table Summary Banner */}
                {(() => {
                  const selectedTableObj = RESTAURANT_TABLES.find((t) => t.id === selectedTableId);
                  return (
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-brand/5 border border-brand/20 p-4 dark:bg-brand/10 dark:border-brand-400/20">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white font-mono font-bold text-sm shadow-xs">
                          {selectedTableObj?.number || "01"}
                        </span>
                        <div>
                          <span className="text-[10px] font-extrabold text-brand uppercase tracking-wider block">
                            Your Selected Reservation Seat:
                          </span>
                          <strong className="text-sm font-bold text-ink dark:text-white">
                            {selectedTableObj?.label || `Table (${seatingZone})`}
                          </strong>
                          <span className="text-xs text-ink-700/70 dark:text-white/60 ml-2">
                            ({selectedTableObj?.type || "Standard Table"} &bull; {selectedTableObj?.capacity || 2} Seats &bull; {selectedTableObj?.view || seatingZone})
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setViewMode(viewMode === "map" ? "cards" : "map")}
                        className="text-xs font-bold text-brand hover:underline self-start sm:self-auto flex items-center gap-1"
                      >
                        {viewMode === "map" ? "Switch to Zone Cards" : "View on Floor Map"}
                        <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* STEP 2: PARTY SIZE, DATE & TIME */}
              <div className="rounded-4xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                <div className="border-b border-ink/10 pb-4 dark:border-white/10">
                  <h2 className="font-display text-xl font-bold text-ink dark:text-white flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">2</span>
                    Date, Time &amp; Party Size
                  </h2>
                  <p className="mt-1 text-xs text-ink-700 dark:text-white/60">
                    Tell us when you are arriving and how many guests will be joining.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Guests */}
                  <div>
                    <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                      Party Size / Guests *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded-2xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                    >
                      <option value="1" className="text-ink">1 Person (Solo Table)</option>
                      <option value="2" className="text-ink">2 People (Couple Table)</option>
                      <option value="4" className="text-ink">4 People (Family Table)</option>
                      <option value="6" className="text-ink">6 People (Medium Group)</option>
                      <option value="8" className="text-ink">8 People (Feast Table)</option>
                      <option value="10" className="text-ink">10 People (Grand Party)</option>
                      <option value="12" className="text-ink">12+ People (Full Banquet)</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-2xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                      Reservation Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 07:30 PM"
                      className="w-full rounded-2xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                    />
                  </div>
                </div>

                {/* Popular Time Slot Pills */}
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-ink-700/70 dark:text-white/50 block mb-2">
                    Popular Evening Dining Slots:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                          time === slot
                            ? "bg-brand text-white shadow-xs"
                            : "border border-ink/10 bg-ink/5 text-ink-700 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 3: OCCASION & DECORATIVE ADD-ONS (Task 4.2) */}
              <div className="rounded-4xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                <div className="border-b border-ink/10 pb-4 dark:border-white/10">
                  <h2 className="font-display text-xl font-bold text-ink dark:text-white flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">3</span>
                    Special Occasion &amp; Table Decorations
                  </h2>
                  <p className="mt-1 text-xs text-ink-700 dark:text-white/60">
                    Celebrating something special? Let us know so our team can prepare complimentary surprises.
                  </p>
                </div>

                {/* Occasion buttons */}
                <div className="mt-6">
                  <label className="text-xs font-bold text-ink dark:text-white block mb-2">
                    What is the occasion?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {OCCASIONS.map((occ) => {
                      const isSelected = occasion === occ.id;
                      return (
                        <button
                          key={occ.id}
                          type="button"
                          onClick={() => setOccasion(occ.id)}
                          className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-center transition ${
                            isSelected
                              ? "border-brand bg-brand/10 text-brand dark:text-brand-300 font-bold shadow-xs"
                              : "border-ink/10 text-ink dark:border-white/10 dark:text-white hover:border-brand/40"
                          }`}
                        >
                          <i className={`${occ.icon} text-xl`} />
                          <span className="text-[11px] font-bold">{occ.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Decorative Add-ons Checkboxes */}
                <div className="mt-6">
                  <label className="text-xs font-bold text-ink dark:text-white block mb-2">
                    Optional Celebration Enhancements:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADDONS.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={`flex items-center gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                            isChecked
                              ? "border-brand bg-brand/5 dark:bg-brand/10 shadow-xs"
                              : "border-ink/10 hover:border-brand/40 dark:border-white/10"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(addon.id)}
                            className="rounded text-brand focus:ring-brand"
                          />
                          <div className="flex items-center gap-2 flex-1">
                            <i className={`${addon.icon} text-lg text-brand dark:text-brand-300`} />
                            <span className="text-xs font-semibold text-ink dark:text-white">
                              {addon.label}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Decoration Note */}
                <div className="mt-6">
                  <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                    Custom Decoration &amp; Kitchen Request Note
                  </label>
                  <textarea
                    rows={3}
                    value={decorationNotes}
                    onChange={(e) => setDecorationNotes(e.target.value)}
                    placeholder="E.g. Write 'Happy 30th Birthday Farhana!' on dessert, prepare baby high chair, or arrange flowers..."
                    className="w-full rounded-2xl border border-ink/15 bg-transparent p-3 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white resize-none"
                  />
                </div>
              </div>

              {/* STEP 4: GUEST CONTACT INFO */}
              <div className="rounded-4xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm dark:border-white/10 dark:bg-[#1a1816]">
                <div className="border-b border-ink/10 pb-4 dark:border-white/10">
                  <h2 className="font-display text-xl font-bold text-ink dark:text-white flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-xs font-bold">4</span>
                    Primary Guest Contact
                  </h2>
                  <p className="mt-1 text-xs text-ink-700 dark:text-white/60">
                    We will send instant SMS/WhatsApp booking confirmation to this contact.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Tahmid Hassan"
                      className="w-full rounded-xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +880 1711-234567"
                      className="w-full rounded-xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-ink dark:text-white block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tahmid@example.com"
                      className="w-full rounded-xl border border-ink/15 bg-transparent px-3.5 py-2.5 text-xs text-ink outline-none focus:border-brand dark:border-white/15 dark:text-white"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="btn-brand w-full py-4 text-sm! font-bold shadow-xl flex items-center justify-center gap-2"
                  >
                    <i className="ri-calendar-check-line text-lg" /> Confirm &amp; Reserve Table at Reshto
                  </button>
                  <p className="mt-2 text-center text-[11px] text-ink-700/60 dark:text-white/50">
                    No upfront booking fee required. You can modify or cancel anytime from your dashboard.
                  </p>
                </div>
              </div>
            </form>
          )}
        </Container>
      </section>
    </>
  );
};

export default ReservationExperience;
