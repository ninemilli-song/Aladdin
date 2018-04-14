/**
 * Define reducer and action of Warehouse
 */

import { createReducer } from '../../../utils/reducer-helper';
import { setQuestionList, QAS_Q_LIST } from './qlist_reducer';
import { QAS_Q_DIALOG_TOGGLE, setPushQuestionDialogVisible } from './push_q_dialog_reducer';
// import { Map } from 'immutable';
const { fromJS } = require('immutable');



// -------------------------------------
// Reducer
// -------------------------------------

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
