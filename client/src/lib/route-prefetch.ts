/**
 * Prefetches route chunks (the same dynamic import() specifiers App.tsx's
 * lazy() calls use) either on browser idle time after initial load, or
 * immediately on hover/focus of any internal link pointing at that route —
 * whichever happens first actually triggers the fetch; import() is
 * idempotent and Vite/the browser both dedupe a chunk already in flight or
 * cached, so calling this twice for the same route is harmless.
 *
 * No per-<Link> changes needed anywhere in the app: hover/focus prefetch
 * uses event delegation on `document` instead of wrapping every <a> tag
 * across navigation.tsx, programs-section.tsx, course pages, footer links.
 */
const routeImporters: Record<string, () => Promise<unknown>> = {
  "/about": () => import("@/pages/about"),
  "/contact": () => import("@/pages/contact"),
  "/programs": () => import("@/pages/programs"),
  "/testimonials": () => import("@/pages/testimonials"),
  "/courses/devops": () => import("@/pages/courses/DevOps"),
  "/courses/aiml": () => import("@/pages/courses/AIML"),
  "/courses/manual-testing": () => import("@/pages/courses/ManualTesting"),
  "/courses/automation-testing": () => import("@/pages/courses/AutomationTesting"),
  "/courses/java-fullstack": () => import("@/pages/courses/JavaFullStack"),
  "/courses/php-fullstack": () => import("@/pages/courses/PHPFullStack"),
  "/courses/frontend": () => import("@/pages/courses/Frontend"),
  "/courses/backend": () => import("@/pages/courses/Backend"),
  "/courses/mern": () => import("@/pages/courses/MERN"),
  "/courses/business-analyst": () => import("@/pages/courses/BusinessAnalyst"),
  "/courses/medical-billing": () => import("@/pages/courses/MedicalBilling"),
  "/courses/usit": () => import("@/pages/courses/USIT"),
  "/courses/android": () => import("@/pages/courses/Android"),
  "/courses/cybersecurity": () => import("@/pages/courses/Cybersecurity"),
  "/courses/data-analytics": () => import("@/pages/courses/DataAnalytics"),
  "/courses/data-science": () => import("@/pages/courses/DataScience"),
  "/courses/frontend-development": () => import("@/pages/courses/FrontendDevelopment"),
  "/courses/ios-development": () => import("@/pages/courses/IOSDevelopment"),
  "/courses/mern-fullstack": () => import("@/pages/courses/MERNFullStack"),
  "/courses/python-fullstack": () => import("@/pages/courses/PythonFullStack"),
  "/courses/software-testing": () => import("@/pages/courses/SoftwareTesting"),
  "/online-degree-programs": () => import("@/pages/OnlineDegree"),
  "/privacy-policy": () => import("@/pages/privacy-policy"),
};

const prefetched = new Set<string>();

function prefetchRoute(path: string) {
  if (prefetched.has(path)) return;
  const importer = routeImporters[path];
  if (!importer) return;
  prefetched.add(path);
  importer().catch(() => {
    // A failed prefetch (offline, flaky connection) isn't fatal — the
    // real navigation's own import() call will just retry later. Don't
    // let it surface as an unhandled rejection.
    prefetched.delete(path);
  });
}

/** Resolves the nearest ancestor <a href> of an event target, if any. */
function findLinkHref(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a[href]");
  if (!anchor) return null;
  const href = anchor.getAttribute("href");
  if (!href || !href.startsWith("/")) return null;
  return href;
}

function onHoverOrFocus(e: Event) {
  const href = findLinkHref(e.target);
  if (href) prefetchRoute(href);
}

let initialized = false;

/**
 * Call once, after the app has mounted. Sets up hover/focus-triggered
 * prefetch immediately, then schedules a full idle-time prefetch of every
 * route once the browser is actually idle (or after a fallback timeout on
 * browsers without requestIdleCallback, e.g. Safari) — so a visitor who
 * never hovers anything still benefits on a fast/idle connection, without
 * competing with the current page's own initial render for bandwidth/CPU.
 */
export function initRoutePrefetch() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  document.addEventListener("mouseover", onHoverOrFocus, { passive: true });
  document.addEventListener("focusin", onHoverOrFocus, { passive: true });
  document.addEventListener("touchstart", onHoverOrFocus, { passive: true });

  const prefetchAllIdle = () => {
    for (const path of Object.keys(routeImporters)) {
      prefetchRoute(path);
    }
  };

  const ric = (window as any).requestIdleCallback as
    | ((cb: () => void, opts?: { timeout?: number }) => number)
    | undefined;
  if (ric) {
    ric(prefetchAllIdle, { timeout: 4000 });
  } else {
    setTimeout(prefetchAllIdle, 3000);
  }
}
