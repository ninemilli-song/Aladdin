const jwtConstant = require('../constant/jwt');
const ResponsePacker = require('../lib/responsePacker');

const errorHandler = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;

            // set cookie 回写到客户端 用户认证失败
            ctx.cookies.set(jwtConstant.IS_AUTHENTICATED, false, {
                maxAge: 10 * 60 * 1000,                                     // cookie有效时长
                httpOnly: false,                                            // 是否只用于http请求中获取
                overwrite: false,                                           // 是否允许重写
            });

            // ctx.body = `Protected resource, ${err}\n`;
            ctx.body = ResponsePacker.error(`Protected resource, ${err}\n`);
        } else {
            throw err;
        }

        // 调用error事件，手动释放error事件
        // 注：try...catch中捕获错误，不会触发error事件，需要手动触发
        ctx.app.emit('error', err, ctx);
    });
};

module.exports = errorHandler;
