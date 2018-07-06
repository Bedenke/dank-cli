"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
class TsCompiler {
    constructor(entryFile, outDir) {
        this.entryFile = entryFile;
        this.outputDir = outDir;
    }
    compile(cb) {
        try {
            console.info("🌶️  Compiling:", this.entryFile);
            let program = typescript_1.default.createProgram([this.entryFile], {
                module: typescript_1.default.ModuleKind.CommonJS,
                outDir: this.outputDir
            });
            program.emit();
        }
        catch (err) {
            console.error("🔥   FAILED");
            console.trace(err.formatted || err);
        }
        cb([this.outputDir]);
    }
}
exports.default = TsCompiler;
