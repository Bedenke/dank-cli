export default class JsCompiler {
    entryFile: string;
    outputDir: string;
    constructor(entryFile: string, outDir: string);
    compile(cb: (files: string[]) => void): void;
}
