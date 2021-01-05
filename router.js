const Router = require('koa-router');

const router = new Router();

module.exports = router;

function setRouter(needCheckLogin, method, accessPath, interfaceHandlerFile){
    async function handler(ctx) {

        let interfaceHandler = require(interfaceHandlerFile);
        // Restful API 风格
        // setRouter(false, "GET", '/verify/:age/:id/:sex', './controllers/verify');
        // "params": {
        //     "age": "1",
        //     "id": "2",
        //     "sex": "3"
        // }

        for (let paraKey in ctx.params) {
            ctx.query[paraKey] = ctx.params[paraKey];
        }
        ctx.body = await interfaceHandler(ctx.query, ctx.request.body, ctx.headers, ctx);
    }

    if (method === "GET") {
        router.get(accessPath, handler);
    } else if (method === "POST"){
        router.post(accessPath, handler);
    } else {
        console.log('Method is not POST|GET');
    }
}

setRouter(true, "GET", '/test', './controllers/test');
