import path from "path";
import instant from "instant";
import express from "express";
import context from "./context";
import cookieParser from "cookie-parser";
import dank_renderer from "./dank/dank_renderer";

const localDir = process.cwd();
const staticDir = path.resolve(localDir, ".gen", "static");

const app = express();
app.use(cookieParser());

const instantMiddleware = instant();

context.compilerCallback = files => {
  for (const file of files) {
    const url = path.join("/", "static", "gen", file);
    instantMiddleware.reload(url);
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

app.use(dank_renderer);

export default app;
