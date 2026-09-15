import type { ReactNode } from "react";
import type { DraftField, SubmissionDraft } from "@/lib/submission";
import { cn } from "@/lib/utils";

export type FormCtx = {
  draft: SubmissionDraft;
  update: (field: DraftField, value: string | string[]) => void;
  touch: (field: DraftField) => void;
  errorOf: (field: DraftField) => string | undefined;
};

export const inputClass =
  "w-full rounded-lg border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive";

function Message({ id, error, hint }: { id: string; error?: string; hint?: ReactNode }) {
  if (error) return <p id={id} className="text-xs text-destructive">{error}</p>;
  if (hint) return <p id={id} className="text-xs text-muted-foreground">{hint}</p>;
  return null;
}

type TextProps = { ctx: FormCtx; field: DraftField; label: string; hint?: ReactNode; placeholder?: string; required?: boolean; type?: "text" | "url"; multiline?: boolean };

export function TextField({ ctx, field, label, hint, placeholder, required, type = "text", multiline }: TextProps) {
  const id = `field-${field}`;
  const error = ctx.errorOf(field);
  const common = {
    id,
    name: field,
    value: String(ctx.draft[field]),
    placeholder,
    required,
    onBlur: () => ctx.touch(field),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? `${id}-msg` : undefined,
  };
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span aria-hidden className="text-destructive"> *</span> : null}
      </label>
      {multiline ? (
        <textarea {...common} rows={3} onChange={(e) => ctx.update(field, e.target.value)} className={cn(inputClass, "py-2")} />
      ) : (
        <input {...common} type={type} onChange={(e) => ctx.update(field, e.target.value)} className={cn(inputClass, "h-10")} />
      )}
      <Message id={`${id}-msg`} error={error} hint={hint} />
    </div>
  );
}

type Option = { value: string; label: string };

export function SelectField({ ctx, field, label, options, hint }: { ctx: FormCtx; field: DraftField; label: string; options: Option[]; hint?: ReactNode }) {
  const id = `field-${field}`;
  const error = ctx.errorOf(field);
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <select
        id={id}
        name={field}
        value={String(ctx.draft[field])}
        onChange={(e) => ctx.update(field, e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={cn(inputClass, "h-10")}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <Message id={`${id}-msg`} error={error} hint={hint} />
    </div>
  );
}

export function CheckboxGroup({ ctx, field, label, options }: { ctx: FormCtx; field: "platforms"; label: string; options: Option[] }) {
  const selected = ctx.draft[field];
  const error = ctx.errorOf(field);
  const toggle = (value: string) =>
    ctx.update(field, selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  return (
    <fieldset className="space-y-2" aria-describedby={error ? `field-${field}-msg` : undefined}>
      <legend className="text-sm font-medium">{label}</legend>
      <div className="grid grid-cols-2 gap-1.5 xl:grid-cols-3">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-2 text-sm transition hover:bg-muted">
            <input type="checkbox" checked={selected.includes(o.value)} onChange={() => toggle(o.value)} className="size-4 accent-foreground" />
            <span className="truncate">{o.label}</span>
          </label>
        ))}
      </div>
      <Message id={`field-${field}-msg`} error={error} />
    </fieldset>
  );
}

export function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border p-5">
      <div>
        <h2 className="font-semibold">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
