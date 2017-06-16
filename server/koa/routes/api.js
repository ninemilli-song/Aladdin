/**
 * Created with JetBrains WebStorm.
 * Author: songxg
 * Date: 16/12/1
 * Time: 下午3:00
 */
var router = require('koa-router')();
var bodyParse = require('koa-body')();

router.get('/register', (ctx, next) => {
    ctx.body = 'hello api register!!';
});

router.post('/register', (ctx, next) => {
    ctx.body = ctx.request.body;
});

module.exports = router;
