/**
 * The Container fo QList Component
 */
import { connect } from 'react-redux';
import QList from '../components/Qlist';
import { getQuestionList, onPageChanged } from '../actions/index';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            getQuestionList: (pageNum, pageSize) => {
                dispatch(getQuestionList(pageNum, pageSize));

                dispatch(onPageChanged(pageNum, pageSize));
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

export default connect(mapStateToProps, mapActionCreators)(QList);
