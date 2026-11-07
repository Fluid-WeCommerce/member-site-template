import type { MouseEvent, ReactNode } from "react";

import { navigate } from "./router";

/** A link to a page of this site, drawn without a reload. */
export function Link({ to, children }: { to: string; children: ReactNode }) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
      return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}
