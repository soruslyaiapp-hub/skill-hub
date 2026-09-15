import type { Metadata } from "next";
import { Suspense } from "react";
import { SkillBrowser } from "@/components/browser/skill-browser";
import { SkillBrowserFallback } from "@/components/browser/skill-browser-fallback";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getSummaries } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Browse skills",
  description: "Search and filter AI skills, agents, MCP servers and tools by category, platform, type and more.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  const skills = getSummaries();
  return (
    <Container className="py-10">
      <PageHeader
        title="Browse skills"
        description={`${skills.length} skills, agents, MCP servers and tools. Filter by the job they do, the platform you use, and more.`}
      />
      <Suspense fallback={<SkillBrowserFallback skills={skills} />}>
        <SkillBrowser skills={skills} />
      </Suspense>
    </Container>
  );
}
