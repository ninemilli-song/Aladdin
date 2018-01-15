/**
 * Created with JetBrains WebStorm.
 * Author: songxg
 * Date: 16/12/1
 * Time: 下午3:00
 */
const router = require('koa-router')();
const { getRolesFilters, uploadRole, findRoleByValue } = require('../model/roles');

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

// Get Accounting Role.
router.get('/getRole', async (ctx) => {
    const { type, year } = ctx.request.query;

    const result = await findRoleByValue(ctx.db, {
        type,
        year,
    });

    ctx.body = result;
});

router.get('/qas/getQuestions', async (ctx) => {
    console.log('/qas/getQuestions ----> ', ctx);

    ctx.body = {
        a: 'a'
    };
});

module.exports = router;
