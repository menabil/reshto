"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const t = useCallback((key, fallback = "") => fallback || key, []);

  const formatPrice = useCallback((amount) => {
    if (amount === undefined || amount === null) return "";

    const value =
      typeof amount === "number"
        ? amount
        : parseFloat(String(amount).replace(/[^0-9.-]+/g, ""));

    return Number.isNaN(value) ? String(amount) : `$${value.toFixed(2)}`;
  }, []);

  const value = useMemo(() => ({ t, formatPrice }), [t, formatPrice]);

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
