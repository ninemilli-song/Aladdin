import request from '../../../utils/fetch';
// import { fromJS } from 'immutable';
///<reference path='./node_modules/immutable/dist/immutable.d.ts'/>
import * as Immutable from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const QAS_Q_DIALOG_TOGGLE = 'QAS_Q_DIALOG_TOGGLE';
export const QAS_Q_LIST = 'QAS_Q_LIST';
export const QAS_Q_LIST_PAGE_CHANGED = 'QAS_Q_LIST_PAGE_CHANGED';                           // 分页页码切换
export const QAS_Q_DETAIL_SELECTED = 'QAS_Q_DETAIL_SELECTED';                               // 选中某条提问
export const QAS_Q_DETAIL_DIALOG_VISIBLE = 'QAS_Q_DETAIL_DIALOG_VISIBLE';                   // 切换详情框可见性
export const QAS_Q_DETAIL_DATA_FETCH = 'QAS_Q_DETAIL_DATA_FETCH';                           // 获取详情数据
export const QAS_Q_DETAIL_DATA_CLEAR = 'QAS_Q_DETAIL_DATA_CLEAR';                           // 清空详情数据
export const QAS_Q_DETAIL_LOADING_SHOW = 'QAS_Q_DETAIL_LOADING_SHOW';                       // 清空详情数据
export const QAS_Q_DETAIL_LOADING_HIDE = 'QAS_Q_DETAIL_LOADING_HIDE';                       // 清空详情数据
export const QAS_Q_SUBMIT_QUESTION = 'QAS_Q_SUBMIT_QUESTION';                               // 提交问题
export const QAS_Q_QUICK_EXPAND = 'QAS_Q_QUICK_EXPAND';                                     // 快速提问展开
export const QAS_Q_CONCERN = 'QAS_Q_CONCERN';                                               // 关注提问
export const QAS_Q_REPLY_DIALOG_VISIBLE = 'QAS_Q_REPLY_DIALOG_VISIBLE';                     // 回复对话框可见性
export const QAS_Q_ANSWER_ADD = 'QAS_Q_ANSWER_ADD';                                         // 新增一个回复
export const QAS_Q_DETAIL_REPLY_EXPAND = 'QAS_Q_DETAIL_REPLY_EXPAND';                       // 回复问题框展开形式
export const QAS_Q_ANSWER_LIST_REPLY_EXPAND = 'QAS_Q_ANSWER_LIST_REPLY_EXPAND';             // 回复问题框展开形式 - 问题列表中
export const QAS_Q_ANSWER_COLLECTED = 'QAS_Q_ANSWER_COLLECTED';                             // 回复已被收藏
export const QAS_Q_ANSWER_APPROVE = 'QAS_Q_ANSWER_APPROVE';                                 // 回复赞成或反对
export const QAS_Q_ANSWER_REPLY_ADD = 'QAS_Q_ANSWER_REPLY_ADD';                             // 添加Answer的回复
export const QAS_Q_USER_AGGREGATE_DATA = 'QAS_Q_USER_AGGREGATE_DATA';                       // 用户统计数据
export const QAS_Q_USER_AGGREGATE_COLLECTION_QUESTION = 'QAS_Q_USER_AGGREGATE_COLLECTION_QUESTION';     // 用户统计数据 我关注的问题
export const QAS_Q_USER_AGGREGATE_COLLECTION_ANSWER = 'QAS_Q_USER_AGGREGATE_COLLECTION_ANSWER';         // 用户统计数据 我的收藏
export const QAS_Q_USER_AGGREGATE_MY_QUESTION = 'QAS_Q_USER_AGGREGATE_MY_QUESTION';         // 用户统计数据 我提出的问题
export const QAS_Q_REPLY_ANSWER_DIALOG_VISIBLE = 'QAS_Q_REPLY_ANSWER_DIALOG_VISIBLE';       // 回复 回答的弹框可见
export const QAS_Q_ANSWER_EXPAND_ID = 'QAS_Q_ANSWER_EXPAND_ID';                             // 展开某条提问的回答列表
export const QAS_Q_ANSWER_FOLD_ID = 'QAS_Q_ANSWER_FOLD_ID';                                 // 折叠某条提问的回答列表

// ---------------------------
// Actions
// ---------------------------
/**
 * 获取提问列表 
 * @param page 当前页码
 * @param size 页面大小
 */
const getQuestionList = (page = 1, size = 10) => {
    return (dispatch, getState) => {
        const state = getState();

        return request.get('question/recent', { page, size }).then((data) => {
            dispatch({
                type: QAS_Q_LIST,
                data: data
            });
        });
    }
}

/**
 * 切换提问框的可见性
 */
const togglePushQuestionDialogVisible = () => {
    return {
        type: QAS_Q_DIALOG_TOGGLE,
        // data: !pushQuestionDialogVisible,
    }
}

