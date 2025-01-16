import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ReactDOMServer from "react-dom/server";
import { RouteName, route } from "ziggy-js";
import ThemeProvider from "components/ThemeContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => title ? `${title} - ${appName}` : appName,
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob("./pages/**/*.tsx")
            ),
        setup: ({ App, props }) => {
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    ...(page.props.ziggy as Object),
                    location: new URL((page.props.ziggy as any).location),
                } as any);

            return <ThemeProvider><App {...props} /></ThemeProvider>;
        },
    })
);
