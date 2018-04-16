/**
 * Case Reducer
 */

/**
 * 
 * @param state 
 * @param action 
 */
export const setQuestionList = (state, action) => {
    return state.updateIn(['data', 'QList'], data => action.data);
}

export const onPageChanged = (state, action) => {
    return state.updateIn(['uistate'], data => {
        return data.updateIn(['currentPage'], d => action.data.pageNum)
            .updateIn(['pageSize'], d => action.data.pageSize);
    });
}
