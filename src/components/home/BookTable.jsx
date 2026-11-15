"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-brand focus:bg-white/15";
const labelClass = "mb-2 block text-sm font-semibold text-white";

export const BookTable = () => {
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <section id="book" className="section pt-0">
      <Container>
        <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-ink via-ink-800 to-brand-900 px-6 py-14 md:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_12%_20%,#fff_0,transparent_35%),radial-gradient(circle_at_88%_80%,#fff_0,transparent_30%)]" />

          <div className="relative z-10">
            <div className="mb-8 flex justify-center">
              <SectionTitle eyebrow="Reservation" title="Book A Table" light />
            </div>

            {done ? (
              <div className="mx-auto max-w-xl rounded-3xl bg-white/10 p-8 text-center text-white ring-1 ring-white/15">
                <i className="ri-checkbox-circle-fill text-5xl text-emerald-400" />
                <h4 className="mt-4 font-display text-xl font-bold">Your table is booked!</h4>
                <p className="mt-2 text-sm text-white/70">
                  Thank you — we&apos;ve received your reservation request and will confirm shortly.
                </p>
                <button type="button" onClick={() => setDone(false)} className="btn-brand mt-6">
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-3">
                <div>
                  <label className={labelClass} htmlFor="people">
                    How Many People
                  </label>
                  <select id="people" name="people" className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select People
                    </option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="text-ink">
                        {n} {n === 1 ? "Person" : "People"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="date">
                    Select Booking Date
                  </label>
                  <input id="date" name="date" type="date" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="time">
                    Select Booking Time
                  </label>
                  <input id="time" name="time" type="time" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>

                <div className="flex items-end">
                  <button type="submit" className="btn-brand w-full py-3.5! text-base!">
                    Book A Table <i className="ri-arrow-right-line" />
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
