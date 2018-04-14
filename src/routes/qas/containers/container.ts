/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';
import ViewComponent from '../components';
import { getQuestionList, togglePushQuestionDialogVisible } from '../actions/index';

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
