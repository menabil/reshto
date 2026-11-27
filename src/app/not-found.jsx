import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="not-found-page flex flex-1 items-center justify-center px-4 pt-[170px] pb-[100px] md:pt-[182px]">
      <Container className="text-center max-w-md">
        <p className="text-base font-semibold text-brand">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Page not found</h1>
        <p className="mt-4 text-base text-ink-700/70">
          The page you are looking for does not exist.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
