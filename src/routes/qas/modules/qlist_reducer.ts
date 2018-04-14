/**
 * Case Reducer
 */
export const QAS_Q_LIST = 'QAS_Q_LIST';

/**
 * 
 * @param state 
 * @param action 
 */
export const setQuestionList = (state, action) => {
    return state.updateIn(['data', 'QList'], data => action.data);
}
