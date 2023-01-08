require("dotenv").config();
const Koa = require("koa");
const Router = require("@koa/router");
const db = require("./lib/knex");

const app = new Koa();
const router = new Router({ prefix: "/api" });
const scrapperService = require("./services/SteamScrapper.service");

// constants
const port = process.env.PORT ?? 3002;

//contexts
app.context.db = db;

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

scrapperService.initScrape();

// routes
router.get("/", (ctx, next) => {
  ctx.body = "Hello World";
});

// response
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});
