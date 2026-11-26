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
  const isDark = mounted && theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <svg
        aria-hidden="true"
        className="theme-toggle-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="3.75" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        ) : (
          <path d="M20.2 15.1A8.6 8.6 0 0 1 8.9 3.8 8.6 8.6 0 1 0 20.2 15.1Z" />
        )}
      </svg>
    </button>
  );
};

export default ThemeProvider;
