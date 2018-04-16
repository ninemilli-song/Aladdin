/**
 * The Container fo QDetailDialog Component
 */
import { connect } from 'react-redux';
import { toggleDetailDialogVisible } from '../actions/index';
import QDetailDialog from '../components/QDetailDialog';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            hide: () => {
                dispatch(toggleDetailDialogVisible());
            }
        },
    }
}

const mapStateToProps = (state) => ({
    visible: state.QAS.getIn(['uistate', 'qDetailDialogOpts', 'visible']),
    id: state.QAS.getIn(['selectedQId']),
})

export default connect(mapStateToProps, mapActionCreators)(QDetailDialog);
