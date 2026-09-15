import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Skill bodies are plain Markdown. Raw HTML is not rendered, and unsafe URLs are removed by react-markdown.
const components: Components = {
  a: ({ href, children }) => {
    const external = typeof href === "string" && /^https?:/.test(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
  // The page title is the only h1.
  h1: ({ children }) => <h2>{children}</h2>,
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-xl prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none [&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-normal">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
