import {
  Bot,
  Briefcase,
  Clapperboard,
  Code,
  Coins,
  Database,
  Plug,
  Server,
  ShieldCheck,
  Sparkles,
  SquarePen,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { CATEGORIES, type CategoryKey } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

const ICONS: Record<CategoryKey, LucideIcon> = {
  "agent-optimization": Bot,
  "token-cost": Coins,
  coding: Code,
  media: Clapperboard,
  content: SquarePen,
  "data-research": Database,
  business: Briefcase,
  devops: Server,
  security: ShieldCheck,
  productivity: Zap,
  integrations: Plug,
  meta: Sparkles,
};

/** Inline style that sets the category hue for the .tint* classes. */
export function hueStyle(category: CategoryKey): CSSProperties {
  return { "--h": CATEGORIES[category].hue } as CSSProperties;
}

export function CategoryIcon({ category, className }: { category: CategoryKey; className?: string }) {
  const Icon = ICONS[category];
  return <Icon aria-hidden className={className} />;
}

const SIZES = {
  sm: "size-7 rounded-md [&_svg]:size-3.5",
  md: "size-10 rounded-lg [&_svg]:size-5",
  lg: "size-14 rounded-xl [&_svg]:size-7",
} as const;

export function CategoryTile({ category, size = "md", className }: { category: CategoryKey; size?: keyof typeof SIZES; className?: string }) {
  return (
    <span style={hueStyle(category)} className={cn("tint inline-flex shrink-0 items-center justify-center", SIZES[size], className)}>
      <CategoryIcon category={category} />
    </span>
  );
}
