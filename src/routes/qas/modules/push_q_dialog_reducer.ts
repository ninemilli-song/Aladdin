/**
 * Case Reducer of PushQuestionDialog
 */

// ------------------------------------
// Constants
// ------------------------------------
export const QAS_Q_DIALOG_TOGGLE = 'QAS_Q_DIALOG_TOGGLE';

// ------------------------------------
// Case reducer
// ------------------------------------
export const setPushQuestionDialogVisible = (state, action) => {
    return state.updateIn(['uistate', 'pushQuestionDialogVisible'], visible => !visible);
}
