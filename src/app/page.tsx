import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">{site.name}</h1>
      <p className="max-w-md text-muted-foreground">{site.tagline}</p>
      <p className="text-sm text-muted-foreground">Coming soon.</p>
    </main>
  );
}
