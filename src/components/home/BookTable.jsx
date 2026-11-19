"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const inputClass =
  "w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-brand-300 focus:bg-white/15 dark:bg-black/25 dark:border-white/15";
const labelClass = "mb-2 block text-sm font-semibold text-white/90";

export const BookTable = () => {
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    people: "2",
    date: "",
    time: "19:00",
    name: "",
    email: "",
    phone: "",
  });

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;
    setDone(true);
  };

  return (
    <section id="book" className="reservation-section section pt-24 pb-20 md:pt-32 md:pb-28 transition-colors duration-300 dark:bg-[#0f0e0d]">
      <Container>
        <div className="reservation-panel relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#1e1c1a] via-[#171614] to-[#402d17] px-6 py-14 md:px-12 border border-white/10 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_12%_20%,#fff_0,transparent_35%),radial-gradient(circle_at_88%_80%,#fff_0,transparent_30%)]" />

          <div className="relative z-10">
            <div className="mb-8 flex justify-center">
              <SectionTitle eyebrow="Reservation" title="Book A Table" light />
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
                  <a href="/dashboard" className="btn-dark">
                    View in My Dashboard
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className={labelClass} htmlFor="people">
                    Guests / Party Size *
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
                    Reservation Date *
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
                    Reservation Time *
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
                    Full Name *
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
                    Email Address *
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

                <div className="flex items-end">
                  <button type="submit" className="btn-brand w-full py-3.5! text-base! shadow-lg">
                    Confirm Reservation <i className="ri-arrow-right-line" />
                  </button>
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
