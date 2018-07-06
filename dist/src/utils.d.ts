export default class Utils {
    static saveFile(dir: string, filename: string, content: any, overwrite?: boolean): string;
    static loadFile(dir: string, filename: string): string;
    static exists(dir: string, filename: string): boolean;
}
