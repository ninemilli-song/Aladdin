/**
 * Created with JetBrains WebStorm.
 * Author: songxg
 * Date: 16/12/1
 * Time: 下午3:00
 */
const router = require('koa-router')();
const { uploadRole, getRules, getRuleByCodeYear, getSPRuleDetail } = require('../model/roles');
const { getSubjectCategoryByCodeYear, getSubjectsDataByCodeYear } = require('../model/subject');
const { getReportDataByCodeYear } = require('../model/report');
const { 
    getQuestions, 
    getQuestionDetail, 
    addQuestion, 
    concernQuestion, 
    unconcernQuestion, 
    replyQuestion,
    collectAnswer,
    uncollectAnswer,
    approveAnswer,
    disapproveAnswer,
    userAggregateData,
    replyAnswer
} = require('../model/question');
const { findUserById } = require('../model/user');
const ApiError = require('../error/api-error');
const ApiErrorNames = require('../error/api-error-names');

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
        accStandardCode: type,
        exeYear: year,
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

// 获取问题列表
router.get('/qas/getQuestions', async (ctx) => {
    const result = await getQuestions(ctx.request.query, ctx);

    ctx.body = result;
});

// 获取问题详情
router.get('/qas/getQuestionDetail', async (ctx) => {
    const result = await getQuestionDetail(ctx.request.query);

    ctx.body = result;
});

// 提交问题
router.post('/qas/addQuestion', async (ctx) => {
    const result = await addQuestion(ctx.request.body, ctx);

    ctx.body = result;
});

// 关注问题
router.post('/qas/concernQuestion', async (ctx) => {
    const result = await concernQuestion(ctx.request.body, ctx);
    
    ctx.body = result;
});

// 取消关注问题
router.post('/qas/unconcernQuestion', async (ctx) => {
    const result = await unconcernQuestion(ctx.request.body, ctx);

    ctx.body = result;
});

// 回复问题
router.post('/qas/replyQuestion', async (ctx) => {
    const result = await replyQuestion(ctx.request.body);

    ctx.body = result;
});

// 收藏回答
router.post('/qas/collectAnswer', async (ctx) => {
    const result = await collectAnswer(ctx.request.body);

    ctx.body = result;
});

// 取消收藏回答
router.post('/qas/uncollectAnswer', async (ctx) => {
    const result = await uncollectAnswer(ctx.request.body);

    ctx.body = result;
});

// 赞回答
router.post('/qas/approveAnswer', async (ctx) => {
    const result = await approveAnswer(ctx.request.body);

    ctx.body = result;
});

// 反对回答
router.post('/qas/disapproveAnswer', async (ctx) => {
    const result = await disapproveAnswer(ctx.request.body);

    ctx.body = result;
});

// 获取用户相关的问题汇总数据
router.get('/qas/userAggregateData', async (ctx) => {
    const result = await userAggregateData(ctx.request.query, ctx);

    ctx.body = result;
});

// 回复Answer
router.post('/qas/replyAnswer', async (ctx) => {
    const result = await replyAnswer(ctx.request.body);

    ctx.body = result;
});

// 获取会计科目分类
router.get('/getSubjectCategory', async (ctx) => {
    const { type, year } = ctx.request.query;

    const result = await getSubjectCategoryByCodeYear({
        accStandardCode: type,
        exeYear: year,
    });

    ctx.body = result;
});

// 获取会计科目数据
router.get('/getSubjectsData', async (ctx) => {
    const { type, year } = ctx.request.query;

    const result = await getSubjectsDataByCodeYear({
        accStandardCode: type,
        exeYear: year,
    });

    ctx.body = result;
});

// 获取会计科目数据
router.get('/getReportData', async (ctx) => {
    const { type, year } = ctx.request.query;

    const result = await getReportDataByCodeYear({
        accStandardCode: type,
        exeYear: year,
    });

    ctx.body = result;
});

// 获取 用户信息
router.get('/user/getUserInfo', async (ctx) => {
    // 通过ctx.state.user判断用户是否认证，并抛出相关异常
    // koa-jwt 验证通过后会自动添加ctx.state.user对象
    if (ctx.state.user) {                                  
        // ctx.body = ctx.state.user;
        console.log('user/getUserInfo', ctx.state);
        const userId = ctx.state.user.sub;

        const result = await findUserById(userId, ctx);

        ctx.body = result;
    } else {
        throw new ApiError(ApiErrorNames.USER_NOT_SIGNIN);
    }
});

module.exports = router;
