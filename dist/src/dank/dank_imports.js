"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = __importDefault(require("../utils"));
function dankImports() {
    console.info("🚀 Importing elements and styles");
    const directory = process.cwd();
    const scssFound = [];
    let walk = function (dir) {
        let list = fs_extra_1.default.readdirSync(dir);
        list.forEach(function (file) {
            file = dir + "/" + file;
            let stat = fs_extra_1.default.statSync(file);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                walk(file);
            }
            else {
                /* Is a file */
                let parsed = path_1.default.parse(file);
                if (parsed.ext == ".scss") {
                    scssFound.push(parsed);
                }
            }
        });
    };
    walk(path_1.default.join(directory, "src"));
    const importScss = scssFound.map(file => {
        let source = path_1.default.join(file.dir.replace(directory, "."), file.name);
        return `@import '${source}';`;
    });
    const scssContent = `${importScss.join("\n")}`;
    const indexScssFile = utils_1.default.saveFile(".", "index.scss", scssContent, true);
    console.log("🍔 Generated file", indexScssFile);
}
exports.default = dankImports;
