"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const slugify_1 = __importDefault(require("slugify"));
const utils_1 = __importDefault(require("../utils"));
function dankInit(project) {
    console.info("🚀 Initializing dank");
    let packageFileContent = `
{
  "name": "${slugify_1.default(project).toLowerCase()}",
  "description": "${project}",
  "version": "1.0.0",
  "main": "dist/index.js",
  "dependencies": {
    "dank-web": "file:../dank-web"
  },
  "prettier": {
    "tabWidth": 2,
    "printWidth": 100
  }
}`;
    const packageFile = utils_1.default.saveFile(".", "package.json", packageFileContent);
    console.log("🍔 Created file", packageFile);
    let appFileContent = `
  import { website, div, script, link } from "dank-web";

  export default website({
    routes: [
      { path: "/", render: context => div("Index") },
      {
        path: "/example/:id",
        render: context => div("Example param: " + context.browser.request.params.id)
      }
    ],
    renderHead: context => {
      const contextData = {};
      return [
        script({ src: "/static/gen/bundle.js" }),
        script(
          { type: "text/javascript" },
          "window.__context_data__ = "+JSON.stringify(contextData)
        ),
        link({
          rel: "stylesheet",
          type: "text/css",
          href: "/static/gen/index.css"
        })
      ];
    },
    renderBody: (children, context) => {
      return div({ id: "app" });
    },
    renderNotFound: context => {
      return div({ class: "page-not-found" }, "PAGE NOT FOUND: " + context.browser.request.url);
    }
  });  

  `;
    let appFile = utils_1.default.saveFile("src", "App.ts", appFileContent);
    console.log("🍔 Created file", appFile);
    let appScssFile = utils_1.default.saveFile("src", "App.scss", `#app { color: black }`);
    console.log("🍔 Created file", appScssFile);
    const indexJsContent = `
import { DomEngine, Context } from "dank-web";
import App from "./src/App";

const domEngine = new DomEngine();

window.onpopstate = function(event) {
  //context.browser.back();
};

window.onerror = function(msg, file, line, col, error) {
  // context.router.error(msg)
  // return false;
};

window.onload = function(event) {
  const appRoot = document.getElementById("app");
  if (appRoot) {
    const contextData = (window as any).__context_data__;
    const context = new Context(contextData);
    domEngine.render(appRoot, App, context);
  }
};
`;
    let indexJs = utils_1.default.saveFile(".", "index.ts", indexJsContent);
    console.log("🍔 Created file", indexJs);
    console.log("");
    console.log("🔽 npm install");
    let npm = child_process_1.spawn("npm", ["install"]);
    npm.stdout.pipe(process.stdout);
    npm.stderr.pipe(process.stderr);
    npm.on("close", code => {
        console.info("🍔 Dank initialized");
    });
}
exports.default = dankInit;
