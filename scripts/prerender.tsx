/**
 * Post-build prerender script.
 * -----------------------------------------------------------------------
 * Runs AFTER `vite build` (see package.json "build" script). For every
 * route listed in seo-config.ts (PAGES + COURSES), server-renders <App/>
 * with react-dom/server + react-helmet-async + a static Wouter location,
 * and writes a full static HTML file to dist/public/<route>/index.html.
 *
 * This does NOT replace the client bundle — Vite's normal JS/CSS output is
 * untouched. The client still boots exactly as before (see main.tsx); this
 * script only adds a server-rendered HTML shell per route so crawlers (and
 * anything that reads raw HTML without executing JS) see full content,
 * correct <title>/meta/canonical and JSON-LD immediately.
 *
 * Why react-dom/server + Wouter's documented ssrPath prop instead of
 * Puppeteer: the component tree was already audited and is SSR-safe (no
 * window/document/localStorage access during render — only inside
 * useEffect), so a real React SSR render is simpler, faster and more
 * reliable in CI than driving headless Chrome per route.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import * as ReactHelmetAsync from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
const HelmetProvider: typeof ReactHelmetAsync.HelmetProvider =
  ReactHelmetAsync.HelmetProvider ?? (ReactHelmetAsync as any).default?.HelmetProvider;
import { Router, type SsrContext } from "wouter";
import * as cheerio from "cheerio";

import App, { type AppProps } from "../client/src/App";
import HomeServer from "../client/src/pages/home.server";
import { PRERENDER_PAGES, PAGE_SOURCE_PATHS } from "./prerender-pages";
import { PAGES, COURSES } from "../client/src/seo/seo-config";

type ViteManifest = Record<string, { file: string; imports?: string[] }>;

const MANIFEST_PATH = resolve(process.cwd(), "dist/public/.vite/manifest.json");
const manifest: ViteManifest = existsSync(MANIFEST_PATH)
  ? JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"))
  : {};

/**
 * Slims the prerendered (crawler-facing) HTML only — never touches the live
 * client bundle. #root stays visually hidden (opacity:0) until main.tsx
 * mounts React and removes that class, so everything here is purely what a
 * crawler/view-source sees before JS runs; it has zero effect on anything a
 * human visitor's browser paints.
 *
 * Removes:
 * - [data-prerender-strip] elements: decorative star-field divs (random
 *   inline styles, no text/semantic value) and duplicated marquee/carousel
 *   copies beyond the first real set (see growth-formula.tsx,
 *   success-stories.tsx, company-logos.tsx, programs-section.tsx).
 * - `animation`/`animation-*` inline style properties on any remaining
 *   element — purely visual, meaningless in static HTML, inflates byte size
 *   on elements that render fine without them.
 *
 * Never touches text, headings, links, alt text, JSON-LD or meta/head tags
 * (this only operates on the body fragment passed in, after helmet's head
 * injection has already happened).
 */
function slimPrerenderedHtml(appHtml: string): string {
  const $ = cheerio.load(appHtml, { xml: false });

  $("[data-prerender-strip]").remove();

  $("[style]").each((_, el) => {
    const style = $(el).attr("style");
    if (!style) return;
    const kept = style
      .split(";")
      .map((decl) => decl.trim())
      .filter((decl) => decl.length > 0 && !/^animation(-[a-z]+)?\s*:/i.test(decl));
    if (kept.length === 0) {
      $(el).removeAttr("style");
    } else {
      $(el).attr("style", kept.join("; ") + ";");
    }
  });

  // cheerio wraps the fragment in html/head/body when loaded standalone;
  // extract just the body's inner HTML back out.
  return $("body").html() ?? appHtml;
}

const DIST_DIR = resolve(process.cwd(), "dist/public");
const TEMPLATE_PATH = resolve(DIST_DIR, "index.html");

function getRoutes(): string[] {
  // Every real route in App.tsx gets prerendered, including noindex pages
  // (e.g. online-degree-programs) — the <meta name="robots" content="noindex">
  // tag on those pages still comes through correctly via helmet, so crawlers
  // that do respect it skip indexing; prerendering just means they (and
  // nginx's static-file serving) still get real, correct HTML instead of the
  // generic client/index.html fallback block for that route.
  const pagePaths = Object.values(PAGES).map((p) => p.path);
  const coursePaths = COURSES.map((c) => c.path);
  return [...pagePaths, ...coursePaths];
}

