const ResponsePacker = require('../lib/responsePacker');
const fetch = require('../lib/fetch');

/**
 * 根据准则和年份获取科目分类
 * @param {accStandardCode: string, exeYear: number} params 
 */
const getSubjectCategoryByCodeYear = (params) => {
    return fetch.get('accElement/queryByCodeYear', params).then((res) => {
        console.log('👉🏻 ---> /accElement/queryByCodeYear\n', res);
        const { data, meta } = res;

        let rules = null;
        if (meta.success) {
            rules = ResponsePacker.success(data);
        } else {
            rules = ResponsePacker.error('remote server result error!');
        }

        return rules;
    }).catch((error) => {
        console.error('👉🏻 ---> /accElement/queryByCodeYear error:\n', error);
        return ResponsePacker.error(error);
    });
}

/**
 * 根据准则和年份获取科目数据
 * @param { accStandardCode: string, exeYear: number } params 
 */
const getSubjectsDataByCodeYear = (params) => {
    return fetch.get('coa/queryByCodeYear', params).then((res) => {
        console.log('👉🏻 ---> /coa/queryByCodeYear\n', res);
        const { data, meta } = res;

        let rules = null;
        if (meta.success) {
            rules = ResponsePacker.success(data);
        } else {
            rules = ResponsePacker.error('remote server result error!');
        }

        return rules;
    }).catch((error) => {
        console.error('👉🏻 ---> /coa/queryByCodeYear error:\n', error);
        return ResponsePacker.error(error);
    });
}

module.exports = {
    getSubjectCategoryByCodeYear,
    getSubjectsDataByCodeYear
};