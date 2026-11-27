"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";
import { sendContactMessage } from "@/lib/emailService";
import { useLanguage } from "@/context/LanguageContext";
import InstagramFeed from "../home/InstagramFeed";

export const ContactExperience = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setSubmitError("");

    try {
      const result = await sendContactMessage(form);
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError("The message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-mail-send-line" /> Let&apos;s Connect
          </span>
          <h1>
            We&apos;re always happy to
            <br />
            <span>hear from you.</span>
          </h1>
          <p>
            Whether you have a question about our menu, need private dining
            catering, or simply want to say hello, reach out anytime.
          </p>
        </Container>
      </section>

      <section className="section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
            {/* Contact Form */}
            <div className="h-fit self-start rounded-4xl border border-ink/10 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#1e1c1a] sm:p-10">
              <span className="section-pill dark:bg-brand-900/40 dark:text-brand-300">
                <i className="ri-chat-smile-2-line" /> Send a Note
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink dark:text-white sm:text-3xl">
                Leave us a message
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
                Fill in the form below and our management team will reply within
                24 hours.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-3xl bg-emerald-500/10 p-8 text-center ring-1 ring-emerald-500/20 dark:bg-emerald-500/15">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-3xl text-white">
                    <i className="ri-check-line" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="mt-2 text-xs text-ink-700/70 dark:text-white/70">
                    Thank you, <strong>{form.name}</strong>. Your inquiry
                    regarding &quot;{form.subject}&quot; has been delivered
                    directly to our management inbox (
                    <span className="text-brand dark:text-brand-300 font-semibold">
                      {siteConfig.contact.email}
                    </span>
                    ). We will reply to your email within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "General Inquiry",
                        message: "",
                      });
                    }}
                    className="btn-brand mt-6 text-xs!"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 grid gap-4 sm:grid-cols-2"
                >
                  {submitError && (
                    <p
                      role="alert"
                      className="sm:col-span-2 rounded-xl bg-rose-500/10 p-3 text-xs text-rose-700 dark:text-rose-300"
                    >
                      {submitError}
                    </p>
                  )}
                  <div className="sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-bold text-ink dark:text-white">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. John Doe"
                      className="w-full rounded-2xl border border-ink/15 bg-ink/5 px-4 py-3 text-xs text-ink outline-none transition focus:border-brand dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-300"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-bold text-ink dark:text-white">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="e.g. john@example.com"
                      className="w-full rounded-2xl border border-ink/15 bg-ink/5 px-4 py-3 text-xs text-ink outline-none transition focus:border-brand dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-300"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-bold text-ink dark:text-white">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="e.g. +1 415-555-1234"
                      className="w-full rounded-2xl border border-ink/15 bg-ink/5 px-4 py-3 text-xs text-ink outline-none transition focus:border-brand dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-300"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-bold text-ink dark:text-white">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full rounded-2xl border border-ink/15 bg-ink/5 px-4 py-3 text-xs text-ink outline-none transition focus:border-brand dark:border-white/10 dark:bg-[#171614] dark:text-white dark:focus:border-brand-300"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Event & Catering">
                        Private Event &amp; Catering
                      </option>
                      <option value="Feedback / Compliment">
                        Feedback &amp; Dining Review
                      </option>
                      <option value="Career Opportunities">
                        Career Opportunities
                      </option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold text-ink dark:text-white">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Write your note, request, or questions here..."
                      className="w-full rounded-2xl border border-ink/15 bg-ink/5 p-4 text-xs text-ink outline-none transition focus:border-brand dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-300"
                    />
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-brand w-full py-3.5! text-xs font-bold flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <>
                          <i className="ri-loader-4-line animate-spin text-sm" />{" "}
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message Now <i className="ri-send-plane-fill" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Info Cards & Hours */}
            <div className="flex flex-col gap-6">
              <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
                <h3 className="font-display text-xl font-bold text-ink dark:text-white">
                  Direct Contact
                </h3>

                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl text-brand dark:bg-brand/20 dark:text-brand-300">
                      <i className="ri-map-pin-line" />
                    </span>
                    <div>
                      <strong className="block text-xs font-bold text-ink dark:text-white">
                        Restaurant Location
                      </strong>
                      <p className="mt-0.5 text-xs text-ink-700/70 dark:text-white/60">
                        {siteConfig.contact.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl text-brand dark:bg-brand/20 dark:text-brand-300">
                      <i className="ri-phone-line" />
                    </span>
                    <div>
                      <strong className="block text-xs font-bold text-ink dark:text-white">
                        Phone &amp; Hotline
                      </strong>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                        className="mt-0.5 block text-xs text-brand hover:underline dark:text-brand-300"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl text-brand dark:bg-brand/20 dark:text-brand-300">
                      <i className="ri-mail-line" />
                    </span>
                    <div>
                      <strong className="block text-xs font-bold text-ink dark:text-white">
                        Email Address
                      </strong>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="mt-0.5 block text-xs text-brand hover:underline dark:text-brand-300"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#1e1c1a]">
                <h3 className="font-display text-xl font-bold text-ink dark:text-white">
                  Opening Hours
                </h3>
                <div className="mt-4 divide-y divide-ink/5 text-xs dark:divide-white/5">
                  <div className="flex justify-between py-2.5">
                    <span className="text-ink-700/70 dark:text-white/60">
                      Monday &ndash; Thursday
                    </span>
                    <strong className="text-ink dark:text-white">
                      10:00 AM &ndash; 10:00 PM
                    </strong>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-ink-700/70 dark:text-white/60">
                      Friday &ndash; Saturday
                    </span>
                    <strong className="text-ink dark:text-white">
                      09:00 AM &ndash; 11:30 PM
                    </strong>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-ink-700/70 dark:text-white/60">
                      Sunday Brunch &amp; Dinner
                    </span>
                    <strong className="text-ink dark:text-white">
                      10:00 AM &ndash; 10:00 PM
                    </strong>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="overflow-hidden rounded-4xl border border-ink/10 bg-[#e5e3df] shadow-inner dark:border-white/10 dark:bg-[#171614] h-52 relative flex items-center justify-center text-center p-6">
                <div className="relative z-10">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-2xl text-white shadow-lg">
                    <i className="ri-map-pin-2-fill" />
                  </span>
                  <strong className="mt-2 block font-display text-sm font-bold text-ink dark:text-white">
                    Biteon Flagship Restaurant
                  </strong>
                  <p className="mt-0.5 text-[11px] text-ink-700/70 dark:text-white/60">
                    Mason City, IA &bull; Valet parking available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <InstagramFeed />
    </>
  );
};
