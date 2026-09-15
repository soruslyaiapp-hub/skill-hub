import { Container } from "@/components/container";

export default function Loading() {
  return (
    <Container className="py-8" aria-busy="true" aria-label="Loading skill">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-muted" />
      <div className="h-56 animate-pulse rounded-2xl border bg-muted/50" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-muted" style={{ width: `${90 - i * 8}%` }} />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-xl border bg-muted/50" />
      </div>
    </Container>
  );
}
