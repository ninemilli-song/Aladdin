/**
 * The functions to send request to server
 */
// const fetch = require('whatwg-fetch').default;
// require('whatwg-fetch');
// import 'whatwg-fetch';
const fetch = require('node-fetch');

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
                throw response;
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
 * @param data 
 * @param options { 
 *  headers: header of request
 *  done: request done callback function 
 * }
 */
function post(path, data, options = {}) {
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
        body: JSON.stringify(data)
    })
    .then((response) => {
        const { status } = response;
        switch (status) {
            case 200:
            case 204:
                if (options.done) {
                    options.done(response);
                }
                return response;
            case 401:                               // 用户认证失败
                throw response;
            default:
                return response;
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
