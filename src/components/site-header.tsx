import { Blocks, Search } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "./icons";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export const NAV_LINKS = [
  { href: "/skills", label: "Browse" },
  { href: "/categories", label: "Categories" },
] as const;

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-7 place-items-center rounded-lg bg-foreground text-background">
        <Blocks aria-hidden className="size-4" />
      </span>
      <span>{site.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="relative mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Form action="/skills" className="relative hidden sm:block" role="search">
            <Search aria-hidden className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              type="search"
              placeholder="Search skills"
              aria-label="Search skills"
              className="h-8 w-52 rounded-lg border bg-muted/40 pl-8 pr-2 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:w-64 focus-visible:border-ring focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-ring/40"
            />
          </Form>
          <Link href="/skills" aria-label="Search skills" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "sm:hidden")}>
            <Search />
          </Link>
          {site.isRepoConfigured ? (
            <a href={site.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="SkillHub on GitHub" className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <GitHubIcon className="size-4" />
            </a>
          ) : null}
          <ThemeToggle />
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
