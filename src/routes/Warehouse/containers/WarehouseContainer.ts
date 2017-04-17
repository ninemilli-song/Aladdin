/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';

import Warehouse from '../components/Warehouse';
import { getList, getCategory } from '../modules/warehouse';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            getList: () => {
                dispatch(getList());
            },
            getCategory: () => {
                dispatch(getCategory());
            },
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.warehouse,
})

export default connect(mapStateToProps, mapActionCreators)(Warehouse);
