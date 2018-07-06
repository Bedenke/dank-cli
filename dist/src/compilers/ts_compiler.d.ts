export default class TsCompiler {
    entryFile: string;
    outputDir: string;
    constructor(entryFile: string, outDir: string);
    compile(cb: (files: string[]) => void): void;
}
