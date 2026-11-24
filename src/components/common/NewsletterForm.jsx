"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const NewsletterForm = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    // Simulate fast client subscription and localStorage persistence
    setTimeout(() => {
      try {
        const subscribers = JSON.parse(
          localStorage.getItem("reshto-subscribers") || "[]"
        );
        if (!subscribers.includes(email.trim().toLowerCase())) {
          subscribers.push(email.trim().toLowerCase());
          localStorage.setItem("reshto-subscribers", JSON.stringify(subscribers));
        }
      } catch {
        setLoading(false);
        setToast({
          type: "error",
          title: "Subscription Could Not Be Saved",
          message: "Browser storage is unavailable. Please try again later.",
        });
        return;
      }

      setLoading(false);
      setToast({
        type: "success",
        title: "Demo Subscription Saved",
        message:
          "Your subscription is saved on this device only. Email delivery and discount codes are not connected yet.",
      });
      setEmail("");

      // Auto dismiss after 5 seconds
      setTimeout(() => setToast(null), 5000);
    }, 500);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 p-1 pl-4 transition-all focus-within:border-brand-300 focus-within:bg-white/15"
      >
        <i className="ri-mail-send-line text-brand-300" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("checkout.email", "Enter your email address...")}
          className="w-full bg-transparent py-2 text-xs sm:text-sm text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-brand px-5! py-2.5! text-xs! shrink-0 font-bold"
        >
          {loading ? (
            <i className="ri-loader-4-line animate-spin" />
          ) : (
            t("footer.subscribe", "Subscribe")
          )}
        </button>
      </form>

      {/* Modern Subscription Feedback Toast (Task 6.2) */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 p-3.5 text-xs text-white shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-sm text-white">
            <i className="ri-check-line" />
          </span>
          <div className="flex-1 min-w-0">
            <strong className="block font-bold text-emerald-300">
              {toast.title}
            </strong>
            <p className="mt-0.5 text-[11px] text-white/80 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-white/50 hover:text-white"
            aria-label="Dismiss subscription notification"
          >
            <i className="ri-close-line text-base" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
