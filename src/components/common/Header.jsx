"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Container className="header-inner">
        <a href="#home" className="site-logo" aria-label="Reshto home">
          <span className="logo-mark"><i className="ri-restaurant-2-fill" /></span>
          <span>{siteConfig.name}<small>FRESH &amp; DELICIOUS</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {siteConfig.navLinks.map((link, index) => (
            <a key={link.label} href={link.href} className={index === 0 ? "active" : ""}>{link.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" className="header-icon" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen((value) => !value)}><i className="ri-search-line" /></button>
          <a href="#specials" className="header-icon desktop-action" aria-label="Favorites"><i className="ri-heart-3-line" /></a>
          <a href="#menu" className="header-icon desktop-action" aria-label="Browse menu"><i className="ri-shopping-bag-3-line" /></a>
          <a href="#contact" className="header-icon desktop-action" aria-label="Contact Reshto"><i className="ri-user-3-line" /></a>
          <a href="#menu" className="btn-brand header-order">Order Now <i className="ri-arrow-right-line" /></a>
          <button type="button" className="header-icon mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><i className={open ? "ri-close-line" : "ri-menu-line"} /></button>
        </div>
      </Container>
      {searchOpen ? <Container className="header-search"><i className="ri-search-line" /><input aria-label="Search menu" type="search" placeholder="Search our menu..." /><a href="#menu" onClick={() => setSearchOpen(false)}>Browse menu</a></Container> : null}
      {open ? <div className="mobile-nav"><Container>{siteConfig.navLinks.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}<i className="ri-arrow-right-s-line" /></a>)}<a href="#menu" onClick={() => setOpen(false)} className="mobile-order">Order Now <i className="ri-arrow-right-line" /></a></Container></div> : null}
    </header>
  );
};

export default Header;
