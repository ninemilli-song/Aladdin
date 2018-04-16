import request from '../../../utils/fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const QAS_Q_DIALOG_TOGGLE = 'QAS_Q_DIALOG_TOGGLE';
export const QAS_Q_LIST = 'QAS_Q_LIST';
export const QAS_Q_LIST_PAGE_CHANGED = 'QAS_Q_LIST_PAGE_CHANGED';               // 分页页码切换

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

export {
    getQuestionList,
    togglePushQuestionDialogVisible,
    onPageChanged
}
