const ResponsePacker = require('../lib/responsePacker');
const fetch = require('../lib/fetch');
/**
 * 根据准则和年份获取科目数据
 * @param { accStandardCode: string, exeYear: number } params 
 */
const getReportDataByCodeYear = (params) => {
    return fetch.get('/rp/queryByCodeYear', params).then((res) => {
        console.log('👉🏻 ---> /rp/queryByCodeYearr\n', res);
        const { data, meta } = res;

        let rules = null;
        if (meta.success) {
            rules = ResponsePacker.success(data);
        } else {
            rules = ResponsePacker.error('remote server result error!');
        }

        return rules;
    }).catch((error) => {
        console.error('👉🏻 ---> /rp/queryByCodeYear error:\n', error);
        return ResponsePacker.error(error);
    });
}

module.exports = {
    getReportDataByCodeYear
};