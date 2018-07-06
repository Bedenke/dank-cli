"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const node_watch_1 = __importDefault(require("node-watch"));
const js_compiler_1 = __importDefault(require("./js_compiler"));
const scss_compiler_1 = __importDefault(require("./scss_compiler"));
const ts_compiler_1 = __importDefault(require("./ts_compiler"));
const dank_imports_1 = __importDefault(require("../dank/dank_imports"));
const tsExtensions = { ".ts": true };
const jsExtensions = { ".js": true };
const cssExtensions = { ".scss": true };
class Compiler {
    constructor() {
        const localDir = process.cwd();
        this.sourceDir = path_1.default.join(localDir, "src");
        const outputDir = path_1.default.join(localDir, ".gen");
        this.ts = new ts_compiler_1.default(path_1.default.join(localDir, "index.ts"), path_1.default.join(outputDir, "dist"));
        this.js = new js_compiler_1.default(path_1.default.join(outputDir, "dist", "index.js"), outputDir);
        this.scss = new scss_compiler_1.default(this.sourceDir, path_1.default.join(localDir, "index.scss"), outputDir);
    }
    compile(cb) {
        dank_imports_1.default();
        this.ts.compile(files => {
            this.js.compile(files => {
                this.scss.compile(cb);
            });
        });
    }
    watch(cb) {
        console.info("✅ Watching", this.sourceDir);
        const _this = this;
        node_watch_1.default(this.sourceDir, { recursive: true }, function (evt, name) {
            let parsed = path_1.default.parse(name);
            if (tsExtensions[parsed.ext]) {
                return _this.ts.compile(cb);
            }
            if (jsExtensions[parsed.ext]) {
                return _this.js.compile(cb);
            }
            if (cssExtensions[parsed.ext]) {
                return _this.scss.compile(cb);
            }
        });
    }
}
exports.default = Compiler;
