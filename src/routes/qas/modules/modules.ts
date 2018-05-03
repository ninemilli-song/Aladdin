/**
 * Define reducer and action of Warehouse
 */

import { createReducer } from '../../../utils/reducer-helper';
import { setQuestionList, onPageChanged } from './qlist_reducer';
import { setPushQuestionDialogVisible } from './push_q_dialog_reducer';
import { 
    QAS_Q_DIALOG_TOGGLE, 
    QAS_Q_LIST, 
    QAS_Q_LIST_PAGE_CHANGED, 
    QAS_Q_DETAIL_SELECTED, 
    QAS_Q_DETAIL_DIALOG_VISIBLE, 
    QAS_Q_DETAIL_DATA_FETCH,
    QAS_Q_DETAIL_DATA_CLEAR
} from '../actions/index';
import { onSelectedQ, toggleDetailDialogVisible, fetchDetailData, clearDetailData } from './q_detail_reducer';
const { fromJS } = require('immutable');

// -------------------------------------
// Reducer
// -------------------------------------

const ACTION_HANDLERS = {
    [QAS_Q_DIALOG_TOGGLE]: setPushQuestionDialogVisible,
    [QAS_Q_LIST]: setQuestionList,
    [QAS_Q_LIST_PAGE_CHANGED]: onPageChanged,
    [QAS_Q_DETAIL_SELECTED]: onSelectedQ,
    [QAS_Q_DETAIL_DIALOG_VISIBLE]: toggleDetailDialogVisible,
    [QAS_Q_DETAIL_DATA_FETCH]: fetchDetailData,
    [QAS_Q_DETAIL_DATA_CLEAR]: clearDetailData
}

// 初始化模块数据
const initialState = fromJS({
    uistate: {
        pushQuestionDialogVisible: false,
        pushQuestionDialogLoading: false,
        currentPage: 1,
        pageSize: 10,
        qDetailDialogOpts: {                        // 提问详情对话框的ui状态
            visible: false
        }
    },
    data: {},
    selectedQId: null,                              // 选中的提问 id
    qDetailData: {},                                // 选中的问题详情数据
    questionCollections: [],                        // 关注的问题 id
    answerApproved: [],                             // 赞成的回答 id
    answerDisApproved: [],                          // 反对的回答 id
    answerCollections: [],                          // 收藏的回答 id
});

// --------------------------------------
// Slice reducer
// --------------------------------------
const reducer = createReducer(initialState, ACTION_HANDLERS);
export default reducer;
