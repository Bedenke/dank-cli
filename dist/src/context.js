"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor() {
        this.state = "default";
        this.rules = [];
    }
    update(state, error) {
        this.state = state;
        if (error) {
            if (error.response) {
                console.error(`[${error.response.status}] ${error.response.body.message}`);
            }
            else {
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
exports.Context = Context;
const context = new Context();
exports.default = context;
