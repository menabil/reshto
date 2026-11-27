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

export const LoginExperience = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login({ email, password });
      if (!result.success) {
        setError(result.error);
        return;
      }

      const redirectPath =
        getRequestedRedirect() ||
        (result.user.role === "admin" ? "/admin" : "/dashboard");
      router.replace(redirectPath);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      mode="login"
      title="Welcome back"
      description="Enter your email and password to sign in to Biteon."
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
            htmlFor="login-email"
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
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="login-password"
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
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
              <i className="ri-loader-4-line animate-spin" /> Signing in...
            </>
          ) : (
            <>
              Sign In <i className="ri-arrow-right-line" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginExperience;
