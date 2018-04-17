/**
 * The Container fo AnswerList Component
 */
import { connect } from 'react-redux';
import {  } from '../actions/index';
import AnswerList from '../components/AnswerList';

const mapActionCreators = (dispatch) => {
   return {
       action: {
           
       },
   }
}

const mapStateToProps = (state) => ({
   data: state.QAS.getIn(['qDetailData', 'answers']),
})

const AnswerListContainer = connect(mapStateToProps, mapActionCreators)(AnswerList);

export default AnswerListContainer;
