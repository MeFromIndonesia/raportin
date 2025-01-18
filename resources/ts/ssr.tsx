import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import Providers from "components/Providers";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ReactDOMServer from "react-dom/server";
import { RouteName, route } from "ziggy-js";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
    setup: ({ App, props }) => {
      // @ts-expect-error
      global.route<RouteName> = (name, params, absolute) =>
        route(name, params as any, absolute, {
          ...(page.props.ziggy as Object),
          location: new URL((page.props.ziggy as any).location),
        } as any);

      return (
        <Providers>
          <App {...props} />
        </Providers>
      );
    },
  }).then((app) => {
    const appRender = app;
    appRender.body = appRender.body.replace(/data-page=".*?"/, "");
    return appRender;
  })
);
