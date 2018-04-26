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
const index = require('./routes/index');
// const users = require('./routes/users');
// const register = require('./routes/register');
const api = require('./routes/api');
const users = require('./routes/users');

const jwtKoa = require('koa-jwt');
// const util = require('util');
const secret = require('../secret-key').secret;
const jwtConstant = require('./constant/jwt');
const ResponsePacker = require('./lib/responsePacker');

// const mysqlConnection = require('./lib/db');

// middlewares
// app.use(convert(koabody));
app.use(convert(bodyparser));
app.use(convert(json));
app.use(convert(logger));

app.use(require('koa-static')(`${__dirname}/public`));
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
            // ctx.body = `Protected resource, ${err}\n`;
            ctx.body = ResponsePacker.error(`Protected resource, ${err}\n`);
        } else {
            throw err;
        }
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
    isRevoked: (ctx, decodedToken, token) => {
        return new Promise((resolve, reject) => {
            const userId = ctx.cookies.get('aladdin-adminId');

            if (
                decodedToken.sub === userId
            ) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        })
    }
}).unless({
    path: [/^\/users\/login/]                                                       // 数组中的路径不需要通过jwt验证
}));

// define router address
// router.use('/users', users.routes(), users.allowedMethods());
// router.use('/register', register.routes(), register.allowedMethods());

router.use('/users', users.routes(), users.allowedMethods());

router.use('/api', api.routes(), api.allowedMethods());
router.use('*', index.routes(), index.allowedMethods());

// register router
app.use(router.routes(), router.allowedMethods());
// response

app.on('error', (err, ctx) => {
    const context = ctx;
    console.log(err);
    context.body = err;
    logger.error('server error', err, ctx);
});


module.exports = app;
