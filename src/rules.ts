import context from "./context";
import inquirer from "inquirer";
import actions from "./actions";
import Utils from "./utils";

function init() {
  if (context.state == "exit") {
    process.exit(0);
    return;
  }
  if (context.state != "default") return;
  if (Utils.exists(".", "package.json")) return;
  inquirer
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
    .then((answers: any) => {
      actions.state.set(answers.state);
    });
  return true;
}

function create() {
  if (context.state != "create") return;
  if (Utils.exists(".", "package.json")) return;
  inquirer
    .prompt([
      {
        name: "name",
        message: `Project Name`,
        type: "input"
      }
    ])
    .then((answers: any) => {
      actions.project.init(answers.name);
    });
  return true;
}

function compiler() {
  if (context.compiler) return;
  actions.compiler.init();
  return true;
}

function server() {
  if (context.server) return;
  actions.server.init();
  return true;
}

function menu() {
  if (context.state != "default") return;
  inquirer
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
    .then((answers: any) => {
      actions.state.set(answers.state);
    });
  return true;
}

export default [init, create, compiler, server, menu];