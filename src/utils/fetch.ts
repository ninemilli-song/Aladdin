/**
 * The functions to send request to server
 */
import axios from 'axios';
import { browserHistory } from 'react-router';

// export const BASE_URL = `http://${location.host}/`;
export const BASE_URL = 'api/';

/**
 * Get request
 * @param path the request url
 * @param params request params
 */
function get(path, params?) {
    let url = path;

    // Send request
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + path, {
            params,
            responseType: 'json'
        }).then((result) => {
            console.log('👉🏻 axios result success: ------> ', result);
            resolve(result.data.data);
        }).catch((error) => {
            reject(error);
        });
    }).catch((error) => {
        console.error('👉🏻 axios result failed: ------> ', error);
        throw error;
    });
}

/**
 * Post request
 * @param path 
 * @param params 
 */
function post(path, params) {
    let url = path;

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: BASE_URL + path,
            data: params,
            responseType: 'json'
        }).then((result) => {
            console.log('👉🏻 axios result success: ------> ', result);
            resolve(result.data.data);
        }).catch((error) => {
            reject(error);
        });
    }).catch((error) => {
        console.error('👉🏻 axios result failed: ------> ', error);
        throw error;
    });
}

export default {
    get,
    post
}
