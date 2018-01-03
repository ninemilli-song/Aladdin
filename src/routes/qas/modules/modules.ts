/**
 * Define reducer and action of Warehouse
 */

import { createReducer } from '../../../utils/reducer-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const QAS_Q_LIST = 'QAS_Q_LIST';
export const QAS_USER_DATA = 'QAS_USER_DATA';

// -------------------------------------
// Reducer
// -------------------------------------

// ------------------------------------
// Case reducer
// ------------------------------------
const questionList = (state, action) => {
    return Object.assign({}, state, {
        questions: action.data,
    });
}

const userData = (state, action) => {
    return Object.assign({}, state, {
        user: action.data,
    })
}


const ACTION_HANDLERS = {
    [QAS_Q_LIST]: questionList,
    [QAS_USER_DATA]: userData
}

// 初始化模块数据
const initialState = {
    questions: [],
    userData: {}
};

// --------------------------------------
// Slice reducer
// --------------------------------------
const reducer = createReducer(initialState, ACTION_HANDLERS);
export default reducer;
