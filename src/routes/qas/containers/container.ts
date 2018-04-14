/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';
import ViewComponent from '../components';
import { FilterOptions } from '../../../components/filter/FilterItem';
import request from '../../../utils/fetch';
import { QAS_Q_LIST } from '../modules/qlist_reducer';
import { QAS_Q_DIALOG_TOGGLE } from '../modules/push_q_dialog_reducer';

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
    return (dispatch, getState) => {
        // const state = getState().QAS;
        // const pushQuestionDialogVisible = state.getIn(['uistate', 'pushQuestionDialogVisible']);

        dispatch({
            type: QAS_Q_DIALOG_TOGGLE,
            // data: !pushQuestionDialogVisible,
        })
    }
}


const mapActionCreators = (dispatch) => {
    return {
        action: {
            getQuestionList: () => {
                dispatch(getQuestionList());
            },
            togglePushQuestionDialogVisible: () => {
                dispatch(togglePushQuestionDialogVisible());
            }
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.QAS,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
