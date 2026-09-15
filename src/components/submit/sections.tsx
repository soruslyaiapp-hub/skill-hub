import { DIFFICULTIES, DIFFICULTY_KEYS, PLATFORM_KEYS, PLATFORMS, PRICE_KEYS, PRICES, SKILL_TYPES, TYPE_KEYS } from "@/lib/facets";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/taxonomy";
import { CheckboxGroup, FormSection, SelectField, TextField, type FormCtx } from "./fields";

export function BasicsSection({ ctx }: { ctx: FormCtx }) {
  return (
    <FormSection title="The basics" description="What is it, and where does it live?">
      <TextField ctx={ctx} field="name" label="Name" required placeholder="Repomix" />
      <TextField ctx={ctx} field="tagline" label="Tagline" required hint="One plain sentence, 10 to 140 characters. Say what it does, not how great it is." />
      <TextField ctx={ctx} field="source" label="Source link" type="url" required placeholder="https://github.com/owner/repo" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField ctx={ctx} field="install" label="Install command" placeholder="npx repomix@latest" />
        <TextField ctx={ctx} field="docs" label="Docs link" type="url" placeholder="https://" />
      </div>
    </FormSection>
  );
}

export function ClassifySection({ ctx }: { ctx: FormCtx }) {
  return (
    <FormSection title="Classify it" description="One primary category: the job it does, not the tool it uses.">
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          ctx={ctx}
          field="category"
          label="Category"
          options={CATEGORY_KEYS.map((k) => ({ value: k, label: CATEGORIES[k].name }))}
          hint={CATEGORIES[ctx.draft.category as keyof typeof CATEGORIES]?.description}
        />
        <SelectField ctx={ctx} field="type" label="Type" options={TYPE_KEYS.map((k) => ({ value: k, label: SKILL_TYPES[k].name }))} />
        <SelectField ctx={ctx} field="difficulty" label="Difficulty" options={DIFFICULTY_KEYS.map((k) => ({ value: k, label: DIFFICULTIES[k].name }))} />
        <SelectField ctx={ctx} field="price" label="Price" options={PRICE_KEYS.map((k) => ({ value: k, label: PRICES[k].name }))} />
      </div>
      <CheckboxGroup ctx={ctx} field="platforms" label="Works with" options={PLATFORM_KEYS.map((k) => ({ value: k, label: PLATFORMS[k].name }))} />
      <TextField ctx={ctx} field="tags" label="Tags" placeholder="context, cli, token-savings" hint="Up to 8, separated by commas." />
    </FormSection>
  );
}

export function CreditSection({ ctx }: { ctx: FormCtx }) {
  return (
    <FormSection title="Credit and media" description="Who made it, and where people can see it in action.">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField ctx={ctx} field="authorName" label="Author" required placeholder="GitHub name or company" />
        <TextField ctx={ctx} field="authorUrl" label="Author link" type="url" placeholder="https://github.com/owner" />
        <TextField ctx={ctx} field="video" label="Demo video" type="url" placeholder="YouTube, Loom or Vimeo link" />
        <TextField ctx={ctx} field="linkedinUrl" label="LinkedIn post" type="url" placeholder="https://www.linkedin.com/posts/..." />
      </div>
    </FormSection>
  );
}

export function WriteupSection({ ctx }: { ctx: FormCtx }) {
  return (
    <FormSection title="The write-up" description="Short and honest. Each box becomes a section on the skill page. Markdown works.">
      <TextField ctx={ctx} field="whatItDoes" label="What it does" required multiline />
      <TextField ctx={ctx} field="whyUseful" label="Why it is useful" multiline hint="Two or three short bullet points work well." />
      <TextField ctx={ctx} field="howToUse" label="How to use it" multiline hint="The first command or step a new user should try." />
      <TextField ctx={ctx} field="watchOutFor" label="Watch out for" multiline hint="Costs, limits, setup traps or safety notes." />
    </FormSection>
  );
}
