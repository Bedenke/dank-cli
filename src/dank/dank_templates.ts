import slugify from "slugify";

export function package_json(project: string) {
  return `
{
  "name": "${slugify(project).toLowerCase()}",
  "description": "${project}",
  "version": "1.0.0",
  "main": "dist/client.js",
  "dependencies": {
    "dank-web": "file:../dank-web"
  },
  "prettier": {
    "tabWidth": 2,
    "printWidth": 100
  }
}
`
}

export const client_ts = `
import { DomEngine, Context } from "dank-web";
import App from "./src/App";

const domEngine = new DomEngine();

window.onload = function(event) {
  const appRoot = document.getElementById("app");
  if (appRoot) {
    appRoot.innerHTML = "";
    const contextData = (window as any).__context_data__;
    const context = new Context(contextData);
    context.browser.go(window.location.href);
    domEngine.render(appRoot, App, context);

    window.onpopstate = function(event) {
      context.browser.back();
    };
    
    window.onerror = function(msg, file, line, col, error) {
      // context.router.error(msg)
      // return false;
    };
  }
};
`;

export const server_ts = `
import { html, head, body, div, script, link, Context, title } from "dank-web";
import App from "./src/App";

export default function Server(context: Context) {
  const contextData = {};
  return html(
    head(
      title(context.browser.title),
      script({ src: "/static/gen/bundle.js" }),
      script(
        { type: "text/javascript" },
        "window.__context_data__ = " + JSON.stringify(contextData)
      ),
      link({
        rel: "stylesheet",
        type: "text/css",
        href: "/static/gen/index.css"
      })
    ),
    body(div({id: "app"}, App))
  );
}
`;

export const app_ts = `
import { router, div } from "dank-web";

export default div(
  router({
    routes: [
      { path: "/", render: context => div("Index Page") },
      {
        path: "/example/:id",
        render: context => div("Example param: " + context.browser.request.params.id)
      }
    ],
    renderNotFound: context => {
      return div({ class: "page-not-found" }, "PAGE NOT FOUND: " + context.browser.request.url);
    }
  })
);
`

export const app_scss = `
#app { color: black }
`;
