"use client";

import { ExternalLink, GitPullRequest, MessageSquarePlus } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { buttonVariants } from "@/components/ui/button";
import type { githubLinks } from "@/lib/submission";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  text: string;
  ok: boolean;
  issueCount: number;
  links: ReturnType<typeof githubLinks>;
  onCheck: () => void;
};

export function SubmitPreview({ slug, text, ok, issueCount, links, onCheck }: Props) {
  return (
    <aside aria-label="Your skill file" className="min-w-0 space-y-4 lg:sticky lg:top-20 lg:self-start">
      <div className="overflow-hidden rounded-xl border">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-4 py-2">
          <p className="truncate font-mono text-xs text-muted-foreground">content/skills/{slug}.md</p>
          <CopyButton value={text} label="Copy the file" />
        </div>
        <pre className="max-h-[26rem] overflow-auto p-4 text-xs leading-relaxed">
          <code>{text}</code>
        </pre>
      </div>

      {!ok ? (
        <button type="button" onClick={onCheck} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}>
          Fix {issueCount} thing{issueCount === 1 ? "" : "s"} first
        </button>
      ) : links.pullRequest ? (
        <a href={links.pullRequest} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
          <GitPullRequest data-icon="inline-start" />
          Open a pull request on GitHub
          <ExternalLink data-icon="inline-end" />
        </a>
      ) : (
        <p className="rounded-lg border px-4 py-3 text-sm text-muted-foreground">Copy the file and send it to the curator.</p>
      )}

      {ok && links.needsPaste ? (
        <p className="text-xs text-muted-foreground">The file is long, so GitHub opens an empty file. Copy the file above and paste it in.</p>
      ) : null}
      <p className="text-xs text-muted-foreground">
        GitHub asks you to sign in and makes a fork for you if needed. Nothing is sent until you press the green button there.
      </p>
      {links.issue ? (
        <a href={links.issue} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <MessageSquarePlus aria-hidden className="size-4" />
          Not ready for a PR? Suggest it in an issue
        </a>
      ) : null}
    </aside>
  );
}
