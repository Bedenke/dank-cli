import path from "path";
import instant from "instant";
import express from "express";
import context from "./context";
import dank_renderer from "./dank/dank_renderer";

const localDir = process.cwd();
const staticDir = path.resolve(localDir, ".gen");

const app = express();

const instantMiddleware = instant();

context.compilerCallback = files => {
  for (const file of files) {
    instantMiddleware.reload(path.join("/", "static", file));
  }
};

app.use(instantMiddleware);

app.use(
  "/static/gen",
  express.static(staticDir, {
    fallthrough: false,
    index: false
  })
);

app.get("/*", dank_renderer);

export default app;
