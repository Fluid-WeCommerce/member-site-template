import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    // Hashed names, so the gateway can cache each file for a year.
    assetsDir: "assets",
  },
});
