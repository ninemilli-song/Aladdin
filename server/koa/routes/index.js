const router = require('koa-router')();
const api = require('./api');
const auth = require('./auth');
const responseFormatter = require('../middleware/response_formatter');

// 添加格式化处理响应结果的中间件，在路由之前调用
// 仅对api开头的url进行格式化
router.use(responseFormatter('^/api|^/auth'));

// 用户认证相关路由
router.use('/auth', auth.routes(), auth.allowedMethods());

// Rest api
router.use('/api', api.routes(), api.allowedMethods());

router.get('*', async (ctx, next) => {
    ctx.state = {
        title: 'koa2 title'
    };

    await ctx.render('index', {});

    next();
});
module.exports = router;
