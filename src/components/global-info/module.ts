/**
 * Define reducer and action of userInfo
 */
import * as Immutable from 'immutable';
const Mock = require('mockjs');

export const GET_USER_INFO = 'GET_USER_INFO';

export interface IAction {
    getUserInfo: () => void;
}

// ------------------------------------
// Method
// ------------------------------------
export const getUserInfo = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = {
                    id: '008',
                    name: '伊斯特伍德',
                };
                resolve(data);
            }, 100)
        }).then((data) => {
            dispatch({
                type: GET_USER_INFO,
                data,
            });
        })
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [GET_USER_INFO]: (state, action) => action.data
}

// ------------------------------------
// Define Reducer
// ------------------------------------
const initState = {
    id: '007',
    name: '詹姆斯-邦德',
}

export default function userInfoReducer(state = initState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
