"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const CurrencyContext = createContext(null);

const BDT_RATE = 120; // 1 USD = 120 BDT

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState("USD"); // "USD" | "BDT"
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const saved = localStorage.getItem("reshto-currency");
      if (saved === "USD" || saved === "BDT") {
        setCurrencyState(saved);
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

  const formatPrice = useCallback(
    (amount) => {
      if (amount === undefined || amount === null) return "";

      let num = typeof amount === "number" ? amount : parseFloat(String(amount).replace(/[^0-9.-]+/g, ""));
      if (isNaN(num)) return String(amount);

      if (currency === "BDT") {
        const bdtVal = Math.round(num * BDT_RATE);
        return `৳${bdtVal.toLocaleString("en-US")}`;
      }

      return `$${num.toFixed(2)}`;
    },
    [currency]
  );

  // Backward compatibility translation fallback
  const t = useCallback((key, fallback = "") => {
    return fallback || key;
  }, []);

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
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

// Aliases for seamless backward compatibility
export const useLanguage = useCurrency;
export const LanguageProvider = CurrencyProvider;
export default CurrencyContext;
