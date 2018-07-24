/**
 * The functions to send request to server
 */
import 'whatwg-fetch';
import { browserHistory } from 'react-router';

export const BASE_URL = `http://${location.host}/`;

/**
 * Get request
 * @param path the request url
 * @param params request params
 */
function get(path, params?) {
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
    }).then((response) => {                             // http 状态处理
        const { status } = response;
        if ( status === 200 ) {
            return response.json();
        } else if ( status === 401 ) {                  // 用户认证失败
            // const callbackPath = location.pathname;
            // window.open(`/signin${callbackPath}`, '_self');
            // window.open(`/signin${callbackPath}`);

            return response.json();
        } else {                                        // 其它未知异常
            throw response.json();
        }
    }).then((result) => {                               // 服务器结果状态处理
        return new Promise((resolve, reject) => {
            if (result.code === 0) {                    // 结果返回成功的数据
                resolve(result.data);
            } else {                                    // 结果返回失败的数据
                reject(result.message);
            }
        });
    }).catch((error) => {
        /**
         * 暂时先抛出异常
         * 后面统一处理
         */
        throw error;
    });
}

/**
 * Post request
 * @param path 
 * @param data 
 */
function post(path, data) {
    return fetch(`${BASE_URL}${path}`, {
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
        if ( status === 200 ) {
            return response.json();
        } else if ( status === 401 ) {                    // 用户认证失败
            // const callbackPath = location.pathname;
            // window.open(`/signin${callbackPath}`);
            return response.json();
        } else {                                        // 其它未知异常
            throw response.json();
        }
    }).then((result) => {                               // 服务器结果状态处理
        return new Promise((resolve, reject) => {
            if (result.code === 0) {                    // 结果返回成功的数据
                resolve(result.data);
            } else {                                    // 结果返回失败的数据
                reject(result.message);
            }
        })
    }).catch((error) => {
        /**
         * 暂时先抛出异常
         * 后面统一处理
         */
        throw error;
    });
}

export default {
    get,
    post
}
