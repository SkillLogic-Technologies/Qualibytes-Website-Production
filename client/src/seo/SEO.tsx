/**
 * <SEO /> component – har page ke top pe lagayein.
 *
 * Usage:
 *   <SEO page={PAGES.home} />
 *   <SEO page={courseSEO} course />          // course pages
 *   <SEO page={PAGES.programs} courseList />  // programs listing
 */
import * as ReactHelmetAsync from "react-helmet-async";
// Vite (browser build) resolves the real ESM file with named exports;
// tsx/Node (the prerender script) resolves the CJS entry, where esbuild's
// CJS interop puts everything under `.default` instead. Support both.
const Helmet: typeof ReactHelmetAsync.Helmet =
  ReactHelmetAsync.Helmet ?? (ReactHelmetAsync as any).default?.Helmet;
import { SITE, COURSES, type PageSEO, type CourseSEO } from "./seo-config";
import {
  organizationSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
  courseSchema,
  courseListSchema,
} from "./schema";

type Props = {
  page: PageSEO | CourseSEO;
  course?: boolean;
  courseList?: boolean;
};

export default function SEO({ page, course, courseList }: Props) {
  // A duplicate page (page.canonicalPath set) points its canonical URL —
  // and og:url, which should name the same canonical entity — at the
  // other page instead of itself.
  const canonicalTarget = page.canonicalPath ?? page.path;
  const url = `${SITE.url}${canonicalTarget === "/" ? "/" : canonicalTarget}`;
  const image = page.ogImage ?? SITE.ogImage;

  const schemas: object[] = [organizationSchema(), webPageSchema(page)];
  if (page.path === "/") schemas.push(websiteSchema());
  // FAQPage JSON-LD intentionally omitted: Google's structured-data policy
  // requires FAQ schema to match FAQ content actually visible on the page,
  // and no page currently renders a visible FAQ section. FAQ copy stays in
  // seo-config.ts (COMMON_FAQS / course faqs) for whenever a visible
  // FAQSection ships — re-add `faqSchema(page.faqs)` here at that point.
  if (course) {
    const c = page as CourseSEO;
    schemas.push(courseSchema(c));
    schemas.push(
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Programs", path: "/programs" },
        { name: c.courseName, path: c.path },
      ]),
    );
  } else if (page.path !== "/") {
    schemas.push(breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.title.split("|")[0].trim(), path: page.path }]));
  }
  if (courseList) schemas.push(courseListSchema(COURSES));

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      {page.keywords?.length ? <meta name="keywords" content={page.keywords.join(", ")} /> : null}
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={page.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
      />

      {/* Open Graph (WhatsApp, LinkedIn, Facebook previews) */}
      <meta property="og:type" content={course ? "article" : "website"} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={page.title} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
