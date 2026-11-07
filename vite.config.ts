import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
export default defineConfig({
  root: "app",
  base: "./",
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./app/src", import.meta.url)) },
  },
  build: { outDir: "../dist", emptyOutDir: true },
});
