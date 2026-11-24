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
    <div className="flex flex-1 items-center justify-center py-20">
      <Container className="text-center max-w-md">
        <p className="text-base font-semibold text-brand">Error</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Something went wrong</h1>
        <p className="mt-4 text-base text-ink-700/70">
          An unexpected error occurred. You can try reloading the page.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={() => reset()}>Try Again</Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
