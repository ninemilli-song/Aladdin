const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
// const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json')();
// const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
// const koabody = require('koa-body')();
const logger = require('koa-logger')();
const routers = require('./routes/index');
// const users = require('./routes/users');
// const register = require('./routes/register');

const jwtKoa = require('koa-jwt');
// const util = require('util');
const secret = require('./constant/secret-key').secret;
const jwtConstant = require('./constant/jwt');
const ResponsePacker = require('./lib/responsePacker');

// const mysqlConnection = require('./lib/db');

// middlewares
// app.use(convert(koabody));
app.use(convert(bodyparser));
app.use(convert(json));
app.use(convert(logger));

// koa static server for product environment
app.use(require('koa-static')('../dist'));

//
app.use(views(`${__dirname}/views`, {
    extension: 'jade'
}));

// Add mysqlConnection object into the context
// app.context.db = mysqlConnection;

// logger
app.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
});

/**
 * 应用异常处理
 */
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;

            // set cookie 回写到客户端 用户认证失败
            ctx.cookies.set(jwtConstant.IS_AUTHENTICATED, false, {
                maxAge: 10 * 60 * 1000,                                     // cookie有效时长
                httpOnly: false,                                             // 是否只用于http请求中获取
                overwrite: false,                                           // 是否允许重写
            });

            // ctx.body = `Protected resource, ${err}\n`;
            ctx.body = ResponsePacker.error(`Protected resource, ${err}\n`);
        } else {
            throw err;
        }

        // 调用error事件，手动释放error事件
        // 注：try...catch中捕获错误，不会触发error事件，需要手动触发
        ctx.app.emit('error', err, ctx);
    });
});

/**
 * jwt 认证
 */
app.use(jwtKoa({ 
    secret,
    cookie: jwtConstant.TOKEN_COOKIE_NAME,
    issuer: jwtConstant.ISSUER,
    // issuer: 'jwtConstant.ISSUER',
    isRevoked: (ctx, decodedToken) => {
        return new Promise((resolve) => {
            const userId = ctx.cookies.get('aladdin-adminId');

            if (decodedToken.sub === userId) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }
}).unless({
    path: [/^\/auth\/login/]                              // 数组中的路径不需要通过jwt验证
}));

// register router
app.use(routers.routes(), router.allowedMethods());

app.on('error', (err, ctx) => {
    // const context = ctx;
    console.log('App on error => \n', err, ctx);
    // context.body = err;
    // logger.error('server error', err, ctx);
});


module.exports = app;
