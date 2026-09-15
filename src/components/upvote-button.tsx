"use client";

import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { getSupabase, votesEnabled } from "@/lib/supabase";

type CountRow = { skill_slug: string; votes: number | string };

export function UpvoteButton({ slug }: { slug: string }) {
  return votesEnabled ? <Upvote slug={slug} /> : null;
}

function Upvote({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const supabase = await getSupabase();
      if (!supabase) return;
      const [{ data: rows }, { data: auth }] = await Promise.all([supabase.rpc("skill_vote_counts"), supabase.auth.getSession()]);
      if (cancelled) return;
      const row = (rows as CountRow[] | null)?.find((r) => r.skill_slug === slug);
      setCount(row ? Number(row.votes) : 0);
      const uid = auth.session?.user.id ?? null;
      setUserId(uid);
      if (uid) {
        const { data } = await supabase.from("skill_votes").select("skill_slug").eq("skill_slug", slug).maybeSingle();
        if (!cancelled) setVoted(Boolean(data));
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function toggle() {
    const supabase = await getSupabase();
    if (!supabase) return;
    if (!userId) {
      await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: window.location.href } });
      return;
    }
    setBusy(true);
    const { error } = voted
      ? await supabase.from("skill_votes").delete().eq("skill_slug", slug)
      : await supabase.from("skill_votes").insert({ skill_slug: slug });
    if (!error) {
      setVoted(!voted);
      setCount((c) => Math.max(0, (c ?? 0) + (voted ? -1 : 1)));
    }
    setBusy(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={voted}
      title={userId ? undefined : "Sign in with GitHub to vote"}
      className={buttonVariants({ variant: voted ? "secondary" : "outline", size: "lg" })}
    >
      <ThumbsUp data-icon="inline-start" />
      <span className="tabular-nums">{count ?? "–"}</span>
      <span className="sr-only">{voted ? " votes. Remove my vote" : " votes. Upvote"}</span>
    </button>
  );
}
