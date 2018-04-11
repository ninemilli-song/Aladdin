/**
 * Define reducer and action of Warehouse
 */

import { createReducer } from '../../../utils/reducer-helper';
// import { Map } from 'immutable';
const { fromJS } = require('immutable');

// ------------------------------------
// Constants
// ------------------------------------
export const QAS_Q_DIALOG_TOGGLE = 'QAS_Q_DIALOG_TOGGLE';
export const QAS_Q_LIST = 'QAS_Q_LIST';

// -------------------------------------
// Reducer
// -------------------------------------

// ------------------------------------
// Case reducer
// ------------------------------------
const setPushQuestionDialogVisible = (state, action) => {
    // const uistate = Object.assign({}, state.uistate, {
    //     pushQuestionDialogVisible: action.data,
    // });

    // // state.uistate = uistate;

    // return Object.assign({}, state, {
    //     uistate
    // });

    return state.updateIn(['uistate', 'pushQuestionDialogVisible'], visible => !visible);
}

const setQuestionList = (state, action) => {
    return state.updateIn(['data', 'QList'], data => action.data);
}


const ACTION_HANDLERS = {
    [QAS_Q_DIALOG_TOGGLE]: setPushQuestionDialogVisible,
    [QAS_Q_LIST]: setQuestionList
}

// 初始化模块数据
const initialState = fromJS({
    uistate: {
        pushQuestionDialogVisible: false,
        pushQuestionDialogLoading: false,
    },
    data: {}
});

// --------------------------------------
// Slice reducer
// --------------------------------------
const reducer = createReducer(initialState, ACTION_HANDLERS);
export default reducer;
