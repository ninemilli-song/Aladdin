/**
 * Define reducer and action of userInfo
 */
import * as Immutable from 'immutable';
const Mock = require('mockjs');

// export const GET_USER_INFO = 'GET_USER_INFO';
// export const USER_SIGNIN = 'USER_SIGNIN';

export interface IAction {
    getUserInfo: () => void;
}

// // ------------------------------------
// // Method
// // ------------------------------------
// export const getUserInfo = () => {
//     return (dispatch, getState) => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 const data = {
//                     id: '008',
//                     name: '伊斯特伍德',
//                 };
//                 resolve(data);
//             }, 100)
//         }).then((data) => {
//             dispatch({
//                 type: GET_USER_INFO,
//                 data,
//             });
//         })
//     }
// }

// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {
//     [GET_USER_INFO]: (state, action) => {
//         return Object.assign({}, state, action.data);
//     },
//     [USER_SIGNIN]: (state, action) => {
//         return Object.assign({}, state, {
//             id: action.data ? action.data.id : null,
//             name: action.data ? action.data.name : '',
//             isAuthenticated: !!action.data
//         });
//     }
// }

// // ------------------------------------
// // Define Reducer
// // ------------------------------------
// const initState = {
//     id: null,
//     name: null,
//     isAuthenticated: false,            // 用户是否认证
// }

// export default function userInfoReducer(state = initState, action) {
//     const handler = ACTION_HANDLERS[action.type];

//     return handler ? handler(state, action) : state;
// }
