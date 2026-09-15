import { getAllSkills } from "@/lib/content/skills";
import { skillsJson } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return Response.json(skillsJson(getAllSkills(), new Date().toISOString()), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
