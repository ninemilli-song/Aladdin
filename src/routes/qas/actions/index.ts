import request from '../../../utils/fetch';

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
        const userId = state.userInfo.id;

        return request.get('api/qas/getQuestions', { page,  size, userId }).then((result) => {
            if (result.success) {
                const data = result.success.data;

                dispatch({
                    type: QAS_Q_LIST,
                    data: data
                });
            }
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
 * 获取详情数据
 * @param id 
 */
const getQDetailData = (id) => {
    return (dispatch, getState) => {
        const state = getState();
        const userId = state.userInfo.id;

        dispatch({
            type: QAS_Q_DETAIL_LOADING_SHOW,
            data: true
        });

        return request.get('api/qas/getQuestionDetail', { questionId: id, userId }).then((result) => {
            if (result.success) {
                const data = result.success.data;

                dispatch({
                    type: QAS_Q_DETAIL_DATA_FETCH,
                    data: data
                });
            }

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
        return request.get('api/qas/getQuestionDetail', { questionID: id }).then((result) => {
            if (result.success) {
                const data = result.success.data;

                dispatch({
                    type: QAS_Q_DETAIL_DATA_FETCH,
                    data: data
                });
            }
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
        }, question, {
            user: {
                id: userId
            }
        });

        // 发送请求
        return request.post('/qas/addQuestion', param).then((result) => {
            if (result.meta.success) {
                // 刷新问题列表
                dispatch(getQuestionList());
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

        return request.post('/qas/concernQuestion', {
            question: {
                id: questionId
            },
            user: {
                id: userId
            }
        }).then((result) => {
            if (result.success) {
                dispatch({
                    type: QAS_Q_CONCERN,
                    data: {
                        id: questionId,
                        hasCollected: true
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

        return request.post('/qas/unconcernQuestion', {
            question: {
                id: questionId
            },
            user: {
                id: userId
            }
        }).then((result) => {
            dispatch({
                type: QAS_Q_CONCERN,
                data: {
                    id: questionId,
                    hasCollected: false
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

        return request.post('/qas/replyQuestion', {
            question: {
                id: questionId
            },
            user: {
                id: userId
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
    refreshQDetailData
}
