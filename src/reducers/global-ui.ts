const { fromJS } = require('immutable');
import { LOGIN_DIALOG_VISIBLE } from '../actions/user';

// ------------------------------------
// Reducer Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOGIN_DIALOG_VISIBLE]: (state, action) => state.update('loginDialogShow', action.data)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
    loginDialogVisible: false
});

export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}
