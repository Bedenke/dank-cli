"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const utils_1 = __importDefault(require("../utils"));
const dank_templates_1 = require("./dank_templates");
function dankInit(project) {
    console.info("🚀 Initializing dank");
    const packageFile = utils_1.default.saveFile(".", "package.json", dank_templates_1.package_json(project));
    console.log("🍔 Created file", packageFile);
    let appFile = utils_1.default.saveFile("src", "App.ts", dank_templates_1.app_ts);
    console.log("🍔 Created file", appFile);
    let appScssFile = utils_1.default.saveFile("src", "App.scss", dank_templates_1.app_scss);
    console.log("🍔 Created file", appScssFile);
    let clientJSFile = utils_1.default.saveFile(".", "client.ts", dank_templates_1.client_ts);
    console.log("🍔 Created file", clientJSFile);
    let serverJSFile = utils_1.default.saveFile(".", "server.ts", dank_templates_1.server_ts);
    console.log("🍔 Created file", serverJSFile);
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
