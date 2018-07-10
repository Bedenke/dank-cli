"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const node_sass_1 = __importDefault(require("node-sass"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class ScssCompiler {
    constructor(srcDir, entryFile, outDir) {
        this.sourceDir = srcDir;
        this.entryFile = entryFile;
        this.outputDir = outDir;
    }
    compile(cb) {
        const sourceFile = this.entryFile;
        console.info("🌶️  Compiling:", sourceFile);
        const cssOutFile = path_1.default.join(this.outputDir, "index.css");
        fs_extra_1.default.ensureDirSync(this.outputDir);
        let css = node_sass_1.default.renderSync({ file: sourceFile }).css.toString();
        fs_extra_1.default.writeFileSync(cssOutFile, css);
        console.info("🍔 Generated", cssOutFile);
        // let minCss = sass
        //   .renderSync({ file: sourceFile, outputStyle: "compact" })
        //   .css.toString();
        // fs.writeFileSync(cssOutMinFile, minCss);
        // console.info("🍔 Generated", cssOutMinFile);
        cb([
            "index.css",
        ]);
    }
}
exports.default = ScssCompiler;
