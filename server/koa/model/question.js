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
    return fetch.get('question/list', params).then((res) => {
        console.log('👉🏻 ---> /question/list\n', res);
        const { data, meta } = res;

        let rules = null;
        if (meta.success) {
            rules = ResponsePacker.success(data);
        } else {
            rules = ResponsePacker.error('remote server result error!');
        }

        return rules;
    }).catch((error) => {
        console.error('👉🏻 ---> /question/list error:\n', error);
        return ResponsePacker.error(error);
    });
}

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
}

module.exports = {
    getQuestions,
    getQuestionDetail
};