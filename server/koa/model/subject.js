const ResponsePacker = require('../lib/responsePacker');
const fetch = require('../lib/fetch');

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

module.exports = {
    getSubjectCategoryByCodeYear
};