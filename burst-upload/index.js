const Koa = require("koa");
const Router = require("koa-router");
const server = require("koa-static");
const multiparty = require("multiparty");
const path = require("path");

const app = new Koa();
const router = new Router();

router.post("/upload", async ctx => {
  const form = new multiparty.Form({ uploadDir: ".temp" });
  form.parse(ctx.req);
  form.on("file", () => {
    console.log("上传成功");
  });
  ctx.response.body = "上传成功";
});

app.use(router.routes());
app.use(server(path.join(__dirname, "./public")));

app.listen(5173, () => {
  console.log("server run on http://localhost:5173");
});
