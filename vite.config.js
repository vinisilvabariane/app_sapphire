import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
export default defineConfig({
    server: {
        host: "127.0.0.1",
        port: 5173,
        strictPort: true,
        open: "http://127.0.0.1:8000",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/ts"),
            "@/": path.resolve(__dirname, "resources/ts") + "/",
        },
    },
    plugins: [
        tailwindcss(),
        laravel({
            input: ["resources/ts/main.tsx"],
            refresh: true,
        }),
        react(),
    ],
});
