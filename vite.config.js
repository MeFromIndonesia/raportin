import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/ts/app.tsx",
      ssr: "resources/ts/ssr.tsx",
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": resolve("resources/ts"),
      pages: resolve("resources/ts/pages"),
      components: resolve("resources/ts/components"),
      ui: resolve("resources/ts/components/ui"),
    },
  },
  server: {
    cors: {
      origin: ["http://127.0.0.1:8000", "http://localhost:8000"],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
});
