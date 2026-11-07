import type { ReactElement } from "react";

import { Link } from "./Link";
import { Guestbook } from "./pages/Guestbook";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Shop } from "./pages/Shop";
import { usePath } from "./router";

const pages: Record<string, () => ReactElement> = {
  "/": Home,
  "/shop": Shop,
  "/guestbook": Guestbook,
};

export function App() {
  const path = usePath();
  const Page = pages[path] ?? NotFound;

  return (
    <div className="site">
      <header className="site-header">
        <Link to="/">Home</Link>
        <nav>
          <Link to="/shop">Shop</Link>
          <Link to="/guestbook">Guestbook</Link>
        </nav>
      </header>
      <main>
        <Page />
      </main>
    </div>
  );
}
