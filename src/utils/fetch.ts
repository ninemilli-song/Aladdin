/**
 * The functions to send request to server
 */
import 'whatwg-fetch';
import { browserHistory } from 'react-router';

export const BASE_URL = '/api';

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
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then((response) => {
        const { status } = response;
        if ( status === 200 ) {
            return response.json();
        } else if ( status === 401 ) {                  // 用户认证失败
            // browserHistory.push('/signin');
            window.open('/signin', '_self');
            return response.json();
        } else {
            throw response;
        }
    }).catch((error) => {
        console.log('fetch error ========> ', error);
        return error.json();
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
        if ( status === 200 ) {
            return response.json();
        } else if ( status === 401 ) {                    // 用户认证失败
            // browserHistory.push('/signin');
            window.open('/signin', '_self');
            return response.json();
        } else {
            throw response;
        }
    }).catch((error) => {
        console.log('fetch error ========> ', error);
        return error.json();
    });
}

export default {
    get,
    post
}
