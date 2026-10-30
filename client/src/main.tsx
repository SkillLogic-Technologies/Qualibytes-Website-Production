import { createRoot } from "react-dom/client";
import * as ReactHelmetAsync from "react-helmet-async";
const HelmetProvider: typeof ReactHelmetAsync.HelmetProvider =
  ReactHelmetAsync.HelmetProvider ?? (ReactHelmetAsync as any).default?.HelmetProvider;
import App from "./App";
import { initRoutePrefetch } from "./lib/route-prefetch";
import "./index.css";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Apply the real theme to <html> synchronously, before React mounts.
// ThemeProvider (hooks/use-theme.tsx) only reads localStorage inside a
// useEffect, so its first render always assumes defaultTheme="light" (the
// value App.tsx passes it) and corrects itself a tick later — fine when
// #root starts empty (nothing is visible either way until that correction
// lands), but now that #root can start full of prerendered markup that's
// revealed shortly after mount, doing this early removes any chance of a
// light/dark flash instead of relying on timing. Mirrors ThemeProvider's
// own logic exactly (including: no stored value means "light", NOT a
// system-preference match — ThemeProvider only consults matchMedia when
// its theme state is literally "system", which never happens via App.tsx's
// defaultTheme="light"), so its own (now redundant) pass is a no-op.
(() => {
  try {
    const stored = localStorage.getItem("qualibytes-ui-theme");
    const theme = stored === "dark" ? "dark" : "light";
    document.documentElement.classList.add(theme);
  } catch {
    // localStorage unavailable — ThemeProvider's effect will still apply
    // the correct class shortly after mount.
  }
})();

const rootEl = document.getElementById("root")!;

createRoot(rootEl).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);

// #root starts hidden (see index.html) purely to avoid a flash of the
// prerendered markup being replaced by React's own render. Reveal it
// immediately after render() returns, not after a delay: createRoot's
// initial mount commits to the DOM synchronously (no Suspense/
// startTransition is used here to defer it), so by this line React has
// already replaced the prerendered content with its own — waiting longer
// (e.g. requestAnimationFrame) only delays first paint with no additional
// safety, which on a slow connection meaningfully pushed back when content
// first appears compared to the pre-prerendering site. Confirmed via a
// throttled-network frame capture that this matches baseline's timing
// with no flash.
rootEl.classList.remove("prerendered-hidden");

initRoutePrefetch();