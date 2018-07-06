import context from "./src/context";
import rules from "./src/rules";
import actions from "./src/actions";

const main = (args: string[]) => {
  console.info("🌮 Dank");
  context.rules = rules;
  actions.project.load();
};
export default main;