function renderRoute(path: string, template: string): string {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const ssrContext: SsrContext = {};

  // Every route's page component is React.lazy()'d in App.tsx for browser
  // code-splitting, which renderToString() can't resolve synchronously —
  // pass the real, statically-imported component for whichever route is
  // being rendered right now via pageOverride (Home has its own dedicated
  // homeOverride, since HomeBody's shape differs from the shared
  // { onRequestCall } page props every other route uses).
  const pageOverride = PRERENDER_PAGES[path];
  const rawAppHtml = renderToString(
    createElement(
      HelmetProvider,
      { context: helmetContext },
      createElement(Router, {
        ssrPath: path,
        ssrContext,
        children: createElement<AppProps>(App, {
          homeOverride: HomeServer,
          pageOverride,
        }),
      }),
    ),
  );
  const appHtml = slimPrerenderedHtml(rawAppHtml);

  if (ssrContext.redirectTo) {
    throw new Error(`Route "${path}" redirected to "${ssrContext.redirectTo}" during prerender — check App.tsx routes.`);
  }

  const helmet = helmetContext.helmet;
  if (!helmet) {
    throw new Error(`react-helmet-async produced no output for route "${path}"`);
  }

  let html = template;

  // Swap <html lang="..."> attributes set by <SEO><html lang="en-IN" /></SEO>
  const htmlAttrs = helmet.htmlAttributes.toString();
  html = html.replace(/<html[^>]*>/, htmlAttrs ? `<html ${htmlAttrs}>` : "<html>");

  // Replace the static fallback SEO block (title/description/canonical/
  // robots/og/twitter) with react-helmet-async's real per-route output.
  // `prioritizeSeoTags` (set on <Helmet> in SEO.tsx) routes title/description/
  // canonical/robots/og:title/og:description/og:url/og:image specifically
  // into `helmet.priority` instead of the regular title/meta/link buckets —
  // all four must be included or those "priority" tags are silently dropped.
  const headInjection = [
    helmet.priority.toString(),
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");

  const fallbackBlock = /<!--seo-fallback-start-->[\s\S]*?<!--seo-fallback-end-->/;
  if (!fallbackBlock.test(html)) {
    throw new Error(
      "client/index.html is missing the <!--seo-fallback-start/end--> markers the prerender script replaces.",
    );
  }
  html = html.replace(fallbackBlock, headInjection);

  // Hint the browser to fetch the main JS/CSS bundle as early as possible —
  // before it has to parse through all the meta/JSON-LD/other head content
  // just injected above. Vite already emits the real <script type="module">
  // and <link rel="stylesheet"> tags with their actual hashed filenames
  // elsewhere in <head>; this just adds modulepreload/preload hints pointing
  // at those same URLs, placed at the very top of <head> (right after
  // charset, which must stay first). modulepreload additionally lets the
  // browser start fetching + compiling the module graph without waiting for
  // the <script> tag to be reached during HTML parsing.
  const scriptTagMatch = html.match(/<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*>/);
  const styleTagMatch = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
  // Match Vite's own crossorigin (anonymous) mode on these tags exactly —
  // a preload/modulepreload hint in a different CORS mode than the real
  // tag that later requests the same URL is treated as a separate cache
  // entry by the fetch spec, causing a wasted double-fetch instead of the
  // intended early-start + reuse.
  const scriptIsCrossorigin = scriptTagMatch ? /\bcrossorigin\b/.test(scriptTagMatch[0]) : false;
  const styleIsCrossorigin = styleTagMatch ? /\bcrossorigin\b/.test(styleTagMatch[0]) : false;

  // Modulepreload this route's own lazy-loaded chunk (and whatever it in
  // turn imports, e.g. a shared FormModal chunk) — without this, the
  // browser doesn't discover that chunk until React.lazy()'s dynamic
  // import() actually executes post-mount, costing a full extra
  // request-waterfall round trip for a page whose route (and thus exact
  // chunk needed) is already known at HTML-generation time.
  const sourcePath = PAGE_SOURCE_PATHS[path];
  const routeChunkEntry = sourcePath ? manifest[sourcePath] : undefined;
  const routeChunkFiles: string[] = [];
  if (routeChunkEntry) {
    routeChunkFiles.push(routeChunkEntry.file);
    for (const importKey of routeChunkEntry.imports ?? []) {
      // "index.html" is the main HTML entry, not a JS chunk — already
      // covered by scriptTagMatch above. Other import keys (e.g.
      // "_FormModal-<hash>.js") are themselves manifest keys to resolve.
      if (importKey === "index.html") continue;
      const dep = manifest[importKey];
      if (dep) routeChunkFiles.push(dep.file);
    }
  }
  const routeChunkHints = routeChunkFiles
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)
    .join("\n    ");

  // Home's hero poster is its actual LCP element (confirmed via
  // PerformanceObserver in a real browser) — hinting the browser to fetch
  // it at high priority before the HTML parser even reaches the <video>
  // tag shaves off however long that parsing would otherwise take. Only
  // injected for "/" — every other route doesn't have this image at all,
  // and a preload hint for an image the page never uses just wastes a
  // request/trips a Lighthouse "unused preload" warning for no benefit.
  const homePosterHint = path === "/" ? '<link rel="preload" as="image" fetchpriority="high" href="/home-hero-poster.webp" />' : "";

  const earlyHints = [
    scriptTagMatch
      ? `<link rel="modulepreload"${scriptIsCrossorigin ? " crossorigin" : ""} href="${scriptTagMatch[1]}" />`
      : "",
    styleTagMatch
      ? `<link rel="preload" as="style"${styleIsCrossorigin ? " crossorigin" : ""} href="${styleTagMatch[1]}" />`
      : "",
    routeChunkHints,
    homePosterHint,
  ]
    .filter(Boolean)
    .join("\n    ");
  if (earlyHints) {
    html = html.replace(/(<meta charset="UTF-8" \/>)/, `$1\n    ${earlyHints}`);
  }

  // #root keeps the prerendered-hidden class in the shipped HTML (see
  // index.html / main.tsx): crawlers and view-source still get the full
  // appHtml markup, but a human visitor sees nothing until main.tsx
  // removes the class right after React mounts — same blank-then-render
  // first paint as the pre-prerendering site, instead of a flash of this
  // markup being torn down and replaced.
  const rootDivPattern = /<div id="root"([^>]*)><\/div>/;
  if (!rootDivPattern.test(html)) {
    throw new Error('client/index.html is missing the expected <div id="root">...</div> for the prerender script to fill in.');
  }
  html = html.replace(rootDivPattern, (_match, attrs) => `<div id="root"${attrs}>${appHtml}</div>`);

  return html;
}

