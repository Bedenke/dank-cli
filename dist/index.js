"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./src/context"));
const rules_1 = __importDefault(require("./src/rules"));
const actions_1 = __importDefault(require("./src/actions"));
const main = (args) => {
    console.info("🌮 Dank");
    context_1.default.rules = rules_1.default;
    actions_1.default.project.load();
};
exports.default = main;
