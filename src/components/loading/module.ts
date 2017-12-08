// ------------------------------------
// Constants
// ------------------------------------
export const SHOWLOADING = 'SHOWLOADING';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SHOWLOADING]: (state, action) => action.showLoading
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false;
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}
