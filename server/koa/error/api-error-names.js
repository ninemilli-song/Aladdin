/**
 * API错误名称
 */
const ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = 'unknowError';
ApiErrorNames.SERVER_ERROR = 'serverError';
ApiErrorNames.USER_NOT_EXIST = 'userNotExist';
ApiErrorNames.USER_NOT_SIGNIN = 'userNotSignin';

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
errorMap.set(ApiErrorNames.SERVER_ERROR, { code: -2, message: '服务错误' });
errorMap.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '用户不存在' });
errorMap.set(ApiErrorNames.USER_NOT_SIGNIN, { code: 102, message: '用户未登陆' });

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {
    let errorInfo;

    if (errorName) {
        errorInfo = errorMap.get(errorName);
    }

    // 如果没有对应的错误信息，默认'未知错误'
    if (!errorInfo) {
        errorName = ApiErrorNames.UNKNOW_ERROR;
        errorInfo = errorMap.get(errorName);
    }
    
    return errorInfo;
};

module.exports = ApiErrorNames;
