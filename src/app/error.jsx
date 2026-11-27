"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="error-page flex flex-1 items-center justify-center px-4 pt-[120px] pb-[50px] md:pt-[132px]">
      <Container className="max-w-lg">
        <div className="rounded-4xl border border-ink/10 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-[#1e1c1a] sm:p-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-500/10 text-2xl text-rose-600 dark:text-rose-400">
            <i className="ri-error-warning-line" aria-hidden="true" />
          </span>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[.16em] text-brand dark:text-brand-300">
            Unexpected error
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-4 text-sm leading-6 text-ink-700/70 dark:text-white/60">
            An unexpected error occurred. You can try reloading the page.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => reset()}>Try Again</Button>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
