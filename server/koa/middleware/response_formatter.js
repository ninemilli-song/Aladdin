/**
 * 格式化输出中间件
 * 在app.use(router)之前调用
 */
const ApiError = require('../error/api-error');
const ApiErrorNames = require('../error/api-error-names');

const responseFormatter = async (ctx) => {
    // 如果有返回数据，将返回数据添加到data中
    if (ctx.body) {
        ctx.body = {
            code: 0,
            message: 'success',
            data: ctx.body
        };
    } else {
        ctx.body = {
            code: 0,
            message: 'success',
        };
    }
};

// 对Url进行过滤
const urlFilter = (pattern) => {
    return async (ctx, next) => {
        const reg = new RegExp(pattern);
        try {
            // 先执行路由
            await next();
        } catch (error) {
            // 如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
            if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
                /**
                 * 1. 用户不存在 或者 没有登陆的情况下设置状态为401
                 * 2. 其它异常设置400
                 */
                if (error.name === ApiErrorNames.USER_NOT_EXIST 
                    || error.name === ApiErrorNames.USER_NOT_SIGNIN) {
                    ctx.status = 401;
                } else {
                    ctx.status = 400;
                }
                
                ctx.body = {
                    code: error.code,
                    message: error.message,
                    originalMessage: error.originalMessage
                };
            } else {
                ctx.status = error.status || 500;
                ctx.body = error;
            }

            // 继续抛，让外层中间件处理日志
            throw error;
        }
        
        // 通过正则的url进行格式化处理
        if (reg.test(ctx.originalUrl)) {
            responseFormatter(ctx);
        }
    };
};

module.exports = urlFilter;
