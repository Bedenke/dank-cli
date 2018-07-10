import { spawn } from "child_process";
import Utils from "../utils";
import { package_json, app_ts, app_scss, client_ts, server_ts } from "./dank_templates";

export default function dankInit(project: string) {
  console.info("🚀 Initializing dank");

  const packageFile = Utils.saveFile(".", "package.json", package_json(project));
  console.log("🍔 Created file", packageFile);

  let appFile = Utils.saveFile("src", "App.ts", app_ts);
  console.log("🍔 Created file", appFile);

  let appScssFile = Utils.saveFile("src", "App.scss", app_scss);
  console.log("🍔 Created file", appScssFile);

  let clientJSFile = Utils.saveFile(".", "client.ts", client_ts);
  console.log("🍔 Created file", clientJSFile);

  let serverJSFile = Utils.saveFile(".", "server.ts", server_ts);
  console.log("🍔 Created file", serverJSFile);

  console.log("");
  console.log("🔽 npm install");
  let npm = spawn("npm", ["install"]);

  npm.stdout.pipe(process.stdout)
  npm.stderr.pipe(process.stderr)

  npm.on("close", code => {
    console.info("🍔 Dank initialized");
  });
}
