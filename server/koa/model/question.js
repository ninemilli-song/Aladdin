/**
 * 问答数据对接
 */
const fetch = require('../lib/fetch');
const ApiError = require('../error/api-error');
const ApiErrorNames = require('../error/api-error-names');

/**
 * 获取问题列表
 * @param {pageNum: number, pageSize: number} params 
 */
const getQuestions = (params, ctx) => {
    return ctx.fetch.get('question/recent', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 获取问题详情
 * @param {id: number} params 
 */
const getQuestionDetail = (params) => {
    return fetch.get('question/detail', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 提交问题
 * @param {*} params 
 */
const addQuestion = (params, ctx) => {
    return ctx.fetch.post('question/add', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 关注问题
 * @param {*} params 
 */
const concernQuestion = (params, ctx) => {
    return ctx.fetch.post('questionCollected/add', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 取消关注问题
 * @param {*} params 
 */
const unconcernQuestion = (params, ctx) => {
    return ctx.fetch.post('questionCollected/unconcern', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data || '';
    }).catch((error) => {
        throw error;
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const replyQuestion = (params) => {
    return fetch.post('answer/add', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 回复Answer
 * @param {*} params 
 */
const replyAnswer = (params) => {
    return fetch.post('pump/add', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const collectAnswer = (params) => {
    return fetch.post('answerCollected/add', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const uncollectAnswer = (params) => {
    return fetch.post('answerCollected/unconcern', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const approveAnswer = (params) => {
    return fetch.post('answer/approve', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.SERVER_ERROR, meta.message);
        }

        return data || '';
    }).catch((error) => {
        throw error;
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const disapproveAnswer = (params) => {
    return fetch.post('answer/disapprove', params).then((res) => {
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.SERVER_ERROR, meta.message);
        }

        return data || '';
    }).catch((error) => {
        throw error;
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const userAggregateData = (params, ctx) => {
    return ctx.fetch.get('question/profile', params).then((res) => {
        console.log('👉🏻 ---> /question/profile\n', res);
        const { data, meta } = res;

        if (!meta.success) {
            throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        }

        return data;
    }).catch((error) => {
        throw error;
    });
};

module.exports = {
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
};
