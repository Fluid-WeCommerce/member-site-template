import type { ReactElement } from "react";

import { Link } from "./Link";
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
    <div className="site">
      <header className="site-header">
        <Link to="/">My member site</Link>
      </header>
      <main>
        <Page />
      </main>
    </div>
  );
}
