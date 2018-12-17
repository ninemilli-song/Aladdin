/**
 * Define reducer and action of Warehouse
 */

import { createReducer } from '../../../utils/reducer-helper';
import { 
    setQuestionList, 
    onPageChanged, 
    setQuestionConcern, 
    setReplyDialogVisible, 
    addReply, 
    setUserAggregateData, 
    setUserAggregateCollectionQuestion,
    setUserAggregateCollectionAnswer,
    setUserAggregateMyQuestion,
    setAnswerExpandId,
    setAnswerReplyExpand,
    cancelAnswerExpandId
} from './qlist_reducer';
import { setPushQuestionDialogVisible } from './push_q_dialog_reducer';
import { 
    QAS_Q_DIALOG_TOGGLE, 
    QAS_Q_LIST, 
    QAS_Q_LIST_PAGE_CHANGED, 
    QAS_Q_DETAIL_SELECTED, 
    QAS_Q_DETAIL_DIALOG_VISIBLE, 
    QAS_Q_DETAIL_DATA_FETCH,
    QAS_Q_DETAIL_DATA_CLEAR,
    QAS_Q_DETAIL_LOADING_SHOW,
    QAS_Q_DETAIL_LOADING_HIDE,
    QAS_Q_QUICK_EXPAND,
    QAS_Q_CONCERN,
    QAS_Q_REPLY_DIALOG_VISIBLE,
    QAS_Q_ANSWER_ADD,
    QAS_Q_DETAIL_REPLY_EXPAND,
    QAS_Q_ANSWER_COLLECTED,
    QAS_Q_ANSWER_APPROVE,
    QAS_Q_USER_AGGREGATE_DATA,
    QAS_Q_USER_AGGREGATE_COLLECTION_QUESTION,
    QAS_Q_USER_AGGREGATE_COLLECTION_ANSWER,
    QAS_Q_USER_AGGREGATE_MY_QUESTION,
    QAS_Q_REPLY_ANSWER_DIALOG_VISIBLE,
    QAS_Q_ANSWER_REPLY_ADD,
    QAS_Q_ANSWER_EXPAND_ID,
    QAS_Q_ANSWER_LIST_REPLY_EXPAND,
    QAS_Q_ANSWER_FOLD_ID,
} from '../actions/index';
import { 
    onSelectedQ, 
    toggleDetailDialogVisible, 
    fetchDetailData, 
    clearDetailData, 
    detailDialogLoading, 
    setQuestionReplyExpand,
    setAnswerCollected,
    setAnswerApprove,
    addAnswerReply
} from './q_detail_reducer';
import { setQuickQuestionExpand, setReplyAnswerDialogVisible } from './ui';
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
    [QAS_Q_DETAIL_DATA_CLEAR]: clearDetailData,
    [QAS_Q_DETAIL_LOADING_SHOW]: detailDialogLoading,
    [QAS_Q_DETAIL_LOADING_HIDE]: detailDialogLoading,
    [QAS_Q_QUICK_EXPAND]: setQuickQuestionExpand,
    [QAS_Q_CONCERN]: setQuestionConcern,
    [QAS_Q_REPLY_DIALOG_VISIBLE]: setReplyDialogVisible,
    [QAS_Q_ANSWER_ADD]: addReply,
    [QAS_Q_DETAIL_REPLY_EXPAND]: setQuestionReplyExpand,
    [QAS_Q_ANSWER_COLLECTED]: setAnswerCollected,
    [QAS_Q_ANSWER_APPROVE]: setAnswerApprove,
    [QAS_Q_USER_AGGREGATE_DATA]: setUserAggregateData,
    [QAS_Q_USER_AGGREGATE_COLLECTION_QUESTION]: setUserAggregateCollectionQuestion,
    [QAS_Q_USER_AGGREGATE_COLLECTION_ANSWER]: setUserAggregateCollectionAnswer,
    [QAS_Q_USER_AGGREGATE_MY_QUESTION]: setUserAggregateMyQuestion,
    [QAS_Q_REPLY_ANSWER_DIALOG_VISIBLE]: setReplyAnswerDialogVisible,
    [QAS_Q_ANSWER_REPLY_ADD]: addAnswerReply,
    [QAS_Q_ANSWER_EXPAND_ID]: setAnswerExpandId,
    [QAS_Q_ANSWER_FOLD_ID]: cancelAnswerExpandId,
    [QAS_Q_ANSWER_LIST_REPLY_EXPAND]: setAnswerReplyExpand,
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
        },
        quickQuestionExpand: false,                 // 快速提问是否展开
        qReplyAnswerDialogOpts: {
            data: null,                             // 回复问题的问题数据
            visible: false                          // 是否可见
        },
        qAnswerListOpts: {                          // 问题回答列表ui状态
            loading: false,                         // 加载
            expand: false                           // 展开
        }
    },
    data: {},
    // selectedQId: null,                              // 选中的提问 id
    // expandAnswerId: null,                           // 展开答案的提问 id
    // qDetailData: {},                                // 选中的问题详情数据
    questionCollections: [],    // 关注的问题 id
    answerApproved: [],         // 赞成的回答 id
    answerDisApproved: [],      // 反对的回答 id
    answerCollections: [],      // 收藏的回答 id
    myAggregate: {},            // 我的相关合计数据
    qExpandQuestions: {},       // 展开问题的 id 列表 { key<number>: value<{ loading<boolean>, replyExpand<boolean> }> }
});

// --------------------------------------
// Slice reducer
// --------------------------------------
const reducer = createReducer(initialState, ACTION_HANDLERS);
export default reducer;
