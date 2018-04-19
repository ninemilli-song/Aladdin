/**
 * The Container fo QDetailDialog Component
 */
import { connect } from 'react-redux';
import { toggleDetailDialogVisible, getQDetailData } from '../actions/index';
import QDetailDialog from '../components/QDetailDialog';
import { toJS } from '../../../utils/hocs';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            hide: () => {
                dispatch(toggleDetailDialogVisible());
            },
            getData: (id) => {
                dispatch(getQDetailData(id));
            }
        },
    }
}

const mapStateToProps = (state) => ({
    visible: state.QAS.getIn(['uistate', 'qDetailDialogOpts', 'visible']),
    id: state.QAS.getIn(['selectedQId']),
    data: state.QAS.getIn(['qDetailData'])
})

export default connect(mapStateToProps, mapActionCreators)(toJS(QDetailDialog));
