import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/common/BrandMark";
import { siteConfig } from "@/constants/site";

export const AuthLayout = ({ mode, title, description, children }) => {
  const isLogin = mode === "login";

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
              <Link
                href="/"
                className="inline-flex items-center gap-3 font-display text-2xl font-extrabold text-white"
              >
                <BrandMark className="auth-brand-mark" />
                {siteConfig.name}
              </Link>
              <p className="mt-2 pl-14 text-[10px] font-extrabold uppercase tracking-[.2em] text-white/70">
                Fresh · Culinary · Experience
              </p>
            </div>

            <div className="relative z-10 mt-10 max-w-md lg:mt-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-white/75">
                <i className="ri-sparkling-2-line text-white/80" />
                Your Biteon account
              </span>
              <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
                Good food is even better{" "}
                <span className="text-white">shared.</span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                Sign in to manage your orders, or create an account to get
                started.
              </p>

              <div className="mt-8 hidden space-y-4 lg:block">
                {[
                  ["ri-list-check", "Keep your orders organized"],
                  ["ri-user-settings-line", "Manage your account"],
                  ["ri-restaurant-line", "Discover signature dishes"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm font-semibold text-white/80"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80">
                      <i className={icon} />
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 hidden border-t border-white/10 pt-5 text-xs text-white/55 lg:block">
              Fresh meals and warm hospitality, every time.
            </div>
          </aside>

          <section
            className="flex flex-col justify-center p-6 sm:p-9 lg:p-12"
            aria-labelledby="auth-heading"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="section-pill">
                <i className="ri-shield-user-line" /> Member access
              </span>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink transition hover:text-brand dark:text-white/80 dark:hover:text-brand-300"
              >
                <i className="ri-arrow-left-line" />
                <span className="hidden sm:inline">Back to Biteon</span>
                <span className="sm:hidden">Home</span>
              </Link>
            </div>

            <h2
              id="auth-heading"
              className="mt-8 font-display text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-700/65 dark:text-white/55">
              {description}
            </p>

            <div className="mt-7">{children}</div>

            <p className="mt-7 border-t border-ink/10 pt-5 text-center text-xs text-ink-700/55 dark:border-white/10 dark:text-white/45">
              {isLogin ? "New to Biteon?" : "Already have an account?"}{" "}
              <Link
                href={isLogin ? "/register" : "/login"}
                className="font-bold text-brand hover:underline dark:text-brand-300"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </Link>
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
};
