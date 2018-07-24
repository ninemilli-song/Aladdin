/**
 * 自定义Api异常
 */
const ApiErrorNames = require('./api-error-names');

class ApiError extends Error {
    // 构造方法
    constructor(errorName) {
        super();

        const errorInfo = ApiErrorNames.getErrorInfo(errorName);

        this.name = errorName;
        this.code = errorInfo.code;
        this.message = errorInfo.message;
    }
}

module.exports = ApiError;
