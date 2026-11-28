"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/common/BrandMark";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { siteConfig } from "@/constants/site";
import { useLanguage } from "@/context/LanguageContext";

const socials = [
  {
    icon: "ri-facebook-circle-fill",
    label: "Facebook",
    href: siteConfig.links.facebook,
  },
  { icon: "ri-twitter-fill", label: "Twitter", href: siteConfig.links.twitter },
  {
    icon: "ri-linkedin-box-fill",
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
  },
  {
    icon: "ri-instagram-fill",
    label: "Instagram",
    href: siteConfig.links.instagram,
  },
  { icon: "ri-youtube-fill", label: "YouTube", href: siteConfig.links.youtube },
];

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      id="contact-footer"
      className="site-footer relative overflow-hidden bg-ink text-white dark:bg-[#0f0e0d]"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

      <Container className="relative z-10 py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-2xl font-extrabold text-white"
            >
              <BrandMark className="footer-brand-mark" />
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {t(
                "hero.subtitle",
                "At Biteon, we believe that food is more than just a meal — it's an experience. Seasonal ingredients, thoughtful cooking, and memorable hospitality.",
              )}
            </p>
            <h5 className="mt-6 font-display text-base font-bold">
              {t("footer.followUs", "Follow Us")}
            </h5>
            <div className="mt-3 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white dark:hover:text-[#171512]"
                >
                  <i className={`${s.icon} text-lg`} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h5 className="font-display text-base font-bold">
              {t("footer.quickLinks", "Explore")}
            </h5>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.home", "Home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.about", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.menu", "Our Menu")}
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.order", "Online Order")}
                </Link>
              </li>
              <li>
                <Link
                  href="/chefs"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.chefs", "Our Chefs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.gallery", "Photo Gallery")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="font-display text-base font-bold">
              Portals &amp; Info
            </h5>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.contact", "Contact & Location")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  {t("nav.reservation", "Book A Table")}
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-white/60 transition hover:text-brand"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h5 className="font-display text-base font-bold">
              {t("footer.openingHours", "Opening Hours")}
            </h5>
            <Link
              href="/contact"
              className="mt-4 block text-sm text-white/60 transition hover:text-brand"
            >
              {siteConfig.contact.address}
            </Link>
            <p className="mt-4 text-sm text-white/60">
              {t("footer.schedule", siteConfig.contact.hours[0])}
            </p>
            <p className="text-sm text-white/60">
              {siteConfig.contact.hours[1]}
            </p>

            <div className="mt-4 space-y-2">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 text-sm text-white/80 transition hover:text-brand"
              >
                <i className="ri-phone-line text-brand" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-sm text-white/80 transition hover:text-brand"
              >
                <i className="ri-mail-open-line text-brand" />
                {siteConfig.contact.email}
              </a>
            </div>

            <NewsletterForm />
          </div>
        </div>

        <div className="footer-copy mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
          <p>
            Copyright &copy; {siteConfig.copyrightYear}{" "}
            <Link href="/" className="font-medium text-brand">
              Biteon Restaurant
            </Link>
            . {t("footer.rights", "All rights reserved.")} &bull;{" "}
            {t(
              "footer.madeWith",
              "Crafted with passion for exquisite gastronomy.",
            )}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
