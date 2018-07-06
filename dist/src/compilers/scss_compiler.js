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
        const parsed = path_1.default.parse(sourceFile);
        const relativeDir = parsed.dir.replace(this.sourceDir, "/");
        const cssOutDir = path_1.default.join(this.outputDir, relativeDir);
        const cssOutFile = path_1.default.join(cssOutDir, parsed.name + ".css");
        const cssOutMinFile = path_1.default.join(cssOutDir, parsed.name + ".min.css");
        fs_extra_1.default.ensureDirSync(cssOutDir);
        let css = node_sass_1.default.renderSync({ file: sourceFile }).css.toString();
        fs_extra_1.default.writeFileSync(cssOutFile, css);
        console.info("🍔 Generated", cssOutFile);
        let minCss = node_sass_1.default
            .renderSync({ file: sourceFile, outputStyle: "compact" })
            .css.toString();
        fs_extra_1.default.writeFileSync(cssOutMinFile, minCss);
        console.info("🍔 Generated", cssOutMinFile);
        cb([
            path_1.default.join(relativeDir, parsed.name + ".css"),
            path_1.default.join(relativeDir, parsed.name + ".min.css")
        ]);
    }
}
exports.default = ScssCompiler;
