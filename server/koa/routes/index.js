const router = require('koa-router')();
const api = require('./api');
const auth = require('./auth');

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
