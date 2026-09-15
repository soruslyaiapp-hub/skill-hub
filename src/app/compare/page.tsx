import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareView } from "@/components/compare/compare-view";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { toCompareSkill } from "@/lib/compare";
import { getAllSkills } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Compare skills",
  description: "Put two AI skills, agents or tools side by side.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  const skills = getAllSkills()
    .map(toCompareSkill)
    .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  return (
    <Container className="py-10">
      <PageHeader title="Compare skills" description="Pick two skills to see them side by side. The link keeps your picks, so you can share it." />
      <Suspense fallback={<div className="h-24 animate-pulse rounded-xl bg-muted" />}>
        <CompareView skills={skills} />
      </Suspense>
    </Container>
  );
}
