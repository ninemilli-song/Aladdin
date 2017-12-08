/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';
import ui from 'redux-ui';

import Warehouse from '../components';
import { getList, getUserInfo } from '../modules';

import { GridQueryOptions } from '../../../common/globalInterface';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            getList: (options: GridQueryOptions) => {
                dispatch(getList(options));
            },
            getUserInfo: () => {
                dispatch(getUserInfo());
            },
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.warehouse,
})

export default ui()(connect(mapStateToProps, mapActionCreators)(Warehouse));
