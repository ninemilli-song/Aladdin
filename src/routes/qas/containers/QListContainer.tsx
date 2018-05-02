/**
 * The Container fo QList Component
 */
import { connect } from 'react-redux';
import QList from '../components/Qlist';
import { getQuestionList, onPageChanged, toggleDetailDialogVisible, onSelectedQ } from '../actions/index';
import { toJS } from '../../../utils/hocs';
import { showLoading, hideLoading } from '../../../actions/loaing';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            getQuestionList: async (pageNum, pageSize) => {
                dispatch(getQuestionList(pageNum, pageSize));

                dispatch(onPageChanged(pageNum, pageSize));
            },
            showQDetail: (id) => {                                                      // 显示提问详情
                dispatch(toggleDetailDialogVisible());                                  // 显示提问详情
                dispatch(onSelectedQ(id));                                              // 设置选中的提问 id
            }
        },
    }
}

const mapStateToProps = (state) => ({
    data: state.QAS.getIn(['data', 'QList']),
    pageOptions: {
        currentPage: state.QAS.getIn(['uistate', 'currentPage']),
        pageSize: state.QAS.getIn(['uistate', 'pageSize']),
    }
})

export default connect(mapStateToProps, mapActionCreators)(toJS(QList));
