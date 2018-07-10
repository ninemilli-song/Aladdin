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
    const { id, visible, questionId } = action.data;

    return state.setIn(['uistate', 'qReplyAnswerDialogOpts', 'visible'], visible)
                .updateIn(['uistate', 'qReplyAnswerDialogOpts', 'data'], () => {
                    const answers = state.getIn(['qExpandQuestions', questionId, 'data', 'answers']);

                    return answers ? answers.find((item) => {
                        return item.get('id') === id;
                    }) : null;
                })
                .setIn(['uistate', 'qReplyAnswerDialogOpts', 'questionId'], questionId);
}
