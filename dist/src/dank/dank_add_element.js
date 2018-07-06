"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function dankAddElement(directory, elementPath) {
    if (!elementPath) {
        console.info("🔥 Missing the element path/ElementName");
        console.info("💻 dank +element path/to/ElementName");
        return;
    }
    let parsed = path_1.default.parse(elementPath);
    const elementName = parsed.name;
    const dashed = elementName
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
    let elementFileContent = `
import { div } from "dank-web";

export interface ${elementName}Attributes {
}
export default function ${elementName}(attributes: ${elementName}Attributes) {
  return div({ 
      class: "${dashed}" 
    },
    div("Wow, look at my brand new element:"),
    div("${elementName}")
  );
}`;
    let elementDir = path_1.default.join(directory, "src", "elements", parsed.dir);
    if (!fs_extra_1.default.existsSync(elementDir)) {
        fs_extra_1.default.ensureDirSync(elementDir);
        console.info("🌮 Created folder", elementDir);
    }
    let elementFile = path_1.default.join(elementDir, `${elementName}.ts`);
    fs_extra_1.default.writeFileSync(elementFile, elementFileContent);
    console.info("🌮 Created file", elementFile);
}
exports.default = dankAddElement;
