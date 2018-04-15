/**
 * The Container fo PushQuestionDialog Component
 */
import { connect } from 'react-redux';
import { togglePushQuestionDialogVisible } from '../actions/index';
import PushQuestionDialog from '../components/PushQuestionDialog';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            togglePushQuestionDialogVisible: () => {
                dispatch(togglePushQuestionDialogVisible());
            }
        },
    }
}

const mapStateToProps = (state) => ({
    visible: state.QAS.getIn(['uistate', 'pushQuestionDialogVisible']),
    loading: state.QAS.getIn(['uistate', 'pushQuestionDialogLoading']),
})

export default connect(mapStateToProps, mapActionCreators)(PushQuestionDialog);

