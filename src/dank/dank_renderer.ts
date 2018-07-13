import express from "express";
import {Context, HtmlEngine} from "dank-web";
import path from "path";

const htmlPrefix = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`;

export default async (req: express.Request, res:express.Response) => {
  try {
    // Clear cached modules
    const sourceDirectory = path.join(process.cwd(), "src");
    for (let k of Object.keys(require.cache)) {
      if (k.indexOf(sourceDirectory) >= 0) {
        delete require.cache[k];
      }
    }

    let transpiledSourceFile = path.join(process.cwd(), ".gen", "dist", "server.js");
    const importedJS = require(transpiledSourceFile);
    const Server = importedJS.default;

    let context = new Context({
      stores: {
        session: req.cookies.session
      }
    });
    context.browser.setTitle("Dank Dev");
    context.browser.go(req.url);    

    const htmlEngine = new HtmlEngine();
    const html = await htmlEngine.render(Server(context), context);

    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(htmlPrefix + html);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}