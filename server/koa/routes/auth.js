const router = require('koa-router')();
// const authPassport = require('../lib/auth-passport');
const jwt = require('jsonwebtoken');
const secret = require('../constant/secret-key').secret;
const jwtConstant = require('../constant/jwt');
const ResponsePacker = require('../lib/responsePacker');
const auth = require('../model/user');

router.get('/login', async (ctx) => {
    // const user = ctx.request.body;
    const user = ctx.request.query;

    const res = await auth.login(user.mobile, user.password, ctx);
    const { meta, data } = res;
    const userInfo = data;
    console.log('user login userInfo -> : ', userInfo);

    // 透传java server header
    ctx.set('set-cookie', meta.headers['set-cookie']);

    // token签名
    const payload = {
        userId: `${userInfo.id}`,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    };
    
    const token = jwt.sign(payload, secret, {
        // expiresIn: jwtConstant.EXPIRT_TIME,                          // 有效时间
        subject: `${userInfo.id}`,                                      // 该JWT所面向的用户
        issuer: jwtConstant.ISSUER,                                     // 该JWT的签发者
    });

    // set cookie 回写到客户端
    ctx.cookies.set(jwtConstant.TOKEN_COOKIE_NAME, token, {
        // domain: 'localhost:3000',                                // 写cookie所在的域名
        // path: '/index',                                          // 写cookie所在的路径
        maxAge: 10 * 60 * 1000,                                     // cookie有效时长
        // expires: new Date('2017-12-15'),                         // cookie失效时间
        httpOnly: true,                                             // 是否只用于http请求中获取
        overwrite: false                                            // 是否允许重写
    });

    // set cookie 回写到客户端
    ctx.cookies.set(jwtConstant.ADMIN_COOKIE_NAME, userInfo.id, {
        maxAge: 10 * 60 * 1000,                                     // cookie有效时长
        httpOnly: true,                                             // 是否只用于http请求中获取
        overwrite: false,                                           // 是否允许重写
    });

    // set cookie 回写到客户端 用户认证成功
    ctx.cookies.set(jwtConstant.IS_AUTHENTICATED, true, {
        maxAge: 10 * 60 * 1000,                                     // cookie有效时长
        httpOnly: false,                                             // 是否只用于http请求中获取
        overwrite: false,                                           // 是否允许重写
    });

    ctx.body = userInfo;
});

router.get('/logout', async (ctx) => {
    // java 服务退出
    const res = await auth.logout(ctx);
    console.log('user logout ----> ', res);

    // 清除与java server同步的cookie
    ctx.cookies.set('ACCSESSIONID', null);
    ctx.cookies.set('rememberMe', null);

    /**
     * 清空jwt相关cookie
     * 1. token
     * 2. user
     * 3, is authenticated
     */
    ctx.cookies.set(jwtConstant.TOKEN_COOKIE_NAME, null);
    ctx.cookies.set(jwtConstant.ADMIN_COOKIE_NAME, null);
    ctx.cookies.set(jwtConstant.IS_AUTHENTICATED, null);

    ctx.body = ResponsePacker.success();
});

module.exports = router;
