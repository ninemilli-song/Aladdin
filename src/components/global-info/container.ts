/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';

import Component from './Component';
// import { getUserInfo } from './module';

const mapActionCreators = (dispatch) => {
    return {
        action: {
            getUserInfo: () => {
                // dispatch(getUserInfo());
            },
        },
    }
}

const mapStateToProps = (state) => ({
    data: state.userInfo,
})

export default connect(mapStateToProps, mapActionCreators)(Component);
