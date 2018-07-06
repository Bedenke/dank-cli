import JsCompiler from "./js_compiler";
import ScssCompiler from "./scss_compiler";
import TsCompiler from "./ts_compiler";
export declare type CompileCallback = (files: string[]) => void;
export default class Compiler {
    sourceDir: string;
    ts: TsCompiler;
    js: JsCompiler;
    scss: ScssCompiler;
    constructor();
    compile(cb: CompileCallback): void;
    watch(cb: CompileCallback): void;
}
