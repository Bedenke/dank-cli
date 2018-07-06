export default class ScssCompiler {
    sourceDir: string;
    entryFile: string;
    outputDir: string;
    constructor(srcDir: string, entryFile: string, outDir: string);
    compile(cb: (files: string[]) => void): void;
}
