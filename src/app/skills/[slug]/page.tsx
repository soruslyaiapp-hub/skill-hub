import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { InstallBlock } from "@/components/install-block";
import { Markdown } from "@/components/markdown";
import { SkillFacts } from "@/components/skill-facts";
import { SkillGrid } from "@/components/skill-grid";
import { SkillHero } from "@/components/skill-hero";
import { VideoEmbed } from "@/components/video-embed";
import { getRelated } from "@/lib/catalog";
import { getAllSkills, getSkill } from "@/lib/content/skills";
import { site } from "@/lib/site";
import { toSummary } from "@/lib/summary";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: PageProps<"/skills/[slug]">): Promise<Metadata> {
  const skill = getSkill((await params).slug);
  if (!skill) return {};
  return {
    title: skill.name,
    description: skill.tagline,
    alternates: { canonical: `/skills/${skill.slug}` },
    openGraph: { title: skill.name, description: skill.tagline, type: "article", url: `/skills/${skill.slug}` },
  };
}

const SECTION_TITLE = "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground";

export default async function SkillPage({ params }: PageProps<"/skills/[slug]">) {
  const skill = getSkill((await params).slug);
  if (!skill) notFound();

  const summary = toSummary(skill);
  const related = getRelated(skill, 3);
  const editUrl = site.isRepoConfigured ? `${site.repoUrl}/edit/${site.defaultBranch}/content/skills/${skill.slug}.md` : null;

  return (
    <Container className="py-8">
      <SkillHero skill={skill} summary={summary} editUrl={editUrl} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0 space-y-10">
          {skill.links.install ? (
            <section aria-labelledby="install-title">
              <h2 id="install-title" className={SECTION_TITLE}>Install</h2>
              <InstallBlock command={skill.links.install} />
            </section>
          ) : null}
          {skill.media.video ? (
            <section aria-labelledby="demo-title">
              <h2 id="demo-title" className={SECTION_TITLE}>Demo</h2>
              <VideoEmbed url={skill.media.video} title={skill.name} />
            </section>
          ) : null}
          {skill.media.screenshots.length > 0 ? (
            <section aria-labelledby="shots-title">
              <h2 id="shots-title" className={SECTION_TITLE}>Screenshots</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {skill.media.screenshots.map((src, index) => (
                  // eslint-disable-next-line @next/next/no-img-element -- remote or /public images of unknown size
                  <img key={src} src={src} alt={`${skill.name} screenshot ${index + 1}`} loading="lazy" className="w-full rounded-lg border" />
                ))}
              </div>
            </section>
          ) : null}
          <section aria-label={`About ${skill.name}`}>
            <Markdown>{skill.body}</Markdown>
          </section>
        </div>
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <SkillFacts skill={skill} />
        </aside>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="mt-16">
          <h2 id="related-title" className="mb-5 text-xl font-semibold tracking-tight">Related skills</h2>
          <SkillGrid skills={related} />
        </section>
      ) : null}
    </Container>
  );
}
