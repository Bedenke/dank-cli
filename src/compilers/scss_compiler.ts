import path from "path";
import sass from "node-sass";
import fs from "fs-extra";

export default class ScssCompiler {
  sourceDir: string;
  entryFile: string;
  outputDir: string;

  constructor(srcDir: string, entryFile: string, outDir: string) {
    this.sourceDir = srcDir;
    this.entryFile = entryFile;
    this.outputDir = outDir;
  }

  compile(cb: (files: string[]) => void) {
    const sourceFile = this.entryFile;
    console.info("🌶️  Compiling:", sourceFile);

    const parsed = path.parse(sourceFile);
    const relativeDir = parsed.dir.replace(this.sourceDir, "/");
    const cssOutDir = path.join(this.outputDir, relativeDir);
    const cssOutFile = path.join(cssOutDir, parsed.name + ".css");
    const cssOutMinFile = path.join(cssOutDir, parsed.name + ".min.css");

    fs.ensureDirSync(cssOutDir);

    let css = sass.renderSync({ file: sourceFile }).css.toString();
    fs.writeFileSync(cssOutFile, css);
    console.info("🍔 Generated", cssOutFile);

    let minCss = sass
      .renderSync({ file: sourceFile, outputStyle: "compact" })
      .css.toString();
    fs.writeFileSync(cssOutMinFile, minCss);
    console.info("🍔 Generated", cssOutMinFile);

    cb([
      path.join(relativeDir, parsed.name + ".css"),
      path.join(relativeDir, parsed.name + ".min.css")
    ]);
  }
}
