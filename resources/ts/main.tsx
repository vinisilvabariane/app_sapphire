import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import type { ComponentType } from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "../css/app.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

createInertiaApp({
    title: (title) => (title ? `${title} | Sapphire OS` : "Sapphire OS"),
    resolve: async (name) => {
        const pages = import.meta.glob<{
            default: ComponentType<Record<string, unknown>>;
        }>("./modules/**/pages/**/*.tsx");

        const [module, page] = name.split("/");
        const pagePath = `./modules/${module}/pages/${page}.tsx`;
        const resolvePage = pages[pagePath];

        if (!resolvePage) {
            throw new Error(`Pagina nao encontrada: ${pagePath}`);
        }

        const resolvedPage = await resolvePage();

        return resolvedPage.default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider defaultTheme="system" storageKey="app-theme">
                <App {...props} />
            </ThemeProvider>,
        );
    },
});
