/**
 * The functions to send request to server
 */
// const fetch = require('whatwg-fetch').default;
// require('whatwg-fetch');
// import 'whatwg-fetch';
const fetch = require('node-fetch');
const ApiError = require('../error/api-error');
const ApiErrorNames = require('../error/api-error-names');

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'http://rap2api.taobao.org/app/mock/485/';

/**
 * Get request
 * @param path the request url
 * @param params request params
 * @param options { 
 *  headers: header of request
 *  done: request done callback function 
 * }
 */
function get(path, params, options = {}) {
    let url = path;
    const { headers } = options;

    // Concat url and params
    const paramsStrs = [];
    if (params) {
        Object.keys(params).forEach(item => {
            paramsStrs.push(`${item}=${params[item]}`);
        });
    }

    if (paramsStrs.length > 0) {
        url = `${path}?${paramsStrs.join('&')}`;
    }

    // Send request
    return fetch(BASE_URL + url, {
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        headers: Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, headers),
        credentials: 'same-origin'
    }).then((response) => {
        const { status, ok } = response;
        switch (status) {
            case 200:
            case 204:
                return response.json().then((res) => {
                    const { data, meta } = res;
                    meta.headers = response.headers.raw();
                    meta.ok = ok;

                    return {
                        data,
                        meta
                    };
                });
            case 401:                               // 用户认证失败
                throw new ApiError(ApiErrorNames.USER_NOT_SIGNIN);
            default:
                return response.json();
        }
    }).catch((error) => {
        console.error(`Fetch ${url} error: \n`, error);
        throw error;
    });
}

/**
 * Post request
 * @param path 
 * @param params 
 * @param options { 
 *  headers: header of request
 *  done: request done callback function 
 * }
 */
function post(path, params, options = {}) {
    const { headers } = options;

    return fetch(BASE_URL + path, {
        method: 'post',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        headers: Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, headers),
        credentials: 'same-origin',
        body: JSON.stringify(params)
    })
    .then((response) => {
        const { status, ok } = response;
        switch (status) {
            case 200:
            case 204:
                return response.json().then((res) => {
                    const { data, meta } = res;
                    meta.headers = response.headers.raw();
                    meta.ok = ok;

                    return {
                        data,
                        meta
                    };
                });
            case 401:                               // 用户认证失败
                throw new ApiError(ApiErrorNames.USER_NOT_SIGNIN);
            default:
                return response.json();
        }
    }).catch((error) => {
        console.error(`Fetch ${path} error: \n`, error);
        throw error;
    });
}

module.exports = {
    get,
    post
};
