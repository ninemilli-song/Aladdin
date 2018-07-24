const secret = require('../constant/secret-key').secret;
const jwtConstant = require('../constant/jwt');
const jwtKoa = require('koa-jwt');

const jwtVerify = jwtKoa({ 
    secret,
    cookie: jwtConstant.TOKEN_COOKIE_NAME,
    issuer: jwtConstant.ISSUER,

    /** Add the passthrough option to always yield next, 
     *  even if no valid Authorization header was found
     *  This lets downstream middleware make decisions based on whether ctx.state.user is set.
     */ 
    passthrough: true,

    /**
     * Your custom isRevoked resolver
     *
     * @param  {object}      ctx The ctx object passed to the middleware
     * @param  {object}      decodedToken Content of the token
     * @param  {object}      token token The token
     * @return {Promise}     If the token is not revoked, 
     *                       the promise must resolve with false, 
     *                       otherwise (the promise resolve with true or error) the token is revoked
     */
    isRevoked: (ctx, decodedToken) => {
        return new Promise((resolve) => {
            const userId = ctx.cookies.get('aladdin-adminId');

            if (decodedToken.sub === userId) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }
}).unless({
    path: [/^\/auth\/login/]                              // 数组中的路径不需要通过jwt验证
});

module.exports = jwtVerify;
