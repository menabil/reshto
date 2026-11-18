"use client";

import {
  createContext,
  useContext,
  useEffect,
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

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = localStorage.getItem("reshto-theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    if (
      !storedTheme &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  } catch {
    return "light";
  }

  return "light";
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getClientMountSnapshot,
    getServerMountSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme) => {
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
