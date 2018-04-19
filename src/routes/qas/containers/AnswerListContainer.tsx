/**
 * The Container fo AnswerList Component
 */
import { connect } from 'react-redux';
import {  } from '../actions/index';
import AnswerList from '../components/AnswerList';
import { toJS } from '../../../utils/hocs';

const mapActionCreators = (dispatch) => {
   return {
       action: {
           
       },
   }
}

const mapStateToProps = (state) => ({
   data: state.QAS.getIn(['qDetailData', 'answers']),
})

const AnswerListContainer = connect(mapStateToProps, mapActionCreators)(toJS(AnswerList));

export default AnswerListContainer;
