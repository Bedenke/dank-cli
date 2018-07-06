/// <reference types="node" />
import Compiler, { CompileCallback } from "./compilers/compiler";
import { Server } from "http";
export declare type StateType = "default" | "create" | "add-element" | "exit";
export declare type Rule = () => boolean | undefined;
export declare class Context {
    state: StateType;
    rules: Rule[];
    compiler?: Compiler;
    compilerCallback?: CompileCallback;
    server?: Server;
    update(state: StateType, error?: any): void;
}
declare const context: Context;
export default context;
