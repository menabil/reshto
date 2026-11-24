"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";

export const CurrencySwitcher = ({ mobile = false }) => {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (mobile) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-xs">
        <div className="flex items-center gap-2 text-white/80">
          <i className="ri-exchange-dollar-line text-base text-brand-300" />
          <span className="font-semibold">Currency:</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`rounded-xl px-3 py-1 font-mono text-xs font-bold transition ${
              currency === "USD"
                ? "bg-brand text-white shadow-xs"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            $ USD
          </button>

          <button
            type="button"
            onClick={() => setCurrency("BDT")}
            className={`rounded-xl px-3 py-1 font-mono text-xs font-bold transition ${
              currency === "BDT"
                ? "bg-brand text-white shadow-xs"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            ৳ BDT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 backdrop-blur-xs"
        aria-label="Change currency"
        title="Switch Currency ($ USD / ৳ BDT)"
      >
        <span className="font-mono text-xs text-amber-300 font-extrabold">
          {currency === "USD" ? "$" : "৳"}
        </span>
        <span className="font-bold tracking-wider">{currency}</span>
        <i
          className={`ri-arrow-down-s-line text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-ink/10 bg-[var(--theme-surface)] p-2 text-ink shadow-2xl backdrop-blur-xl dark:border-white/10 z-50 animate-in fade-in zoom-in-95">
          <span className="px-2.5 text-[10px] font-extrabold uppercase tracking-wider text-ink-700/60 dark:text-white/40 block mb-1">
            Select Currency
          </span>

          <button
            type="button"
            onClick={() => {
              setCurrency("USD");
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition ${
              currency === "USD"
                ? "bg-brand/10 text-brand dark:text-brand-300 font-bold"
                : "text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-2 font-mono">
              <strong className="text-sm">$</strong> USD (US Dollar)
            </span>
            {currency === "USD" && <i className="ri-check-line text-sm text-brand" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrency("BDT");
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition ${
              currency === "BDT"
                ? "bg-brand/10 text-brand dark:text-brand-300 font-bold"
                : "text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-2 font-mono">
              <strong className="text-sm">৳</strong> BDT (Taka)
            </span>
            {currency === "BDT" && <i className="ri-check-line text-sm text-brand" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrencySwitcher;
