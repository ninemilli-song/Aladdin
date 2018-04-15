/**
 * The Container fo QList Component
 */
import { connect } from 'react-redux';
import QList from '../components/Qlist';

const mapActionCreators = (dispatch) => {
    return {
        action: {
        },
    }
}

const mapStateToProps = (state) => ({
    data: state.QAS.getIn(['data', 'QList']),
})

export default connect(mapStateToProps, mapActionCreators)(QList);
