import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { JsonLd } from "@/components/json-ld";
import { getSkill } from "./content/skills";
import { breadcrumbJsonLd, skillJsonLd } from "./structured-data";

describe("JSON-LD", () => {
  it("describes a skill as a SoftwareApplication", () => {
    const data = skillJsonLd(getSkill("rtk")!);
    expect(data["@type"]).toBe("SoftwareApplication");
    expect(data.sameAs).toEqual(["https://github.com/rtk-ai/rtk"]);
    expect(data.offers).toMatchObject({ price: "0" });
  });

  it("numbers breadcrumb items from 1", () => {
    const data = breadcrumbJsonLd([{ name: "Skills", path: "/skills" }, { name: "RTK", path: "/skills/rtk" }]);
    expect((data.itemListElement as { position: number }[]).map((i) => i.position)).toEqual([1, 2]);
  });

  it("cannot break out of its script tag", () => {
    const html = renderToStaticMarkup(<JsonLd data={{ name: "</script><script>alert(1)</script>" }} />);
    expect(html.match(/<\/script>/g)).toHaveLength(1);
    expect(html).not.toContain("<script>alert");
  });
});
