import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <Container className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        <p className="text-sm font-medium text-ink-700/60">
          Loading content...
        </p>
      </Container>
    </div>
  );
}
