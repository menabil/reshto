"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const inputClass =
  "w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-brand-300 focus:bg-white/15 dark:bg-black/25 dark:border-white/15";
const labelClass = "mb-2 block text-sm font-semibold text-white/90";

export const BookTable = () => {
  const { addReservation } = useStore();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    people: "2",
    date: "",
    time: "19:30",
    name: "",
    email: "",
    phone: "",
    seatingZone: "Outdoor Garden Patio",
    occasion: "Casual Dining",
    notes: "",
  });

  const todayStr = "2026-01-01"; // or fallback

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;

    addReservation({
      guestName: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: Number(formData.people),
      date: formData.date,
      time: formData.time,
      seatingZone: formData.seatingZone,
      occasion: formData.occasion,
      decorationNotes: formData.notes,
      table: `Table ${Math.floor(Math.random() * 10) + 1} (${formData.seatingZone})`,
      status: "Confirmed",
    });

    setDone(true);
  };

  return (
    <section id="book" className="reservation-section section pt-24 pb-20 md:pt-32 md:pb-28 transition-colors duration-300 dark:bg-[#0f0e0d]">
      <Container>
        <div className="reservation-panel relative overflow-hidden rounded-4xl bg-linear-to-br from-[#1e1c1a] via-[#171614] to-[#402d17] px-6 py-14 md:px-12 border border-white/10 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_12%_20%,#fff_0,transparent_35%),radial-gradient(circle_at_88%_80%,#fff_0,transparent_30%)]" />

          <div className="relative z-10">
            <div className="mb-8 flex justify-center">
              <SectionTitle
                eyebrow={t("nav.reservation", "Reservation")}
                title={t("hero.reserveTable", "Book A Table")}
                light
              />
            </div>

            {done ? (
              <div className="mx-auto max-w-xl rounded-3xl bg-white/10 p-8 text-center text-white ring-1 ring-white/15 backdrop-blur-md">
                <i className="ri-checkbox-circle-fill text-5xl text-emerald-400" />
                <h4 className="mt-4 font-display text-2xl font-bold">Your Table is Reserved!</h4>
                <p className="mt-2 text-sm text-white/80">
                  Thank you, <strong>{formData.name}</strong>! We&apos;ve reserved a table for{" "}
                  <strong>
                    {formData.people} {Number(formData.people) === 1 ? "person" : "people"}
                  </strong>{" "}
                  on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setDone(false);
                      setFormData({
                        people: "2",
                        date: "",
                        time: "19:00",
                        name: "",
                        email: "",
                        phone: "",
                      });
                    }}
                    className="btn-brand"
                  >
                    Book Another Table
                  </button>
                  <Link href="/dashboard" className="btn-dark">
                    View in My Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className={labelClass} htmlFor="people">
                    {t("res.guests", "Guests / Party Size *")}
                  </label>
                  <select
                    id="people"
                    name="people"
                    className={inputClass}
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    required
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="text-ink">
                        {n} {n === 1 ? "Person (Solo Table)" : n === 2 ? "People (Couple Table)" : `People (Group Table)`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="date">
                    {t("res.date", "Reservation Date *")}
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="time">
                    {t("res.time", "Reservation Time *")}
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="name">
                    {t("checkout.name", "Full Name *")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Alex Rahman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    {t("checkout.email", "Email Address *")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="seatingZone">
                    {t("res.step1", "Seating Layout Zone *")}
                  </label>
                  <select
                    id="seatingZone"
                    name="seatingZone"
                    className={inputClass}
                    value={formData.seatingZone}
                    onChange={(e) => setFormData({ ...formData, seatingZone: e.target.value })}
                  >
                    <option value="Outdoor Garden Patio" className="text-ink">🌿 {t("res.zonePatio", "Outdoor Garden Patio")}</option>
                    <option value="Romantic Window Corner" className="text-ink">🪟 {t("res.zoneWindow", "Romantic Window Corner")}</option>
                    <option value="Indoor Grand Dining" className="text-ink">🏛️ {t("res.zoneIndoor", "Indoor Grand Dining")}</option>
                    <option value="Private VIP Lounge" className="text-ink">👑 {t("res.zoneVip", "Private VIP Lounge")}</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="occasion">
                    {t("res.occasion", "Special Occasion")}
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    className={inputClass}
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  >
                    <option value="Casual Dining" className="text-ink">🍽️ Casual Dining / Regular</option>
                    <option value="Birthday Celebration" className="text-ink">🎂 Birthday Party</option>
                    <option value="Anniversary" className="text-ink">💍 Anniversary / Date Night</option>
                    <option value="Business Dinner" className="text-ink">💼 Corporate &amp; Business Lunch</option>
                    <option value="Family Gathering" className="text-ink">👨‍👩‍👧‍👦 Family Celebration</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button type="submit" className="btn-brand w-full py-3.5! text-base! shadow-lg">
                    {t("res.confirmBtn", "Confirm Reservation")} <i className="ri-arrow-right-line" />
                  </button>
                </div>

                <div className="md:col-span-2 lg:col-span-3 flex justify-center pt-1">
                  <Link
                    href="/reservation"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300 hover:text-white transition"
                  >
                    <i className="ri-map-2-line text-sm" /> Want to choose your exact seat? Explore our 2D Restaurant Floor Plan &rarr;
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookTable;
