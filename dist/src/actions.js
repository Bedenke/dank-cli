"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./context"));
const http_1 = require("http");
const utils_1 = __importDefault(require("./utils"));
const compiler_1 = __importDefault(require("./compilers/compiler"));
const server_1 = __importDefault(require("./server"));
const dank_init_1 = __importDefault(require("./dank/dank_init"));
const dank_imports_1 = __importDefault(require("./dank/dank_imports"));
const actions = {
    state: {
        set(state) {
            context_1.default.update(state);
        }
    },
    project: {
        load: () => {
            context_1.default.update("default");
        },
        init: (name) => {
            utils_1.default.saveFile(".", ".gitignore", ".gen");
            dank_init_1.default(name);
            dank_imports_1.default();
            context_1.default.update("default");
        }
    },
    compiler: {
        init: () => {
            context_1.default.compiler = new compiler_1.default();
            context_1.default.compiler.compile(files => { });
            context_1.default.update("default");
        }
    },
    server: {
        init: () => {
            const port = process.env.PORT || 8080;
            const server = new http_1.Server(server_1.default);
            context_1.default.server = server;
            server.listen(port, function () {
                console.info("Server running  http://localhost:" + port);
                if (context_1.default.compiler && context_1.default.compilerCallback) {
                    context_1.default.compiler.watch(context_1.default.compilerCallback);
                }
                context_1.default.update("default");
            });
        }
    }
};
exports.default = actions;
