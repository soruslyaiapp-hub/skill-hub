import type { ReactNode } from "react";

export function PageHeader({ title, description, children }: { title: ReactNode; description?: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="max-w-2xl text-muted-foreground">{description}</p> : null}
      {children}
    </div>
  );
}
