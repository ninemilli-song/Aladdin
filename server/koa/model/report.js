/**
 * 报表数据
 */
const ApiError = require('../error/api-error');
const ApiErrorNames = require('../error/api-error-names');
const fetch = require('../lib/fetch');
/**
 * 根据准则和年份获取科目数据
 * @param { accStandardCode: string, exeYear: number } params 
 */
const getReportDataByCodeYear = (params) => {
    return fetch.get('/rp/queryByCodeYear', params).then((res) => {
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
    getReportDataByCodeYear
};
