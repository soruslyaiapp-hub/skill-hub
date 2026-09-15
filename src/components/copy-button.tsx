"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (http, iframes). The text stays selectable.
    }
  }

  return (
    <button type="button" onClick={copy} aria-label={copied ? "Copied" : label} title={copied ? "Copied" : label} className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), className)}>
      {copied ? <Check className="text-emerald-600 dark:text-emerald-400" /> : <Copy />}
    </button>
  );
}
