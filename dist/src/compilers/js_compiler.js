"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const webpack_1 = __importDefault(require("webpack"));
class JsCompiler {
    constructor(entryFile, outDir) {
        this.entryFile = entryFile;
        this.outputDir = outDir;
    }
    compile(cb) {
        let compiler = webpack_1.default({
            devtool: "eval",
            mode: "development",
            entry: [this.entryFile],
            output: {
                path: this.outputDir,
                filename: "bundle.js"
            },
            resolve: {
                extensions: [".js"]
            }
        });
        fs_extra_1.default.ensureDirSync(this.outputDir);
        console.info("🌶️  Compiling:", this.entryFile);
        const outputFile = path_1.default.join(this.outputDir, "bundle.js");
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                // Handle errors here
                console.error(err, stats);
                return;
            }
            console.info("🍔 Generated", outputFile);
            cb(["bundle.js"]);
        });
    }
}
exports.default = JsCompiler;
