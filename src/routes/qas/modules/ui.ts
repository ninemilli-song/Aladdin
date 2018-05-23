// ------------------------------------
// Case reducer for UI state
// ------------------------------------
export const setQuickQuestionExpand = (state, action) => {
    return state.updateIn(['uistate', 'quickQuestionExpand'], expand => {
        return action.data;
    });
}
