"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";

export const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const homeHref = pathname === "/" ? "#home" : "/#home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Container className="header-inner">
        <Link href={homeHref} className="site-logo" aria-label="Reshto home">
          <span className="logo-mark"><i className="ri-restaurant-2-fill" /></span>
          <span>{siteConfig.name}<small>FRESH &amp; DELICIOUS</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {siteConfig.navLinks.map((link, index) => (
            <Link key={link.label} href={pathname === "/" ? link.href : `/${link.href}`} className={index === 0 ? "active" : ""}>{link.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" className="header-icon" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen((value) => !value)}><i className="ri-search-line" /></button>
          <Link href={pathname === "/" ? "#specials" : "/#specials"} className="header-icon desktop-action" aria-label="Favorites"><i className="ri-heart-3-line" /></Link>
          <Link href={pathname === "/" ? "#menu" : "/#menu"} className="header-icon desktop-action" aria-label="Browse menu"><i className="ri-shopping-bag-3-line" /></Link>
          <Link href={pathname === "/" ? "#contact" : "/#contact"} className="header-icon desktop-action" aria-label="Contact Reshto"><i className="ri-user-3-line" /></Link>
          <Link href="/order" className="btn-brand header-order">Order Now <i className="ri-arrow-right-line" /></Link>
          <button type="button" className="header-icon mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><i className={open ? "ri-close-line" : "ri-menu-line"} /></button>
        </div>
      </Container>
      {searchOpen ? <Container><form action="/order" className="header-search"><i className="ri-search-line" /><input aria-label="Search menu" name="search" type="search" placeholder="Search our menu..." /><button type="submit">Browse menu</button></form></Container> : null}
      {open ? <div className="mobile-nav"><Container>{siteConfig.navLinks.map((link) => <Link key={link.label} href={pathname === "/" ? link.href : `/${link.href}`} onClick={() => setOpen(false)}>{link.label}<i className="ri-arrow-right-s-line" /></Link>)}<Link href="/order" onClick={() => setOpen(false)} className="mobile-order">Order Now <i className="ri-arrow-right-line" /></Link></Container></div> : null}
    </header>
  );
};

export default Header;
