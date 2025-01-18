import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import Providers from "components/Providers";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  setup({ el, App, props }) {
    if (import.meta.env.SSR) {
      hydrateRoot(
        el,
        <Providers>
          <App {...props} />
        </Providers>
      );
      return;
    }

    createRoot(el).render(
      <Providers>
        <App {...props} />
      </Providers>
    );
  },
  progress: {
    color: "var(--mui-palette-primary-main)",
  },
}).then(() => {
  document.getElementById("app")?.removeAttribute("data-page");
});
