import { Container } from "@/components/container";

export default function Loading() {
  return (
    <Container className="py-10" aria-busy="true" aria-label="Loading skills">
      <div className="mb-8 h-9 w-56 animate-pulse rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl border bg-muted/50" />
        ))}
      </div>
    </Container>
  );
}
