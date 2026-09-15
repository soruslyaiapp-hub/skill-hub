// "<" is escaped so the JSON can never close the script tag early.
const LT_ESCAPE = `${String.fromCharCode(92)}u003c`;

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, LT_ESCAPE) }} />;
}
