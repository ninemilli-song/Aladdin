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

// ---------------------------
// Actions
// ---------------------------
/**
 * 获取提问列表 
 * @param pageNum 当前页码
 * @param pageSize 页面大小
 */
const getQuestionList = (pageNum = 1, pageSize = 10) => {
    return (dispatch, getState) => {
        return request.get('api/qas/getQuestions', { pageNum,  pageSize }).then((result) => {
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
        dispatch({
            type: QAS_Q_DETAIL_LOADING_SHOW,
            data: true
        });

        return request.get('api/qas/getQuestionDetail', { id }).then((result) => {
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
        const param = Object.assign({}, question, {
            user: {
                id: userId
            }
        });

        // 发送请求
        return request.post('/qas/addQuestion', param).then((result) => {
            if (result.meta.success) {
                // 关闭弹框
                dispatch(togglePushQuestionDialogVisible());

                // 刷新问题列表
                dispatch(getQuestionList());
            }
        });
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
    submitQuestion
}
