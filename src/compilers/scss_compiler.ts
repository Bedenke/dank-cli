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

    const cssOutFile = path.join(this.outputDir, "index.css");

    fs.ensureDirSync(this.outputDir);

    let css = sass.renderSync({ file: sourceFile }).css.toString();
    fs.writeFileSync(cssOutFile, css);
    console.info("🍔 Generated", cssOutFile);

    // let minCss = sass
    //   .renderSync({ file: sourceFile, outputStyle: "compact" })
    //   .css.toString();
    // fs.writeFileSync(cssOutMinFile, minCss);
    // console.info("🍔 Generated", cssOutMinFile);

    cb([
      "index.css",
      //path.join(relativeDir, parsed.name + ".min.css")
    ]);
  }
}
