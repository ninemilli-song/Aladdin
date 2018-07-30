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

    const userInfo = await auth.login(user.mobile, user.password);
    console.log('user login data -> : ', userInfo);

    const payload = {
        userId: userInfo.id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    };

    // token签名
    const token = jwt.sign(payload, secret, { 
        // expiresIn: jwtConstant.EXPIRT_TIME,                             // 有效时间
        subject: userInfo.id,                                      // 该JWT所面向的用户
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

router.get('/logout', (ctx) => {
    // set cookie 回写到客户端
    ctx.cookies.set(jwtConstant.TOKEN_COOKIE_NAME, null, {
        // domain: 'localhost:3000',                                // 写cookie所在的域名
        // path: '/index',                                          // 写cookie所在的路径
        maxAge: 10 * 60 * 1000,                                     // cookie有效时长
        // expires: new Date('2017-12-15'),                         // cookie失效时间
        httpOnly: true,                                             // 是否只用于http请求中获取
        overwrite: false                                            // 是否允许重写
    });

    // set cookie 回写到客户端
    ctx.cookies.set(jwtConstant.ADMIN_COOKIE_NAME, null, {
        maxAge: 10 * 60 * 1000,                                     // cookie有效时长
        httpOnly: true,                                             // 是否只用于http请求中获取
        overwrite: false,                                           // 是否允许重写
    });

    ctx.body = ResponsePacker.success();
});

module.exports = router;
