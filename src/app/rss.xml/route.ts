import { getAllSkills } from "@/lib/content/skills";
import { rssXml } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return new Response(rssXml(getAllSkills(), new Date()), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
