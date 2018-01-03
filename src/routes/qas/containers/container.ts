/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';
import ViewComponent from '../components';
import { FilterOptions } from '../../../components/filter/FilterItem';
import request from '../../../utils/fetch';
import { QAS_Q_LIST, QAS_USER_DATA } from '../modules/modules';

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

const getUserQuestionData = () => {
    return (dispatch, getState) => {
        return request.get('api/qas/getUserQuestionData').then((result) => {
            if (result.success) {
                const data = result.success.data;

                dispatch({
                    type: QAS_USER_DATA,
                    data: data
                })
            }
        })
    }
}


const mapActionCreators = (dispatch) => {
    return {
        action: {
            getQuestionList: () => {
                dispatch(getQuestionList());
            },
            getUserQuestionData: () => {
                dispatch(getUserQuestionData());
            }
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.QAS,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
