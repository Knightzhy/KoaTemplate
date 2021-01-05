const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static-cache');
const koaBody = require('koa-body');
const koaViews = require('koa-views');
const cors = require('@koa/cors');

const router = require('./router');

const app = new Koa();


app.use(koaStatic(path.join(__dirname, './public'), {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 一个月, 如果url无md5, 需要缩小缓存时长
}));

app.use(koaBody({
  // multipart: true,
  formLimit: "500mb",
  jsonLimit: "500mb"
}));

app.use(koaViews(path.join(__dirname, './views'), {
  extension: 'ejs',
}));

app.use(cors({
        credentials: true,
        origin: function(ctx) {
            console.log('CTX:', ctx);
            return ctx.headers.origin;
        },
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
}))

app.use(async (ctx, next) => {
    if (ctx.headers.origin) {
        if (ctx.request.method === "OPTIONS") {
            ctx.status = 200;
            ctx.response.status = 200;

            ctx.body = {
                code: 1001,
                message: "OPTIONS请求，直接返回"
            };

            // console.log("OPTIONS请求，直接返回");

            return;
        }
    }
    await next();
})

app.use(router.routes())
    .use(router.allowedMethods());

module.exports = app;
