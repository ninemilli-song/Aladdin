module.exports = {
    ISSUER: 'aladdin-jwt',                              // 该JWT的签发者
    TOKEN_COOKIE_NAME: 'authorization',                 // token 在客户端cookie中的名称
    ADMIN_COOKIE_NAME: 'aladdin-adminId',               // 登录用户在客户端cookie中的名称
    IS_AUTHENTICATED: 'aladdin-is-authenticated',       // 用户是否认证通过
    EXPIRT_TIME: '10',                                  // token 有效时间
};
