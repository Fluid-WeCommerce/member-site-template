import type { ReactElement } from "react";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { usePath } from "./router";

// Each page of the site, by its path. A new page is a component here, a
// <Link> to it, and its title in config/meta.json.
const pages: Record<string, () => ReactElement> = {
  "/": Home,
};

export function App() {
  const path = usePath();
  const Page = pages[path] ?? NotFound;

  return (
    <main className="site">
      <Page />
    </main>
  );
}
