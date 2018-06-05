const router = require('koa-router')();

router.get('/', async (ctx) => {
    ctx.state = {
        title: 'koa2 title'
    };

    await ctx.render('index', {});
});
module.exports = router;
