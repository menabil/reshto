import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { siteConfig } from "@/constants/site";
import { footerAboutLinks, footerQuickLinks } from "@/data/data";

const socials = [
  { icon: "ri-facebook-circle-fill", label: "Facebook", href: siteConfig.links.facebook },
  { icon: "ri-twitter-fill", label: "Twitter", href: siteConfig.links.twitter },
  { icon: "ri-linkedin-box-fill", label: "LinkedIn", href: siteConfig.links.linkedin },
  { icon: "ri-instagram-fill", label: "Instagram", href: siteConfig.links.instagram },
  { icon: "ri-youtube-fill", label: "YouTube", href: siteConfig.links.youtube },
];

export const Footer = () => {
  return (
    <footer id="contact" className="site-footer relative overflow-hidden bg-ink text-white dark:bg-[#070e0b]">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

      <Container className="relative z-10 py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#home" className="flex items-center gap-2 font-display text-2xl font-extrabold text-white">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand text-white">
                <i className="ri-restaurant-2-fill text-xl" />
              </span>
              {siteConfig.name}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              At Reshto, we believe that food is more than just a meal &mdash; it&apos;s an experience. Our
              passion lies in crafting culinary delights that bring people together, creating memories
              that linger long after the last bite.
            </p>
            <h5 className="mt-6 font-display text-base font-bold">Follow Us</h5>
            <div className="mt-3 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white"
                >
                  <i className={`${s.icon} text-lg`} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h5 className="font-display text-base font-bold">About Us</h5>
            <ul className="mt-4 space-y-2.5">
              {footerAboutLinks.map((link) => (
                <li key={link}>
                  <a href="#about" className="text-sm text-white/60 transition hover:text-brand">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="font-display text-base font-bold">Quick Links</h5>
            <ul className="mt-4 space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link}>
                  <a href="#menu" className="text-sm text-white/60 transition hover:text-brand">
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a href="/dashboard" className="text-sm text-amber-300/80 transition hover:text-amber-200">
                  User Dashboard
                </a>
              </li>
              <li>
                <a href="/admin" className="text-sm text-amber-300/80 transition hover:text-amber-200">
                  Admin Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h5 className="font-display text-base font-bold">Reshto Info</h5>
            <a href="#contact" className="mt-4 block text-sm text-white/60 transition hover:text-brand">
              {siteConfig.contact.address}
            </a>
            <p className="mt-4 text-sm text-white/60">{siteConfig.contact.hours[0]}</p>
            <p className="text-sm text-white/60">{siteConfig.contact.hours[1]}</p>

            <div className="mt-4 space-y-2">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 text-sm text-white/80 transition hover:text-brand">
                <i className="ri-phone-line text-brand" />
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 text-sm text-white/80 transition hover:text-brand">
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
            <a href="#" className="font-medium text-brand">
              Reshto Restaurant
            </a>
            . Crafted with <i className="ri-heart-fill text-brand" />
          </p>
          <div className="flex gap-4">
            <a href="/dashboard" className="transition hover:text-brand">
              My Orders
            </a>
            <a href="/admin" className="transition hover:text-brand">
              Admin Portal
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
