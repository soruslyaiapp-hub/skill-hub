import { MessageSquarePlus, SquareTerminal } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SubmitForm } from "@/components/submit/submit-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Submit a skill",
  description: "Add a skill, agent, MCP server or tool. The form builds the file and opens a pull request on GitHub.",
  alternates: { canonical: "/submit" },
};

export default function SubmitPage() {
  const repo = site.isRepoConfigured ? { url: site.repoUrl, branch: site.defaultBranch } : null;
  return (
    <Container className="py-10">
      <PageHeader
        title="Submit a skill"
        description="Fill in the form. It builds the skill file for you and opens a pull request on GitHub. A curator reviews every entry before it goes live."
      />
      {!repo ? (
        <p role="note" className="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
          The GitHub repo is not set yet (NEXT_PUBLIC_GITHUB_REPO), so the pull request button is off. You can still build and copy the file.
        </p>
      ) : null}
      <SubmitForm repo={repo} />
      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-5">
          <SquareTerminal aria-hidden className="size-5 text-muted-foreground" />
          <h2 className="mt-3 font-semibold">Prefer the terminal?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Clone the repo and run <code className="rounded bg-muted px-1.5 py-0.5 text-xs">npm run new-skill</code>. It asks the same questions and writes the file.
          </p>
        </div>
        <div className="rounded-xl border p-5">
          <MessageSquarePlus aria-hidden className="size-5 text-muted-foreground" />
          <h2 className="mt-3 font-semibold">What makes a good entry</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            It is public, it works, and it does one clear job. The write-up is short, specific and free of hype.
          </p>
        </div>
      </div>
    </Container>
  );
}
