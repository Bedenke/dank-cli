import path from "path";
import fs from "fs-extra";

export default class Utils {
  static saveFile(dir: string, filename: string, content: any, overwrite: boolean = false) {
    const localDir = path.join(process.cwd(), dir);
    fs.ensureDirSync(localDir);
    const localFilename = path.join(localDir, filename);
    if (!fs.existsSync(localFilename) || overwrite) {
      fs.writeFileSync(localFilename, content);
    }
    return localFilename;
  }

  static loadFile(dir: string, filename: string): string {
    const localDir = path.join(process.cwd(), dir);
    const localFilename = path.join(localDir, filename);
    if (!fs.existsSync(localFilename)) {
      return fs.readFileSync(localFilename).toString();
    }
    return "";
  }

  static exists(dir: string, filename: string) {
    const localDir = path.join(process.cwd(), dir);
    const localFilename = path.join(localDir, filename);
    return fs.existsSync(localFilename);
  }
}
