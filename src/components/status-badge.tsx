import { Archive, BadgeCheck, FlaskConical, Users } from "lucide-react";
import { STATUSES, type StatusKey } from "@/lib/facets";
import { cn } from "@/lib/utils";

const STYLE: Record<StatusKey, { icon: typeof BadgeCheck; className: string }> = {
  verified: { icon: BadgeCheck, className: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300" },
  community: { icon: Users, className: "border-border bg-muted text-muted-foreground" },
  experimental: { icon: FlaskConical, className: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  deprecated: { icon: Archive, className: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300" },
};

export function StatusBadge({ status, className }: { status: StatusKey; className?: string }) {
  const { icon: Icon, className: tone } = STYLE[status];
  return (
    <span title={STATUSES[status].description} className={cn("inline-flex h-6 items-center gap-1 rounded-full border px-2 text-xs font-medium", tone, className)}>
      <Icon aria-hidden className="size-3.5" />
      {STATUSES[status].name}
    </span>
  );
}
