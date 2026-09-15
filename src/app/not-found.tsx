import Link from "next/link";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
      <p className="mt-3 max-w-md text-muted-foreground">The skill may have moved, or the link has a typo.</p>
      <div className="mt-6 flex gap-2">
        <Link href="/skills" className={buttonVariants({ size: "lg" })}>
          Browse skills
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Home
        </Link>
      </div>
    </Container>
  );
}