/**
 * 清空提问详情数据
 */
const clearQDetailData = () => {
    return {
        type: QAS_Q_DETAIL_DATA_CLEAR,
    }
}

/**
 * 分页页码切换
 * @param pageNum 当前页码
 * @param pageSize 页面大小
 */
const onPageChanged = (pageNum = 1, pageSize = 10) => {
    return {
        type: QAS_Q_LIST_PAGE_CHANGED,
        data: {
            pageNum,
            pageSize
        }
    }
}

/**
 * 切换详情对话框的可见性
 */
const setDetailDialogVisible = (visible) => {
    return {
        type: QAS_Q_DETAIL_DIALOG_VISIBLE,
        data: visible
    }
}

/**
 * 选中某条提问
 * @param id 
 */
const onSelectedQ = (id) => {
    return {
        type: QAS_Q_DETAIL_SELECTED,
        data: id
    }
}

/**
 * 展开某条提问的回答列表
 * @param id 
 */
const expandAnswer = (id) => {
    return {
        type: QAS_Q_ANSWER_EXPAND_ID,
        data: id
    }
}

/**
 * 展开某条提问的回答列表
 * @param id 
 */
const foldAnswer = (id) => {
    return {
        type: QAS_Q_ANSWER_FOLD_ID,
        data: id
    }
}

/**
 * 获取详情数据
 * @param id 
 */
const getQDetailData = (id) => {
    return (dispatch, getState) => {
        // const state = getState();

        dispatch({
            type: QAS_Q_DETAIL_LOADING_SHOW,
            data: true
        });

        return request.get('question/detail', { questionId: id }).then((data) => {
            dispatch({
                type: QAS_Q_DETAIL_DATA_FETCH,
                data: data
            });

            dispatch({
                type: QAS_Q_DETAIL_LOADING_HIDE,
                data: false
            })
        });
    }
}

/**
 * 刷新详情数据
 */
const refreshQDetailData = (id) => {
    return (dispatch, getState) => {
        const state = getState();

        return request.get('question/detail', { questionId: id }).then((data) => {
            dispatch({
                type: QAS_Q_DETAIL_DATA_FETCH,
                data: data
            });
        });
    }
}

/**
 * 详情框中显示loading
 */
const showDetailDialogLoading = () => {
    return {
        type: QAS_Q_DETAIL_LOADING_SHOW,
        data: true
    }
}

const hideHetailDialogLoading = () => {
    return {
        type: QAS_Q_DETAIL_LOADING_HIDE,
        data: false
    }
}

/**
 * 提交问题
 */
const submitQuestion = (question) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;

        // 补充提交问题的用户的id
        const param = Object.assign({
            title: '',
            question: '',
            isAnonymous: false,
            tag: []
        }, question);

        // 发送请求
        return request.post('question/add', param).then((result) => {
            if (result) {
                // 刷新问题列表
                dispatch(getQuestionList());

                dispatch({
                    type: QAS_Q_USER_AGGREGATE_MY_QUESTION,
                    data: {
                        increase: true
                    }
                })
            }
        });
    }
}

/**
 * 展开快速提问
 */
const expandQuickQuestion = () => {
    return {
        type: QAS_Q_QUICK_EXPAND,
        data: true
    }
}

/**
 * 收起快速提问
 */
const foldQuickQuestion = () => {
    return {
        type: QAS_Q_QUICK_EXPAND,
        data: false
    }
}

/**
 * 关注问题
 */
const concernQuestion = (questionId) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;

        return request.post('questionCollected/add', {
            question: {
                id: questionId
            }
        }).then((result) => {
            if (result) {
                dispatch({
                    type: QAS_Q_CONCERN,
                    data: {
                        id: questionId,
                        hasCollected: true
                    }
                });

                dispatch({
                    type: QAS_Q_USER_AGGREGATE_COLLECTION_QUESTION,
                    data: {
                        increase: true
                    }
                });
            }
        });
    }

    // return {
    //     type: QAS_Q_CONCERN,
    //     data: {
    //         id: questionId,
    //         hasCollected: true
    //     }
    // }
}

/**
 * 取消关注
 */
const unconcernQuestion = (questionId) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;

        return request.post('questionCollected/unconcern', {
            question: {
                id: questionId
            }
        }).then((result) => {
            dispatch({
                type: QAS_Q_CONCERN,
                data: {
                    id: questionId,
                    hasCollected: false
                }
            });

            dispatch({
                type: QAS_Q_USER_AGGREGATE_COLLECTION_QUESTION,
                data: {
                    increase: false
                }
            });
        })
    }

    // return {
    //     type: QAS_Q_CONCERN,
    //     data: {
    //         id: questionId,
    //         hasCollected: false
    //     }
    // }
}

/**
 * 设置回复对话框是否显示
 */
