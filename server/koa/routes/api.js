/**
 * Created with JetBrains WebStorm.
 * Author: songxg
 * Date: 16/12/1
 * Time: 下午3:00
 */
const router = require('koa-router')();
const { getRolesFilters, uploadRole } = require('../model/roles');

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

router.post('/uploadRole', async (ctx) => {
    const data = ctx.request.body;

    const { type, year, content } = data;

    const result = await uploadRole(ctx.db, {
        typeId: type,
        yearId: year,
        content,
    });

    ctx.body = result;
});

module.exports = router;
