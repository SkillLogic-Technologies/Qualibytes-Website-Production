/**
 * package.json:  "prebuild": "tsx scripts/generate-sitemap.ts"
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { SITE, PAGES, COURSES } from "../client/src/seo/seo-config";

const today = new Date().toISOString().slice(0, 10);

// A page with canonicalPath set is a duplicate of another page — it still
// resolves and gets prerendered, but it shouldn't appear in the sitemap
// (its canonical twin is listed instead, and gets everything attributed to it).
const entries = [
  ...Object.values(PAGES)
    .filter((p) => !p.noindex && !p.canonicalPath)
    .map((p) => ({ loc: p.path, priority: p.path === "/" ? "1.0" : p.path === "/privacy-policy" ? "0.3" : "0.8" })),
  ...COURSES.filter((c) => !c.canonicalPath).map((c) => ({ loc: c.path, priority: "0.9" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE.url}${e.loc === "/" ? "/" : e.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const out = resolve(process.cwd(), "client/public/sitemap.xml");
writeFileSync(out, xml);
console.log(`sitemap.xml: ${entries.length} URLs -> ${out}`);
