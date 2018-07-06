"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./context"));
const inquirer_1 = __importDefault(require("inquirer"));
const actions_1 = __importDefault(require("./actions"));
const utils_1 = __importDefault(require("./utils"));
function init() {
    if (context_1.default.state == "exit") {
        process.exit(0);
        return;
    }
    if (context_1.default.state != "default")
        return;
    if (utils_1.default.exists(".", "package.json"))
        return;
    inquirer_1.default
        .prompt([
        {
            name: "state",
            message: `Initialize Project`,
            type: "list",
            choices: [
                { value: "create", name: "Create project files" },
                { value: "exit", name: "Exit" }
            ]
        }
    ])
        .then((answers) => {
        actions_1.default.state.set(answers.state);
    });
    return true;
}
function create() {
    if (context_1.default.state != "create")
        return;
    if (utils_1.default.exists(".", "package.json"))
        return;
    inquirer_1.default
        .prompt([
        {
            name: "name",
            message: `Project Name`,
            type: "input"
        }
    ])
        .then((answers) => {
        actions_1.default.project.init(answers.name);
    });
    return true;
}
function compiler() {
    if (context_1.default.compiler)
        return;
    actions_1.default.compiler.init();
    return true;
}
function server() {
    if (context_1.default.server)
        return;
    actions_1.default.server.init();
    return true;
}
function menu() {
    if (context_1.default.state != "default")
        return;
    inquirer_1.default
        .prompt([
        {
            name: "state",
            message: `Project Name`,
            type: "list",
            choices: [
                { value: "add-element", name: "Add Element" },
                { value: "exit", name: "Exit" }
            ]
        }
    ])
        .then((answers) => {
        actions_1.default.state.set(answers.state);
    });
    return true;
}
exports.default = [init, create, compiler, server, menu];
