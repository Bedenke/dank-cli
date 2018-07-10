"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
function package_json(project) {
    return `
{
  "name": "${slugify_1.default(project).toLowerCase()}",
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
`;
}
exports.package_json = package_json;
exports.client_ts = `
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
exports.server_ts = `
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
exports.app_ts = `
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
`;
exports.app_scss = `
#app { color: black }
`;
