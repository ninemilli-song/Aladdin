/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';
import ViewComponent from '../components';
import { FilterOptions } from '../../../components/filter/FilterItem';
import request from '../../../utils/fetch';

// ---------------------------
// Actions
// ---------------------------


const mapActionCreators = (dispatch) => {
    return {
        action: {

        },
    }
}

const mapStateToProps = (state) => ({
    store: state.QAS,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
