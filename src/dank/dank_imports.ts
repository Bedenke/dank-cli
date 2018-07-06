import path from "path";
import fs from "fs-extra";
import Utils from "../utils";

export default function dankImports() {
  console.info("🚀 Importing elements and styles");

  const directory =  process.cwd();

  const scssFound: path.ParsedPath[] = [];

  let walk = function(dir: string) {
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
      file = dir + "/" + file;
      let stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        walk(file);
      } else {
        /* Is a file */
        let parsed = path.parse(file);
        if (parsed.ext == ".scss") {
          scssFound.push(parsed);
        }
      }
    });
  };

  walk(path.join(directory, "src"));

  const importScss = scssFound.map(file => {
    let source = path.join(file.dir.replace(directory, "."), file.name);
    return `@import '${source}';`;
  });

  const scssContent = `${importScss.join("\n")}`;
  const indexScssFile = Utils.saveFile(".", "index.scss", scssContent, true);
  console.log("🍔 Generated file", indexScssFile);
}
