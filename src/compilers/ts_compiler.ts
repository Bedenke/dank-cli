import ts from "typescript";

export default class TsCompiler {
  entryFiles: string[];
  outputDir: string;

  constructor(entryFiles: string[], outDir: string) {
    this.entryFiles = entryFiles;
    this.outputDir = outDir;
  }

  compile(cb: (files: string[]) => void) {
    try {
      console.info("🌶️  Compiling:", this.entryFiles);
      let program = ts.createProgram(this.entryFiles, {
        module: ts.ModuleKind.CommonJS,
        outDir: this.outputDir
      });
      program.emit();
    } catch (err) {
      console.error("🔥   FAILED");
      console.trace(err.formatted || err);
    }
    cb([]);
  }
}
