/**
 * The Container fo QItem Component
 */
import { connect } from 'react-redux';
import QItem from '../components/QItem';
import { toggleDetailDialogVisible, onSelectedQ } from '../actions/index';
import { toJS } from '../../../utils/hocs';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            showQDetail: (id) => {                                                      // 显示提问详情
                dispatch(toggleDetailDialogVisible());                                  // 显示提问详情
                dispatch(onSelectedQ(id));                                              // 设置选中的提问 id
            }
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    const qList = state.QAS.getIn(['data', 'QList', 'list']);
    const { id } = ownProps;
    
    const data = qList.find((item) => {
        return item.get('id') === id;
    })

    return {
        data,
    }
}

export default connect(mapStateToProps, mapActionCreators)(toJS(QItem));
