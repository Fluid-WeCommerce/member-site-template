import { createElement, useEffect, useState } from "react";

/**
 * The animated Mist mark: a pixel-grid M that sheds mist, stirs under the
 * cursor and regrows. It draws <mist-logo> (./mist-logo.js), a custom element
 * that paints a 16:9 canvas filling this wrapper's width.
 */
export function MistMark({ width = 320 }: { width?: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    void import("./mist-logo.js").then(() => setReady(true));
  }, []);

  return (
    <div style={{ width, maxWidth: "100%", aspectRatio: "16 / 9" }}>
      {ready
        ? createElement("mist-logo", {
            mode: "loop",
            variant: "mark",
            color: "#fff",
            sound: "off",
          })
        : null}
    </div>
  );
}