const setReplyDialogVisible = (visible) => {
    return {
        type: QAS_Q_REPLY_DIALOG_VISIBLE,
        data: visible,
    }
}

/**
 * 回复问题
 * @param questionId 问题 id
 * @param answer 回复问题内容
 */
const addReply = (questionId, answer) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;

        return request.post('answer/add', {
            question: {
                id: questionId
            },
            user: {
                // id: userId
                id: 1
            },
            answer,
            isAnonymous: false,
        }).then((result) => {
            // 回答数 +1
            dispatch({
                type: QAS_Q_ANSWER_ADD,
                data: questionId,
            });

            // 关闭回复框
            dispatch({
                type: QAS_Q_REPLY_DIALOG_VISIBLE,
                data: false,
            })
        })
    }
}

/**
 * 回答问题框焦点处理
 * @param expand 是否展开
 */
const replyQuestionExpand = (expand: boolean) => {
    return {
        type: QAS_Q_DETAIL_REPLY_EXPAND,
        data: expand,
    }
}

/**
 * 回答问题框焦点处理
 * @param expand 是否展开
 */
const alReplyQuestionExpand = (id: number, expand: boolean) => {
    return {
        type: QAS_Q_ANSWER_LIST_REPLY_EXPAND,
        data: {
            id,
            expand
        },
    }
}

/**
 * 赞成 或 反对问题
 * @param id 
 * @param approve 
 */
const approveAnswer = (id: number, hasApproved: boolean, questionId: number) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;
        const url = hasApproved ? 'answer/approve' : 'answer/disapprove';

        return request.post(url, {
            answer: {
                id
            },
            user: {
                // id: userId
                id: 1
            },
        }).then((result) => {
            dispatch({
                type: QAS_Q_ANSWER_APPROVE,
                data: {
                    id,
                    hasApproved,
                    questionId
                }
            })
        })
    }
}

/**
 * 收藏 回应
 * @param id 
 */
const collectAnswer = (id: number, hasCollected: boolean, questionId: number) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;

        const url = hasCollected ? 'answerCollected/add' : 'answerCollected/unconcern';

        return request.post(url, {
            answer: {
                id
            },
            user: {
                // id: userId
                id: 1
            },
        }).then((result) => {
            dispatch({
                type: QAS_Q_ANSWER_COLLECTED,
                data: {
                    id: id,
                    hasCollected,
                    questionId
                },
            });

            dispatch({
                type: QAS_Q_USER_AGGREGATE_COLLECTION_ANSWER,
                data: {
                    increase: hasCollected
                }
            })
        })

        // dispatch({
        //     type: QAS_Q_ANSWER_COLLECTED,
        //     data: {
        //         id: id,
        //         hasCollected
        //     },
        // });
    }
}

const getMyAggregateData = () => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;

        return request.get('question/profile').then((data) => {
            dispatch({
                type: QAS_Q_USER_AGGREGATE_DATA,
                data: Immutable.fromJS(data)
            })
        })
    }
}

/**
 * 设置回复回答弹框可见
 * @param visible 
 */
const setReplyAnswerDialogVisible = (id, visible, questionId) => {
    return {
        type: QAS_Q_REPLY_ANSWER_DIALOG_VISIBLE,
        data: {
            id,
            visible,
            questionId
        }
    }
}

/**
 * 提交对问题进行的回复
 * @param id 
 * @param content 
 */
const submitAnswerReply = (id, content, questionId) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;
        const url = 'pump/add';

        return request.post(url, {
            answer: {
                id
            },
            user: {
                // id: userId
                id: 1
            },
            content,
            isAnonymous: false
        }).then((data) => {
            if (data) {
                // 关闭回复对话框
                dispatch({
                    type: QAS_Q_REPLY_ANSWER_DIALOG_VISIBLE,
                    data: {
                        id: null,
                        visible: false,
                        questionId: null
                    }
                });

                // 更新answer的回复数据
                dispatch({
                    type: QAS_Q_ANSWER_REPLY_ADD,
                    data: {
                        id,
                        pump: data,
                        questionId
                    }
                })
            }
        })
    }
}

export {
    getQuestionList,
    togglePushQuestionDialogVisible,
    onPageChanged,
    onSelectedQ,
    setDetailDialogVisible,
    getQDetailData,
    clearQDetailData,
    showDetailDialogLoading,
    hideHetailDialogLoading,
    submitQuestion,
    expandQuickQuestion,
    foldQuickQuestion,
    concernQuestion,
    unconcernQuestion,
    setReplyDialogVisible,
    addReply,
    replyQuestionExpand,
    refreshQDetailData,
    approveAnswer,
    collectAnswer,
    getMyAggregateData,
    setReplyAnswerDialogVisible,
    submitAnswerReply,
    expandAnswer,
    alReplyQuestionExpand,
    foldAnswer
}
