const router = require('koa-router')();
const authPassport = require('../../auth-passport');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const secret = require('../../secret-key').secret;
const jwtConstant = require('../constant/jwt');

// get users
let users;
authPassport.readUsers()
    .then((_users) => {
        users = _users;
    })
    .catch((error) => {
        winston.info('error', error);
    });

router.get('/login', (ctx) => {
    // const user = ctx.request.body;
    const user = ctx.request.query;

    if (user && user.name) {
        authPassport.authenticateUser(user.name, user.password, users)
            .then((userInfo) => {
                const payload = {
                    userId: userInfo.meta.id
                };
                // token签名，有效时间1h
                const token = jwt.sign(payload, secret, { 
                    expiresIn: '1h',                                            // 有效时间
                    subject: userInfo.meta.id,                                  // 该JWT所面向的用户
                    issuer: jwtConstant.ISSUER,                                      // 该JWT的签发者
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
                ctx.cookies.set(jwtConstant.ADMIN_COOKIE_NAME, userInfo.meta.id, {
                    maxAge: 10 * 60 * 1000,                                     // cookie有效时长
                    httpOnly: true,                                             // 是否只用于http请求中获取
                    overwrite: false,                                           // 是否允许重写
                });

                ctx.body = {
                    message: 'login success',
                    code: 1,
                    data: userInfo.meta
                };
            })
            .catch((error) => {
                ctx.body = {
                    message: error,
                    code: -2
                };
            });
    } else {
        ctx.body = {
            message: '参数错误',
            code: -1
        };
    }
});

module.exports = router;
