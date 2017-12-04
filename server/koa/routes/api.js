/**
 * Created with JetBrains WebStorm.
 * Author: songxg
 * Date: 16/12/1
 * Time: 下午3:00
 */
const router = require('koa-router')();
const getRolesFilters = require('../model/rolesFilter');

router.get('/register', (ctx) => {
    ctx.body = 'hello api register!!';
});

router.post('/register', (ctx) => {
    ctx.body = ctx.request.body;
});

router.get('/getRolesFilters', async (ctx) => {
    const data = await getRolesFilters(ctx.db);

    ctx.body = data;
});

module.exports = router;
