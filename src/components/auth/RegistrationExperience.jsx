"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useAuth } from "@/context/AuthContext";

const getRequestedRedirect = () => {
  const requestedPath = new URLSearchParams(window.location.search).get("next");
  return requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
    ? requestedPath
    : null;
};

const inputClassName =
  "w-full rounded-xl border border-ink/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-700/45 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-[#151412] dark:text-white dark:placeholder:text-white/45";

export const RegistrationExperience = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }

      router.replace(
        getRequestedRedirect() ||
          (result.user.role === "admin" ? "/admin" : "/dashboard"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      mode="register"
      title="Create your account"
      description="Register to manage your Reshto orders and reservations."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div
            role="alert"
            className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm font-semibold text-rose-700 dark:text-rose-300"
          >
            <i className="ri-error-warning-line text-lg" />
            {error}
          </div>
        ) : null}

        <div>
          <label
            htmlFor="register-name"
            className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80"
          >
            Full name
          </label>
          <div className="relative">
            <i
              aria-hidden="true"
              className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40"
            />
            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Your full name"
              value={form.name}
              onChange={updateField("name")}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80"
          >
            Email address
          </label>
          <div className="relative">
            <i
              aria-hidden="true"
              className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40"
            />
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={updateField("email")}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="register-phone"
              className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80"
            >
              Phone number <span className="font-medium text-ink-700/50">(optional)</span>
            </label>
            <div className="relative">
              <i
                aria-hidden="true"
                className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40"
              />
              <input
                id="register-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                placeholder="+880 1711-000000"
                value={form.phone}
                onChange={updateField("phone")}
                className={inputClassName}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="register-password"
              className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80"
            >
              Password
            </label>
            <div className="relative">
              <i
                aria-hidden="true"
                className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40"
              />
              <input
                id="register-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="At least 8 characters"
                value={form.password}
                onChange={updateField("password")}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="register-confirm-password"
            className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80"
          >
            Confirm password
          </label>
          <div className="relative">
            <i
              aria-hidden="true"
              className="ri-lock-password-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40"
            />
            <input
              id="register-confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="Enter your password again"
              value={form.confirmPassword}
              onChange={updateField("confirmPassword")}
              className={inputClassName}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-brand w-full justify-center rounded-xl py-3.5! text-sm! font-extrabold shadow-lg shadow-brand/15 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line animate-spin" /> Creating account...
            </>
          ) : (
            <>
              Create Account <i className="ri-arrow-right-line" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegistrationExperience;
