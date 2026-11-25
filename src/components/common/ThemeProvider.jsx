"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

const subscribeToMount = () => () => {};
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

const getStoredTheme = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme = localStorage.getItem("reshto-theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
  } catch {
    return null;
  }
  return null;
};

const getSystemTheme = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const getInitialTheme = () => getStoredTheme() || getSystemTheme();

const applyTheme = (theme) => {
  const root = document.documentElement;
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);

  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", isDark ? "#0f0e0d" : "#faf8f5");
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);
  const hasExplicitTheme = useRef();
  if (hasExplicitTheme.current === undefined) {
    hasExplicitTheme.current = Boolean(getStoredTheme());
  }
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getClientMountSnapshot,
    getServerMountSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event) => {
      if (hasExplicitTheme.current) {
        return;
      }
      const nextTheme = event.matches ? "dark" : "light";
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };
    const handleStorageChange = (event) => {
      if (event.key !== "reshto-theme") {
        return;
      }
      const nextTheme =
        event.newValue === "dark" || event.newValue === "light"
          ? event.newValue
          : getSystemTheme();
      hasExplicitTheme.current = Boolean(
        event.newValue === "dark" || event.newValue === "light",
      );
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else {
      mediaQuery?.addListener?.(handleSystemThemeChange);
    }
    window.addEventListener("storage", handleStorageChange);

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery?.removeListener?.(handleSystemThemeChange);
      }
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setTheme = (newTheme) => {
    hasExplicitTheme.current = true;
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem("reshto-theme", newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 hover:text-amber-300 dark:border-white/15 dark:bg-white/5 dark:text-amber-300 ${className}`}
      aria-label={
        mounted && theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        mounted && theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <i
        className={`text-lg transition-transform duration-300 ${
          mounted && theme === "dark"
            ? "ri-sun-fill rotate-0"
            : "ri-moon-line -rotate-12"
        }`}
      />
    </button>
  );
};

export default ThemeProvider;
