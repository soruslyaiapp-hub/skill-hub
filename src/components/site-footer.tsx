import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./site-header";

type FooterLink = { href: string; label: string; external?: boolean };

function FooterGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground">{title}</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const project: FooterLink[] = [
    { href: "/submit", label: "Submit a skill" },
    { href: "/about", label: "About" },
    ...(site.isRepoConfigured ? [{ href: site.repoUrl, label: "GitHub", external: true }] : []),
  ];
  return (
    <footer className="mt-20 border-t text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <div className="max-w-xs space-y-3">
          <Logo />
          <p>{site.tagline} Every entry links to its source.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
          <FooterGroup
            title="Explore"
            links={[
              { href: "/skills", label: "Browse all" },
              { href: "/categories", label: "Categories" },
              { href: "/skills?sort=stars", label: "Most starred" },
            ]}
          />
          <FooterGroup title="Project" links={project} />
        </div>
      </div>
      <div className="border-t">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-xs sm:px-6 lg:px-8">
          Code under the MIT licence. Each listed project belongs to its authors.
        </p>
      </div>
    </footer>
  );
}
