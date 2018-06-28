// ------------------------------------
// Case reducer for UI state
// ------------------------------------
export const setQuickQuestionExpand = (state, action) => {
    return state.updateIn(['uistate', 'quickQuestionExpand'], expand => {
        return action.data;
    });
}

/**
 * 设置回复回答对话框是否可见
 * @param state 
 * @param action 
 */
export const setReplyAnswerDialogVisible = (state, action) => {
    return state.setIn(['uistate', 'qReplyAnswerDialogOpts', 'visible'], action.data);
}
