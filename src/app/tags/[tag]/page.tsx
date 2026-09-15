import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SkillGrid } from "@/components/skill-grid";
import { getSummaries, getTagCounts } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTagCounts(getSummaries()).map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag}`, description: `AI skills, agents and tools tagged ${tag}.`, alternates: { canonical: `/tags/${tag}` } };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  const skills = getSummaries().filter((skill) => skill.tags.includes(tag));
  if (skills.length === 0) notFound();
  return (
    <Container className="py-10">
      <PageHeader title={`#${tag}`} description={`${skills.length} ${skills.length === 1 ? "skill" : "skills"} with this tag.`}>
        <Link href="/skills" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Browse all skills
        </Link>
      </PageHeader>
      <SkillGrid skills={skills} label="Skills" />
    </Container>
  );
}
