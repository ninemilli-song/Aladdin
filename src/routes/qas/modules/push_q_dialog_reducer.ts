/**
 * Case Reducer of PushQuestionDialog
 */

// ------------------------------------
// Case reducer
// ------------------------------------
export const setPushQuestionDialogVisible = (state, action) => {
    return state.updateIn(['uistate', 'pushQuestionDialogVisible'], visible => {
        return !visible;
    });
}
