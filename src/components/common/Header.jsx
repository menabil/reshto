"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";
import { ThemeToggle } from "@/components/common/ThemeProvider";
import { useAuth } from "@/context/AuthContext";

const SECTIONS = ["home", "about", "menu", "book", "chefs", "contact"];

const POPULAR_SEARCHES = [
  "Margherita Pizza",
  "Prime Steak",
  "Salmon",
  "French Toast",
  "Coffee",
  "Tacos",
];

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);

  // Sticky header background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section highlighting on homepage
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Focus search input when search modal opens & handle ESC
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setSearchOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [searchOpen]);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    router.push(`/order?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleQuickSearch = (term) => {
    setSearchOpen(false);
    router.push(`/order?search=${encodeURIComponent(term)}`);
  };

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`site-header transition-all duration-300 ${
          scrolled
            ? "is-scrolled shadow-lg backdrop-blur-md dark:bg-[#0c1612]/95"
            : "bg-transparent"
        }`}
      >
        <Container className="header-inner">
          <Link
            href={isHome ? "#home" : "/#home"}
            className="site-logo"
            aria-label="Reshto home"
          >
            <span className="logo-mark">
              <i className="ri-restaurant-2-fill" />
            </span>
            <span>
              {siteConfig.name}
              <small>FRESH &amp; DELICIOUS</small>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {siteConfig.navLinks.map((link) => {
              const targetId = link.targetId || link.href.replace(/^[/#]+/, "");
              const isActive = isHome && activeSection === targetId;

              return (
                <Link
                  key={link.label}
                  href={isHome ? link.href : `/${link.href}`}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "active font-bold text-brand-300 dark:text-brand-300"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Search Button (Triggers blurred modal) */}
            <button
              type="button"
              className="header-icon"
              aria-label="Open search menu"
              onClick={() => setSearchOpen(true)}
              title="Search menu"
            >
              <i className="ri-search-line" />
            </button>

            {/* User Login & Profile Icon */}
            <div className="relative desktop-action" ref={userMenuRef}>
              {isAuthenticated ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 p-1 pr-2.5 text-white transition hover:bg-white/20"
                    aria-label="User menu"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white uppercase">
                      {user.name ? user.name[0] : "U"}
                    </span>
                    <span className="max-w-[70px] truncate text-xs font-semibold">
                      {user.name.split(" ")[0]}
                    </span>
                    <i className="ri-arrow-down-s-line text-xs" />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen ? (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/15 bg-[#12231d] p-2 text-white shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1813] z-50">
                      <div className="border-b border-white/10 px-3 py-2">
                        <p className="font-bold text-xs truncate">{user.name}</p>
                        <p className="text-[11px] text-white/60 truncate">{user.email}</p>
                        <span className="mt-1 inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                          {user.role === "admin" ? "👑 Admin" : "👤 Customer"}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/10"
                        >
                          <i className="ri-user-smile-line text-sm" /> User Dashboard
                        </Link>
                        {user.role === "admin" ? (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-white/10"
                          >
                            <i className="ri-dashboard-line text-sm" /> Admin Portal
                          </Link>
                        ) : null}
                      </div>

                      <div className="border-t border-white/10 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-white/10"
                        >
                          <i className="ri-logout-box-r-line text-sm" /> Sign Out
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="header-icon"
                  aria-label="Sign in or register"
                  title="Sign In / Register"
                >
                  <i className="ri-user-3-line" />
                </Link>
              )}
            </div>

            {/* Order Now button */}
            <Link
              href="/order"
              className="btn-brand header-order flex items-center gap-1.5"
            >
              Order Now <i className="ri-arrow-right-line" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="header-icon mobile-toggle"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <i className={open ? "ri-close-line" : "ri-menu-line"} />
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {open ? (
          <div className="mobile-nav dark:bg-[#0c1612] dark:border-white/10">
            <Container>
              {siteConfig.navLinks.map((link) => {
                const targetId = link.targetId || link.href.replace(/^[/#]+/, "");
                const isActive = isHome && activeSection === targetId;

                return (
                  <Link
                    key={link.label}
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-brand-300 font-bold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <i className="ri-arrow-right-s-line" />
                  </Link>
                );
              })}

              <div className="my-2 border-t border-white/10 pt-2 flex flex-col gap-1">
                {isAuthenticated ? (
                  <>
                    <div className="px-1 py-1 text-xs text-white/60">
                      Signed in as: <strong className="text-white">{user.name}</strong>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-2 text-sm font-medium text-amber-200"
                    >
                      <span className="flex items-center gap-2">
                        <i className="ri-user-smile-line" /> User Dashboard
                      </span>
                      <i className="ri-arrow-right-s-line" />
                    </Link>
                    {user.role === "admin" ? (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-2 text-sm font-medium text-amber-200"
                      >
                        <span className="flex items-center gap-2">
                          <i className="ri-dashboard-line" /> Admin Portal
                        </span>
                        <i className="ri-arrow-right-s-line" />
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 text-sm font-medium text-rose-400"
                    >
                      <i className="ri-logout-box-r-line" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-2.5 text-sm font-semibold text-amber-300"
                  >
                    <span className="flex items-center gap-2">
                      <i className="ri-user-add-line" /> Sign In / Register
                    </span>
                    <i className="ri-arrow-right-s-line" />
                  </Link>
                )}
              </div>

              <Link
                href="/order"
                onClick={() => setOpen(false)}
                className="mobile-order mt-3"
              >
                Order Now <i className="ri-arrow-right-line" />
              </Link>
            </Container>
          </div>
        ) : null}
      </header>

      {/* SLEEK BLURRED SEARCH MODAL */}
      {searchOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 md:pt-32 bg-black/65 backdrop-blur-md transition-all duration-300"
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#12231d]/90 p-6 text-white shadow-2xl backdrop-blur-2xl dark:bg-[#0a1510]/95 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3">
              <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-300">
                <i className="ri-search-2-line" /> Explore Reshto Menu
              </span>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                aria-label="Close search"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative mt-2">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-brand-300" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pizza, ribeye steak, salmon, salad, desserts..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-12 pr-28 text-base text-white placeholder:text-white/50 outline-none transition focus:border-brand-300 focus:bg-white/15"
              />
              <button
                type="submit"
                className="btn-brand absolute right-2 top-1/2 -translate-y-1/2 py-2! px-4! text-xs!"
              >
                Search
              </button>
            </form>

            {/* Quick Popular Searches */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <span className="block text-xs font-semibold text-white/60 mb-2">
                Popular Craving Suggestions:
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleQuickSearch(term)}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 hover:border-brand-300 hover:bg-white/15 transition-all"
                  >
                    <i className="ri-arrow-right-up-line text-brand-300" /> {term}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-[11px] text-white/40">
              Press <kbd className="rounded bg-white/10 px-1.5 py-0.5">ESC</kbd> to close
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
