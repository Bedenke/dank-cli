import path from "path";
import watch from "node-watch";
import JsCompiler from "./js_compiler";
import ScssCompiler from "./scss_compiler";
import TsCompiler from "./ts_compiler";
import dankImports from "../dank/dank_imports";

const tsExtensions: any = { ".ts": true };
const jsExtensions: any = { ".js": true };
const cssExtensions: any = { ".scss": true };

export type CompileCallback = (files: string[]) => void;

export default class Compiler {
  sourceDir: string;
  ts: TsCompiler;
  js: JsCompiler;
  scss: ScssCompiler;

  constructor() {
    const localDir = process.cwd();
    this.sourceDir = path.join(localDir);
    const outputDir = path.join(localDir, ".gen");
    const outputDistDir = path.join(localDir, ".gen", "dist");
    const outputStaticDir = path.join(localDir, ".gen", "static");
    this.ts = new TsCompiler(
      [path.join(localDir, "client.ts"), path.join(localDir, "server.ts")],
      outputDistDir
    );
    this.js = new JsCompiler(path.join(outputDir, "dist", "client.js"), outputStaticDir);
    this.scss = new ScssCompiler(
      this.sourceDir,
      path.join(localDir, "index.scss"),
      outputStaticDir
    );
  }

  compile(cb: CompileCallback) {
    dankImports();
    this.ts.compile(files => {
      this.js.compile(files => {
        this.scss.compile(cb);
      });
    });
  }

  watch(cb: CompileCallback) {
    console.info("✅ Watching", this.sourceDir);
    const _this = this;
    watch(this.sourceDir, { recursive: true }, function(evt: any, name: any) {
      let parsed = path.parse(name);

      if (tsExtensions[parsed.ext]) {
        if (parsed.dir.indexOf(".gen") >= 0) return;
        return _this.ts.compile(() => _this.js.compile(cb));
      }

      if (cssExtensions[parsed.ext]) {
        return _this.scss.compile(cb);
      }
    });
  }
}
