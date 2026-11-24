"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";
import { ThemeToggle } from "@/components/common/ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";

export const Header = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, openCart } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  // Sticky header background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <header
        className={`site-header transition-all duration-300 ${
          scrolled
            ? "is-scrolled shadow-lg backdrop-blur-md dark:bg-[#0f0e0d]/95"
            : "bg-transparent"
        }`}
      >
        <Container className="header-inner">
          <Link
            href="/"
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
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
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
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white uppercase dark:text-[#171512]">
                      {user.name ? user.name[0] : "U"}
                    </span>
                    <span className="max-w-[70px] truncate text-xs font-semibold">
                      {user.name.split(" ")[0]}
                    </span>
                    <i className="ri-arrow-down-s-line text-xs" />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen ? (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-ink/10 bg-[var(--theme-surface)] p-2 text-ink shadow-2xl backdrop-blur-xl dark:border-white/10 z-50">
                      <div className="border-b border-ink/10 px-3 py-2 dark:border-white/10">
                        <p className="truncate text-xs font-bold">{user.name}</p>
                        <p className="truncate text-[11px] text-ink-700">{user.email}</p>
                        <span className="mt-1 inline-block rounded-md bg-soft-primary px-2 py-0.5 text-[10px] font-bold text-brand">
                          {user.role === "admin" ? "👑 Admin" : "👤 Customer"}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink hover:bg-soft-primary"
                        >
                          <i className="ri-user-smile-line text-sm" /> User Dashboard
                        </Link>
                        <Link
                          href="/order-tracking"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink hover:bg-soft-primary"
                        >
                          <i className="ri-e-bike-2-line text-sm text-brand" /> Track Order
                        </Link>
                        {user.role === "admin" ? (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-brand hover:bg-soft-primary"
                          >
                            <i className="ri-dashboard-line text-sm" /> Admin Portal
                          </Link>
                        ) : null}
                      </div>

                      <div className="border-t border-ink/10 pt-1 dark:border-white/10">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-white/5"
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

            {/* Order Cart Icon (Triggers Global Cart Drawer) */}
            <button
              type="button"
              onClick={openCart}
              className="header-icon relative"
              aria-label="View Order Cart Drawer"
              title="Your Shopping Cart"
            >
              <i className="ri-shopping-bag-3-line" />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-extrabold text-white animate-pulse">
                  {cartCount}
                </span>
              ) : null}
            </button>

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
          <div className="mobile-nav dark:bg-[#0f0e0d] dark:border-white/10">
            <Container>
              {siteConfig.navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
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
                    <Link
                      href="/order-tracking"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-2 text-sm font-medium text-emerald-300"
                    >
                      <span className="flex items-center gap-2">
                        <i className="ri-e-bike-2-line" /> Track Live Order
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

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openCart();
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 py-3 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  <i className="ri-shopping-bag-3-line" /> Cart ({cartCount})
                </button>
                <Link
                  href="/order"
                  onClick={() => setOpen(false)}
                  className="btn-brand flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs!"
                >
                  Order Now <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Header;
