import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getSummaries } from "@/lib/catalog";
import { STATUS_KEYS, STATUSES } from "@/lib/facets";

export const metadata: Metadata = {
  title: "About",
  description: "What SkillHub is, how skills are chosen, and how to add one.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const count = getSummaries().length;
  return (
    <Container className="max-w-3xl py-12">
      <PageHeader title="About SkillHub" description={`A permanent, searchable library of ${count} AI skills, agents, MCP servers and tools.`} />
      <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-a:underline-offset-4">
        <h2>Why it exists</h2>
        <p>
          Good AI skills get shared on LinkedIn, and then they sink in the feed within days. SkillHub keeps them. Every entry gets a page
          that stays online, with a plain-English write-up, the install command and a link to the source.
        </p>
        <h2>How entries are chosen</h2>
        <ul>
          <li>It is public and links to its source.</li>
          <li>It does one clear job. Each entry has one primary category: the job it does, not the tool it uses.</li>
          <li>The write-up is short and honest. No marketing copy.</li>
        </ul>
        <h2>What the labels mean</h2>
      </div>
      <ul className="mt-4 space-y-3">
        {STATUS_KEYS.map((key) => (
          <li key={key} className="flex flex-wrap items-center gap-3 text-sm">
            <StatusBadge status={key} />
            <span className="text-muted-foreground">{STATUSES[key].description}</span>
          </li>
        ))}
      </ul>
      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert prose-headings:font-semibold prose-a:underline-offset-4">
        <p>
          The coloured dot on each card shows recent activity on GitHub: green under 30 days, amber under six months, grey after that.
          Stars, licence and last-commit dates are refreshed every night.
        </p>
        <h2>Add a skill</h2>
        <p>
          Use the <Link href="/submit">submit form</Link>. It builds the file for you and opens a pull request on GitHub. Every entry
          is reviewed before it goes live.
        </p>
        <h2>Licence</h2>
        <p>The code is MIT licensed. Each listed project belongs to its authors. SkillHub only links to it.</p>
      </div>
    </Container>
  );
}
