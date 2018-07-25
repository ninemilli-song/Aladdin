/**
 * 科目数据
 */
const fetch = require('../lib/fetch');
const ApiError = require('../error/api-error');
const ApiErrorNames = require('../error/api-error-names');

/**
 * 根据准则和年份获取科目分类
 * @param {accStandardCode: string, exeYear: number} params 
 */
const getSubjectCategoryByCodeYear = (params) => {
    return fetch.get('accElement/queryByCodeYear', params).then((res) => {
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
 * 根据准则和年份获取科目数据
 * @param { accStandardCode: string, exeYear: number } params 
 */
const getSubjectsDataByCodeYear = (params) => {
    return fetch.get('accElement/queryCoaUsagesByCodeYear', params).then((res) => {
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
    getSubjectCategoryByCodeYear,
    getSubjectsDataByCodeYear
};
