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

// const util = require('util');
const errorHandler = require('./middleware/error-handler');
const jwtVerify = require('./middleware/jwt-verify');

// const mysqlConnection = require('./lib/db');

// middlewares
// app.use(convert(koabody));
app.use(convert(bodyparser));
app.use(convert(json));
app.use(convert(logger));

// koa static server for product environment
app.use(require('koa-static')('../dist'));

// view page
app.use(views(`${__dirname}/views`, {
    extension: 'jade'
}));

// Add mysqlConnection object into the context
// app.context.db = mysqlConnection;

/**
 * 应用异常处理
 */
app.use(errorHandler);

/**
 * jwt 认证
 */
app.use(jwtVerify);

// register router
app.use(routers.routes(), router.allowedMethods());

app.on('error', (err, ctx) => {
    // const context = ctx;
    console.log('App on error => \n', err, ctx);
    // context.body = err;
    // logger.error('server error', err, ctx);
});


module.exports = app;
