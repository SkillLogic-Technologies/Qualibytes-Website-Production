import { useEffect, useState } from "react";

/**
 * Delays mounting a non-critical widget (floating buttons, chat launchers,
 * anything `position: fixed` that doesn't affect document flow/layout)
 * until the browser is idle or the page has finished loading — whichever
 * comes first. Returns false on the very first render (both server and
 * client, so prerendered HTML and the client's initial render match,
 * avoiding a hydration mismatch), then true once idle.
 *
 * Deferring these appropriately shouldn't change anything visible once
 * mounted: fixed-position overlays don't participate in layout, so
 * delaying their mount by a few hundred ms doesn't shift anything else on
 * the page — it just frees up the main thread during the initial
 * render/hydration window instead of competing with it.
 */
export function useDeferredMount(timeoutMs = 2000): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout?: number }) => number)
      | undefined;
    const cic = (window as any).cancelIdleCallback as ((handle: number) => void) | undefined;

    if (ric) {
      const handle = ric(() => setReady(true), { timeout: timeoutMs });
      return () => cic?.(handle);
    }

    const timer = setTimeout(() => setReady(true), timeoutMs);
    return () => clearTimeout(timer);
  }, [timeoutMs]);

  return ready;
}
