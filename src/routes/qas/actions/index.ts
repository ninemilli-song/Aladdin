import request from '../../../utils/fetch';
import { QAS_Q_DIALOG_TOGGLE } from '../modules/push_q_dialog_reducer';
import { QAS_Q_LIST } from '../modules/qlist_reducer';

// ---------------------------
// Actions
// ---------------------------
const getQuestionList = () => {
    return (dispatch, getState) => {
        return request.get('api/qas/getQuestions').then((result) => {
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

export {
    getQuestionList,
    togglePushQuestionDialogVisible
}
