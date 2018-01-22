/**
 * Created with JetBrains WebStorm.
 * Author: songxg
 * Date: 16/12/1
 * Time: 下午3:00
 */
const router = require('koa-router')();
const { uploadRole, getGPByCodeYear, getRules, getRuleByCodeYear, getSPRuleDetail } = require('../model/roles');

router.get('/register', (ctx) => {
    ctx.body = 'hello api register!!';
});

router.post('/register', (ctx) => {
    ctx.body = ctx.request.body;
});

router.get('/getRolesFilters', async (ctx) => {
    // const data = await getRolesFilters(ctx.db);
    const data = await getRules();

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
router.get('/getRule', async (ctx) => {
    const { type, year } = ctx.request.query;

    const result = await getRuleByCodeYear({
        type,
        year,
    });

    ctx.body = result;
});

// Get sp rule detail
router.get('/getSPRuleDetail', async (ctx) => {
    const { spID } = ctx.request.query;

    const result = await getSPRuleDetail({
        spID
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
