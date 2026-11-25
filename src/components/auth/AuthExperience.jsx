"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/constants/site";

const getRequestedRedirect = () => {
  const requestedPath = new URLSearchParams(window.location.search).get("next");
  return requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
    ? requestedPath
    : null;
};

export const AuthExperience = ({ initialMode = "login" }) => {
  const router = useRouter();
  const { login, register } = useAuth();

  const [mode, setMode] = useState(initialMode);

  // Login form state
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const loggedInUser = login({
      id: loginId.trim(),
      password: loginPassword,
    });

    if (!loggedInUser) {
      setErrorMsg(
        process.env.NODE_ENV === "development"
          ? "Invalid account ID or password."
          : "Sign-in is unavailable in this frontend-only production build.",
      );
      return;
    }

    setSuccessMsg(`Welcome back, ${loggedInUser.name}!`);

    setTimeout(() => {
      const requestedRedirect = getRequestedRedirect();
      if (requestedRedirect) {
        router.push(requestedRedirect);
      } else if (loggedInUser.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 600);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!regName || !regEmail) {
      setErrorMsg("Please fill in your name and email.");
      return;
    }

    const newUser = register({
      name: regName,
      email: regEmail,
      phone: regPhone,
    });

    if (!newUser) {
      setErrorMsg(
        "Account creation is unavailable in this frontend-only production build.",
      );
      return;
    }

    setSuccessMsg(`Welcome to Reshto, ${newUser.name}! Redirecting to your dashboard...`);
    setTimeout(() => {
      router.push(getRequestedRedirect() || "/dashboard");
    }, 600);
  };

  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-(--theme-page) px-4 pt-28 pb-8 transition-colors duration-300 dark:bg-[#0f0e0d] md:pb-10">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand/10 blur-3xl dark:bg-brand/5" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-120 w-120 rounded-full bg-brand/5 blur-3xl" />

      <Container className="relative z-10 max-w-6xl">
        <div className="grid overflow-hidden rounded-[28px] border border-(--theme-border) bg-(--theme-surface) shadow-[0_18px_52px_-30px_rgba(26,26,26,.24)] dark:border-white/10 dark:bg-[#1e1c1a] lg:grid-cols-[.86fr_1.14fr]">
          <aside className="relative flex min-h-60 flex-col justify-between overflow-hidden bg-linear-to-br from-[#171512] via-[#24211d] to-[#39332b] p-7 text-white sm:p-9 lg:min-h-180 lg:p-11">
            <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3 font-display text-2xl font-extrabold text-white">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-black/15 dark:text-[#171512]">
                  <i className="ri-restaurant-2-fill text-xl" />
                </span>
                {siteConfig.name}
              </Link>
              <p className="mt-2 pl-14 text-[10px] font-extrabold uppercase tracking-[.2em] text-white/70">
                Fresh · Culinary · Experience
              </p>
            </div>

            <div className="relative z-10 mt-10 max-w-md lg:mt-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-white/75">
                <i className="ri-sparkling-2-line text-white/80" /> Your Reshto account
              </span>
              <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
                Good food is even better <span className="text-white">shared.</span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                Sign in to continue to your Reshto dashboard, or create an account to get started.
              </p>

              <div className="mt-8 hidden space-y-4 lg:block">
                {[
                  ["ri-list-check", "Keep your orders organized"],
                  ["ri-user-settings-line", "Manage your account"],
                  ["ri-restaurant-line", "Discover signature dishes"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-sm font-semibold text-white/80">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80">
                      <i className={icon} />
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 hidden border-t border-white/10 pt-5 text-xs text-white/55 lg:block">
              Already have an account? <span className="font-bold text-white">Welcome back.</span>
            </div>
          </aside>

          <section className="flex flex-col justify-center p-6 sm:p-9 lg:p-12" aria-labelledby="auth-heading">
            <div className="flex items-center justify-between gap-4">
              <span className="section-pill"><i className="ri-shield-user-line" /> Member access</span>
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-ink transition hover:text-brand dark:text-white/80 dark:hover:text-brand-300">
                <i className="ri-arrow-left-line" /> <span className="hidden sm:inline">Back to Reshto</span><span className="sm:hidden">Home</span>
              </Link>
            </div>

            <h2 id="auth-heading" className="mt-8 font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-700/65 dark:text-white/55">
              {mode === "login" ? "Enter your details to sign in to Reshto." : "Join Reshto and make every meal a little more special."}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-1.5 rounded-2xl border border-ink/10 bg-soft-primary p-1.5 dark:border-white/10 dark:bg-white/5" role="tablist" aria-label="Choose sign-in or registration">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "login"}
                onClick={() => { setMode("login"); setErrorMsg(""); setSuccessMsg(""); }}
                className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${mode === "login" ? "bg-white text-ink shadow-sm dark:bg-[#302c27] dark:text-white" : "text-ink-700 hover:text-ink dark:text-white/70 dark:hover:text-white"}`}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "register"}
                onClick={() => { setMode("register"); setErrorMsg(""); setSuccessMsg(""); }}
                className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${mode === "register" ? "bg-white text-ink shadow-sm dark:bg-[#302c27] dark:text-white" : "text-ink-700 hover:text-ink dark:text-white/70 dark:hover:text-white"}`}
              >
                Create Account
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {errorMsg ? (
                <div role="alert" className="flex items-center gap-2.5 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm font-semibold text-brand dark:text-brand-300">
                  <i className="ri-error-warning-line text-lg" /> {errorMsg}
                </div>
              ) : null}
              {successMsg ? (
                <div role="status" aria-live="polite" className="flex items-center gap-2.5 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm font-semibold text-brand dark:text-brand-300">
                  <i className="ri-checkbox-circle-line text-lg" /> {successMsg}
                </div>
              ) : null}
            </div>

            {mode === "login" ? (
              <div className="mt-6 space-y-5">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="login-id" className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80">Account ID</label>
                    <div className="relative">
                      <i aria-hidden="true" className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40" />
                      <input id="login-id" name="username" type="text" inputMode="numeric" autoComplete="username" required placeholder="Enter your account ID" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full rounded-xl border border-ink/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-700/35 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-[#151412] dark:text-white dark:placeholder:text-white/45" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80">Password</label>
                    <div className="relative">
                      <i aria-hidden="true" className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40" />
                      <input id="login-password" name="password" type="password" autoComplete="current-password" required placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full rounded-xl border border-ink/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-700/35 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-[#151412] dark:text-white dark:placeholder:text-white/45" />
                    </div>
                  </div>

                  <button type="submit" className="btn-brand w-full justify-center rounded-xl py-3.5! text-sm! font-extrabold shadow-lg shadow-brand/15">
                    Sign In <i className="ri-arrow-right-line" />
                  </button>
                </form>

              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="register-name" className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80">Full name</label>
                  <div className="relative">
                    <i aria-hidden="true" className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40" />
                    <input id="register-name" name="name" type="text" autoComplete="name" required placeholder="e.g. Alex Rahman" value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full rounded-xl border border-ink/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-700/35 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-[#151412] dark:text-white dark:placeholder:text-white/45" />
                  </div>
                </div>
                <div>
                  <label htmlFor="register-email" className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80">Email address</label>
                  <div className="relative">
                    <i aria-hidden="true" className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40" />
                    <input id="register-email" name="email" type="email" autoComplete="email" required placeholder="alex@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full rounded-xl border border-ink/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-700/35 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-[#151412] dark:text-white dark:placeholder:text-white/45" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="register-phone" className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80">Phone number <span className="font-medium text-ink-700/45">(optional)</span></label>
                    <div className="relative">
                      <i aria-hidden="true" className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40" />
                      <input id="register-phone" name="phone" type="tel" autoComplete="tel" placeholder="+880 1711-000000" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="w-full rounded-xl border border-ink/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-700/35 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-[#151412] dark:text-white dark:placeholder:text-white/45" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="register-password" className="mb-1.5 block text-xs font-extrabold text-ink-700 dark:text-white/80">Password</label>
                    <div className="relative">
                      <i aria-hidden="true" className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/45 dark:text-white/40" />
                      <input id="register-password" name="new-password" type="password" autoComplete="new-password" required placeholder="At least 6 characters" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full rounded-xl border border-ink/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-700/35 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-[#151412] dark:text-white dark:placeholder:text-white/45" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-brand w-full justify-center rounded-xl py-3.5! text-sm! font-extrabold shadow-lg shadow-brand/15">
                  Create Account <i className="ri-arrow-right-line" />
                </button>
              </form>
            )}

            <p className="mt-7 border-t border-ink/10 pt-5 text-center text-xs text-ink-700/55 dark:border-white/10 dark:text-white/45">
              By continuing, you agree to Reshto&apos;s terms and privacy policy.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default AuthExperience;
