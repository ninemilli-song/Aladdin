/**
 * 问答
 */
const ResponsePacker = require('../lib/responsePacker');
const fetch = require('../lib/fetch');

/**
 * 获取问题列表
 * @param {pageNum: number, pageSize: number} params 
 */
const getQuestions = (params) => {
    return fetch.get('question/recent', params).then((res) => {
        console.log('👉🏻 ---> /question/recent\n', res);
        const { data, meta } = res;

        let rules = null;
        if (meta.success) {
            rules = ResponsePacker.success(data);
        } else {
            rules = ResponsePacker.error('remote server result error!');
        }

        return rules;
    }).catch((error) => {
        console.error('👉🏻 ---> /question/recent error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 获取问题详情
 * @param {id: number} params 
 */
const getQuestionDetail = (params) => {
    return fetch.get('question/detail', params).then((res) => {
        console.log('👉🏻 ---> /question/detail\n', res);
        const { data, meta } = res;

        let rules = null;
        if (meta.success) {
            rules = ResponsePacker.success(data);
        } else {
            rules = ResponsePacker.error('remote server result error!');
        }

        return rules;
    }).catch((error) => {
        console.error('👉🏻 ---> /question/detail error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 提交问题
 * @param {*} params 
 */
const addQuestion = (params) => {
    return fetch.post('question/add', params).then((res) => {
        console.log('👉🏻 ---> /question/add\n', res);
        return res;
    }).catch((error) => {
        console.error('👉🏻 ---> /question/add error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 关注问题
 * @param {*} params 
 */
const concernQuestion = (params) => {
    return fetch.post('/questionCollected/add', params).then((res) => {
        console.log('👉🏻 ---> /questionCollected/add\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            result = ResponsePacker.error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /questionCollected/add error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 取消关注问题
 * @param {*} params 
 */
const unconcernQuestion = (params) => {
    return fetch.post('/questionCollected/unconcern', params).then((res) => {
        console.log('👉🏻 ---> /questionCollected/unconcern\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            result = ResponsePacker.error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /questionCollected/unconcern error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const replyQuestion = (params) => {
    return fetch.post('/answer/add', params).then((res) => {
        console.log('👉🏻 ---> /answer/add\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            throw new Error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /replyQuestion error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const collectAnswer = (params) => {
    return fetch.post('/answerCollected/add', params).then((res) => {
        console.log('👉🏻 ---> /answerCollected/add\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            throw new Error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /answerCollected/add error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const uncollectAnswer = (params) => {
    return fetch.post('/answerCollected/unconcern', params).then((res) => {
        console.log('👉🏻 ---> /answerCollected/unconcern\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            throw new Error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /answerCollected/unconcern error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const approveAnswer = (params) => {
    return fetch.post('answer/approve', params).then((res) => {
        console.log('👉🏻 ---> /answer/approve\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            throw new Error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /answer/approve error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const disapproveAnswer = (params) => {
    return fetch.post('answer/disapprove', params).then((res) => {
        console.log('👉🏻 ---> /answer/disapprove\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            throw new Error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /answer/disapprove error:\n', error);
        return ResponsePacker.error(error);
    });
};

/**
 * 回复问题
 * @param {*} params 
 */
const userAggregateData = (params) => {
    return fetch.get('question/profile', params).then((res) => {
        console.log('👉🏻 ---> /question/profile\n', res);
        const { data, meta } = res;

        let result = null;
        if (meta.success) {
            result = ResponsePacker.success(data);
        } else {
            throw new Error('remote server result error!');
        }

        return result;
    }).catch((error) => {
        console.error('👉🏻 ---> /question/profileerror:\n', error);
        return ResponsePacker.error(error);
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
    userAggregateData
};
