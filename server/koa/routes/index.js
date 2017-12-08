const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    ctx.state = {
        title: 'koa2 title'
    };

    await ctx.render('index', {});
});
module.exports = router;
