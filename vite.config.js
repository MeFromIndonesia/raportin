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
});
