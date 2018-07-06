"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const instant_1 = __importDefault(require("instant"));
const express_1 = __importDefault(require("express"));
const context_1 = __importDefault(require("./context"));
const dank_renderer_1 = __importDefault(require("./dank/dank_renderer"));
const localDir = process.cwd();
const staticDir = path_1.default.resolve(localDir, ".gen");
const app = express_1.default();
const instantMiddleware = instant_1.default();
context_1.default.compilerCallback = files => {
    for (const file of files) {
        instantMiddleware.reload(path_1.default.join("/", "static", file));
    }
};
app.use(instantMiddleware);
app.use("/static/gen", express_1.default.static(staticDir, {
    fallthrough: false,
    index: false
}));
app.get("/*", dank_renderer_1.default);
exports.default = app;
