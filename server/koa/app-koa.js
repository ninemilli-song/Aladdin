const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json')();
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
//const koabody = require('koa-body')();
const logger = require('koa-logger')();

const index = require('./routes/index');
const users = require('./routes/users');
const register = require('./routes/register');
const api = require('./routes/api');

// middlewares
//app.use(convert(koabody));
app.use(convert(bodyparser));
app.use(convert(json));
app.use(convert(logger));

app.use(require('koa-static')(__dirname + '/public'));
//
app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(convert(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));

// define router address
//router.use('/users', users.routes(), users.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('*', index.routes(), index.allowedMethods());

// register router
app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err);
  ctx.body = err;
  logger.error('server error', err, ctx);
});


module.exports = app;
