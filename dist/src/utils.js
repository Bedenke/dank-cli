"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class Utils {
    static saveFile(dir, filename, content, overwrite = false) {
        const localDir = path_1.default.join(process.cwd(), dir);
        fs_extra_1.default.ensureDirSync(localDir);
        const localFilename = path_1.default.join(localDir, filename);
        if (!fs_extra_1.default.existsSync(localFilename) || overwrite) {
            fs_extra_1.default.writeFileSync(localFilename, content);
        }
        return localFilename;
    }
    static loadFile(dir, filename) {
        const localDir = path_1.default.join(process.cwd(), dir);
        const localFilename = path_1.default.join(localDir, filename);
        if (!fs_extra_1.default.existsSync(localFilename)) {
            return fs_extra_1.default.readFileSync(localFilename).toString();
        }
        return "";
    }
    static exists(dir, filename) {
        const localDir = path_1.default.join(process.cwd(), dir);
        const localFilename = path_1.default.join(localDir, filename);
        return fs_extra_1.default.existsSync(localFilename);
    }
}
exports.default = Utils;
