"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { TRANSLATIONS } from "@/constants/translations";

const LanguageContext = createContext(null);

const BDT_RATE = 120; // 1 USD = 120 BDT

const BENGALI_DIGITS = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState("en"); // "en" | "bn"
  const [currency, setCurrencyState] = useState("USD"); // "USD" | "BDT"
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const savedLang = localStorage.getItem("reshto-lang");
      if (savedLang === "bn" || savedLang === "en") {
        setLanguageState(savedLang);
        setCurrencyState(savedLang === "bn" ? "BDT" : "USD");
      }
    } catch {
      // ignore storage errors
    } finally {
      setIsLoaded(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setLanguage = useCallback((lang) => {
    if (lang !== "en" && lang !== "bn") return;
    setLanguageState(lang);
    setCurrencyState(lang === "bn" ? "BDT" : "USD");
    try {
      localStorage.setItem("reshto-lang", lang);
    } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    const next = language === "en" ? "bn" : "en";
    setLanguage(next);
  }, [language, setLanguage]);

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

  const toBengaliNumber = useCallback((numStr) => {
    return String(numStr).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
  }, []);

  // Translation helper function
  const t = useCallback(
    (key, fallback = "") => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
      if (dict && dict[key] !== undefined) {
        return dict[key];
      }
      return fallback || key;
    },
    [language]
  );

  // Price formatter helper
  const formatPrice = useCallback(
    (amount) => {
      if (amount === undefined || amount === null) return "";
      
      let num = typeof amount === "number" ? amount : parseFloat(String(amount).replace(/[^0-9.-]+/g, ""));
      if (isNaN(num)) return String(amount);

      if (currency === "BDT") {
        const bdtVal = Math.round(num * BDT_RATE);
        const formatted = bdtVal.toLocaleString("en-US");
        if (language === "bn") {
          return `৳${toBengaliNumber(formatted)}`;
        }
        return `৳${formatted}`;
      }

      return `$${num.toFixed(2)}`;
    },
    [currency, language, toBengaliNumber]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      currency,
      setCurrency,
      toggleCurrency,
      formatPrice,
      toBengaliNumber,
      t,
      isBangla: language === "bn",
      isLoaded,
    }),
    [language, setLanguage, toggleLanguage, currency, setCurrency, toggleCurrency, formatPrice, toBengaliNumber, t, isLoaded]
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
