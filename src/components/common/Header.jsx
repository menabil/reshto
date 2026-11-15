"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";
import { contactInfo } from "@/data/data";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className="hidden border-b border-white/10 bg-ink text-white lg:block">
        <Container className="flex items-center justify-between py-2 text-xs">
          <ul className="flex items-center gap-6">
            {contactInfo.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <i className={`${item.icon} text-brand`} />
                <span className="font-semibold">{item.title}</span>
                <span className="text-white/60">{item.details[0]}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 text-white/70">
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 transition hover:text-white">
              <i className="ri-phone-line text-brand" />
              {siteConfig.contact.phone}
            </a>
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <a href={siteConfig.links.facebook} aria-label="Facebook" className="transition hover:text-brand">
                <i className="ri-facebook-circle-fill" />
              </a>
              <a href={siteConfig.links.twitter} aria-label="Twitter" className="transition hover:text-brand">
                <i className="ri-twitter-fill" />
              </a>
              <a href={siteConfig.links.instagram} aria-label="Instagram" className="transition hover:text-brand">
                <i className="ri-instagram-fill" />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-ink/10 bg-white/95 shadow-soft backdrop-blur"
            : "border-transparent bg-white"
        }`}
      >
        <Container className="flex items-center justify-between gap-4 py-3">
          <a href="#home" className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand text-white">
              <i className="ri-restaurant-2-fill text-xl" />
            </span>
            {siteConfig.name}
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-brand-50 hover:text-brand"
            >
              <i className="ri-search-2-line text-lg" />
            </button>
            <a
              href="#menu"
              aria-label="Favorites"
              className="relative hidden h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-brand-50 hover:text-brand sm:grid"
            >
              <i className="ri-heart-line text-lg" />
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                2
              </span>
            </a>
            <a
              href="#book"
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-brand-50 hover:text-brand"
            >
              <i className="ri-shopping-cart-line text-lg" />
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                3
              </span>
            </a>
            <a href="#book" className="btn-brand ml-1 hidden px-5! py-2.5! sm:inline-flex">
              Login
            </a>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-brand-50 hover:text-brand lg:hidden"
            >
              <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-xl`} />
            </button>
          </div>
        </Container>

        {/* Search */}
        {searchOpen ? (
          <Container className="pb-3">
            <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2">
              <i className="ri-search-2-line text-brand" />
              <input
                autoFocus
                type="text"
                placeholder="Search delicious food..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-700/50"
              />
            </div>
          </Container>
        ) : null}

        {/* Mobile nav */}
        {open ? (
          <div className="border-t border-ink/10 bg-white lg:hidden">
            <nav className="flex flex-col py-2">
              <Container className="flex flex-col">
                {siteConfig.navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-ink/5 py-3 text-sm font-semibold text-ink-700 transition hover:text-brand"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#book" onClick={() => setOpen(false)} className="btn-brand mt-3 w-full">
                  Login
                </a>
              </Container>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
