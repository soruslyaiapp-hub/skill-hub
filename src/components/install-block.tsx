import { CopyButton } from "./copy-button";

export function InstallBlock({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 py-1 pl-3 pr-1 font-mono text-sm">
      <span aria-hidden className="select-none text-muted-foreground">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-1.5">{command}</code>
      <CopyButton value={command} label="Copy install command" />
    </div>
  );
}
