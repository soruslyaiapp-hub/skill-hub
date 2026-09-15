import { Rss } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

// Posts straight to your newsletter provider (for example a Buttondown embed URL). Off until configured.
const action = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

export function NewsletterSignup() {
  return (
    <section aria-labelledby="newsletter-title" className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
      <h2 id="newsletter-title" className="text-xl font-semibold tracking-tight">
        {action ? "Get the weekly digest" : "Follow new skills"}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {action ? "New skills and the skill of the week, once a week. Unsubscribe any time." : "Get every new skill in your feed reader."}
      </p>
      {action ? (
        <form action={action} method="post" target="_blank" className="mt-4 flex max-w-md flex-wrap gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          />
          <button type="submit" className={buttonVariants({ size: "lg" })}>Subscribe</button>
        </form>
      ) : null}
      <p className="mt-4 text-sm">
        <a href="/rss.xml" className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground">
          <Rss aria-hidden className="size-4" />
          {action ? "Or follow the RSS feed" : "Subscribe to the RSS feed"}
        </a>
      </p>
    </section>
  );
}
