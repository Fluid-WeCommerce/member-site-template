import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { fluidSite } from "@fluid-app/sites/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Inside the Fluid monorepo, build against the SDK's source, so a change to
// it shows here before it is published. A copy of this template outside the
// monorepo uses @fluid-app/sites from npm.
const monorepoSdk = fileURLToPath(
  new URL("../../packages/platform/sites/src/index.ts", import.meta.url),
);
const monorepoContracts = fileURLToPath(
  new URL(
    "../../packages/platform/sites-contracts/src/index.ts",
    import.meta.url,
  ),
);

export default defineConfig({
  // fluidSite() writes each page's head tags from config/meta.json, plus
  // sitemap.xml and llms.txt, at build time. With no title in meta.json the
  // page keeps index.html's <title>, and the storefront uses the site's SEO
  // settings.
  plugins: [react(), fluidSite()],
  // Compile every file with these options, so the SDK's source does not make
  // esbuild read the monorepo's own tsconfig files.
  esbuild: {
    tsconfigRaw: JSON.stringify({
      compilerOptions: { target: "es2022", useDefineForClassFields: true },
    }),
  },
  resolve: existsSync(monorepoSdk)
    ? {
        alias: {
          "@fluid-app/sites": monorepoSdk,
          "@fluid-app/sites-contracts": monorepoContracts,
        },
      }
    : {},
  build: {
    outDir: "dist",
    // Hashed names, so the gateway can cache each file for a year.
    assetsDir: "assets",
  },
});
