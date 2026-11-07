import { fluid } from "@fluid-app/sites";
import { useEffect, useSyncExternalStore } from "react";

// A small router. In the storefront's frame, a pushState is reported to the
// shell, which adds the history entry; Back and Forward come back through
// fluid.history.onGo, so the router follows them without reloading.

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

/** The current path, without the query or fragment. */
export function usePath(): string {
  useEffect(
    () =>
      fluid.history.onGo((path, hash) => {
        window.history.replaceState(null, "", path + (hash ?? ""));
        notify();
      }),
    [],
  );
  return useSyncExternalStore(subscribe, () => window.location.pathname);
}

/** Move to a path of this site. */
export function navigate(path: string): void {
  if (path === window.location.pathname) return;
  window.history.pushState(null, "", path);
  window.scrollTo(0, 0);
  notify();
}
