"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dank_web_1 = require("dank-web");
const path_1 = __importDefault(require("path"));
const htmlPrefix = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`;
exports.default = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let context = new dank_web_1.Context({});
        context.browser.setTitle("Dank Dev");
        context.browser.go(req.url);
        // Clear cached modules
        const sourceDirectory = path_1.default.join(process.cwd(), "src");
        for (let k of Object.keys(require.cache)) {
            if (k.indexOf(sourceDirectory) >= 0) {
                delete require.cache[k];
            }
        }
        let transpiledSourceFile = path_1.default.join(process.cwd(), ".gen", "dist", "server.js");
        const importedJS = require(transpiledSourceFile);
        const Server = importedJS.default;
        const htmlEngine = new dank_web_1.HtmlEngine();
        const html = yield htmlEngine.render(Server(context), context);
        res.set("Content-Type", "text/html; charset=utf-8");
        res.send(htmlPrefix + html);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
