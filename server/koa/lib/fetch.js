/**
 * The functions to send request to server
 */
// const fetch = require('whatwg-fetch').default;
// require('whatwg-fetch');
// import 'whatwg-fetch';
const fetch = require('node-fetch');

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'http://rap2api.taobao.org/app/mock/485/';

console.log('BASE_URL ===> ', BASE_URL);

/**
 * Get request
 * @param path the request url
 * @param params request params
 */
function get(path, params) {
    let url = path;

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
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then((response) => {
        const { status } = response;
        switch (status) {
            case 200:
                return response.json();
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
 */
function post(path, data) {
    return fetch(BASE_URL + path, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
    })
    .then((response) => {
        const { status } = response;
        switch (status) {
            case 200:
                return response.json();
            case 401:                               // 用户认证失败
                throw response;
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