// Any path with no matching <Route> in App.tsx falls through to the final
// path-less <Route component={NotFound} />. This literal string just needs
// to not collide with a real route — it's never linked anywhere, only used
// here to make Wouter's ssrPath resolve to the NotFound branch.
const NOT_FOUND_SSR_PATH = "/__prerender-404-placeholder__";

function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    throw new Error(`Build output not found at ${TEMPLATE_PATH}. Run "vite build" first.`);
  }

  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  const routes = getRoutes();
  const written: string[] = [];

  for (const route of routes) {
    let html: string;
    try {
      html = renderRoute(route, template);
    } catch (err) {
      console.error(`Failed to prerender route "${route}":`);
      throw err;
    }
    const outDir = route === "/" ? DIST_DIR : resolve(DIST_DIR, `.${route}`);
    const outPath = resolve(outDir, "index.html");

    if (route !== "/") {
      mkdirSync(outDir, { recursive: true });
    }
    writeFileSync(outPath, html, "utf-8");
    written.push(outPath);
  }

  // Static 404.html: nginx's `error_page 404 /404.html;` serves this file's
  // *content* while preserving the real 404 status code (no `=200` on the
  // error_page directive — that would turn every miss into a soft-200).
  // Real on-brand NotFound component output instead of nginx's bare default
  // error page, for anything no App.tsx route actually matches.
  const notFoundHtml = renderRoute(NOT_FOUND_SSR_PATH, template);
  const notFoundPath = resolve(DIST_DIR, "404.html");
  writeFileSync(notFoundPath, notFoundHtml, "utf-8");
  written.push(notFoundPath);

  console.log(`Prerendered ${written.length} routes:`);
  for (const p of written) console.log(`  ${p}`);
}

main();
