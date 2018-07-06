import context, { StateType } from "./context";
import { Server } from "http";
import path from "path";
import Utils from "./utils";
import Compiler from "./compilers/compiler";
import app from "./server";
import dankInit from "./dank/dank_init";
import dankImports from "./dank/dank_imports";

const actions = {
  state: {
    set(state: StateType) {
      context.update(state);
    }
  },
  project: {
    load: () => {
      context.update("default");
    },
    init: (name: string) => {
      Utils.saveFile(".", ".gitignore", ".gen");
      dankInit(name);
      dankImports();
      context.update("default");
    }
  },
  compiler: {
    init: () => {
      context.compiler = new Compiler();
      context.compiler.compile(files => {});
      context.update("default");
    }
  },
  server: {
    init: () => {
      const port = process.env.PORT || 8080;
      const server = new Server(app);
      context.server = server;
      server.listen(port, function() {
        console.info("Server running  http://localhost:" + port);
        if (context.compiler && context.compilerCallback) {
          context.compiler.watch(context.compilerCallback);
        }
        context.update("default");
      });
    }
  }
};

export default actions;
