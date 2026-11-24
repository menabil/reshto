"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const LanguageContext = createContext(null);

const BDT_RATE = 120; // 1 USD = 120 BDT

export const LanguageProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState("USD"); // "USD" | "BDT"
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const savedCurrency = localStorage.getItem("reshto-currency");
      if (savedCurrency === "USD" || savedCurrency === "BDT") {
        setCurrencyState(savedCurrency);
      }
    } catch {
      // ignore storage errors
    } finally {
      setIsLoaded(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setCurrency = useCallback((cur) => {
    if (cur !== "USD" && cur !== "BDT") return;
    setCurrencyState(cur);
    try {
      localStorage.setItem("reshto-currency", cur);
    } catch {}
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrency(currency === "USD" ? "BDT" : "USD");
  }, [currency, setCurrency]);

  // Price formatter helper
  const formatPrice = useCallback(
    (amount) => {
      if (amount === undefined || amount === null) return "";

      const num = typeof amount === "number" ? amount : parseFloat(String(amount).replace(/[^0-9.-]+/g, ""));
      if (isNaN(num)) return String(amount);

      if (currency === "BDT") {
        const bdtVal = Math.round(num * BDT_RATE);
        return `৳${bdtVal.toLocaleString("en-US")}`;
      }

      return `$${num.toFixed(2)}`;
    },
    [currency]
  );

  // Text helper — language switching removed, always returns the English text
  const t = useCallback((key, fallback = "") => fallback || key, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      toggleCurrency,
      formatPrice,
      t,
      isLoaded,
    }),
    [currency, setCurrency, toggleCurrency, formatPrice, t, isLoaded]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
