import ts from "typescript";

export default class TsCompiler {
  entryFile: string;
  outputDir: string;

  constructor(entryFile: string, outDir: string) {
    this.entryFile = entryFile;
    this.outputDir = outDir;
  }

  compile(cb: (files: string[]) => void) {
    try {
      console.info("🌶️  Compiling:", this.entryFile);
      let program = ts.createProgram([this.entryFile], {
        module: ts.ModuleKind.CommonJS,
        outDir: this.outputDir
      });
      program.emit();
    } catch (err) {
      console.error("🔥   FAILED");
      console.trace(err.formatted || err);
    }
    cb([this.outputDir]);
  }
}
