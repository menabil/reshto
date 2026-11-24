"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const LanguageSwitcher = ({ mobile = false }) => {
  const { currency, setCurrency } = useLanguage();
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
          <i className="ri-money-dollar-circle-line text-base text-brand-300" />
          <span className="font-semibold">Currency:</span>
        </div>

        <button
          type="button"
          onClick={() => setCurrency(currency === "USD" ? "BDT" : "USD")}
          className="rounded-xl bg-brand/20 px-2.5 py-1 font-mono text-xs font-bold text-brand-300 ring-1 ring-brand-300/30"
        >
          {currency === "USD" ? "$ USD" : "৳ BDT"}
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-white/20 backdrop-blur-xs"
        aria-label="Change currency"
        title="Currency"
      >
        <i className="ri-money-dollar-circle-line text-sm text-brand-300" />
        <span className="font-mono text-[11px] text-amber-300 font-bold">
          {currency === "USD" ? "$" : "৳"}
        </span>
        <i className={`ri-arrow-down-s-line text-xs transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-ink/10 bg-[var(--theme-surface)] p-2 text-ink shadow-2xl backdrop-blur-xl dark:border-white/10 z-50 animate-in fade-in zoom-in-95">
          {/* Currency Selection */}
          <div>
            <span className="px-2.5 text-[10px] font-extrabold uppercase tracking-wider text-ink-700/60 dark:text-white/40 block mb-1">
              Currency
            </span>

            <button
              type="button"
              onClick={() => {
                setCurrency("USD");
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-semibold transition ${currency === "USD"
                  ? "bg-brand/10 text-brand dark:text-brand-300 font-bold"
                  : "text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/5"
                }`}
            >
              <span className="flex items-center gap-2 font-mono">
                <strong>$</strong> USD
              </span>
              {currency === "USD" && <i className="ri-check-line text-sm text-brand" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrency("BDT");
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-semibold transition ${currency === "BDT"
                  ? "bg-brand/10 text-brand dark:text-brand-300 font-bold"
                  : "text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/5"
                }`}
            >
              <span className="flex items-center gap-2 font-mono">
                <strong>৳</strong> BDT
              </span>
              {currency === "BDT" && <i className="ri-check-line text-sm text-brand" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
