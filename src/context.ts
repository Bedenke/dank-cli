import Compiler, { CompileCallback } from "./compilers/compiler";
import { Server } from "http";

export type StateType = "default" | "create" | "add-element" | "exit";
export type Rule = () => boolean | undefined;

export class Context {
  state: StateType = "default";
  rules: Rule[] = [];
  compiler?: Compiler;
  compilerCallback?: CompileCallback;
  server?: Server;
  update(state: StateType, error?: any) {
    this.state = state;
    if (error) {
      if (error.response) {
        console.error(`[${error.response.status}] ${error.response.body.message}`);
      } else {
        console.error(error);
      }
    }
    for (let rule of this.rules) {
      if (rule()) {
        break;
      }
    }
  }
}

const context = new Context();

export default context;
