import path from "path";
import fs from "fs-extra";
import Webpack from "webpack";

export default class JsCompiler {
  entryFile: string;
  outputDir: string;

  constructor(entryFile: string, outDir: string) {
    this.entryFile = entryFile;
    this.outputDir = outDir;
  }

  compile(cb: (files: string[]) => void) {
    let compiler = Webpack({
      devtool: "eval",
      mode: "development",
      entry: [this.entryFile],
      output: {
        path: this.outputDir,
        filename: "bundle.js"
      },
      resolve: {
        extensions: [".js"]
      }
    });

    fs.ensureDirSync(this.outputDir);

    console.info("🌶️  Compiling:", this.entryFile);

    const outputFile = path.join(this.outputDir,"bundle.js");
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.error(err, stats);        
        return;
      }

      console.info("🍔 Generated", outputFile);
      cb(["bundle.js"]);
    });
  }
}
