import { SHOWLOADING } from '../actions/loaing';

// ------------------------------------
// Reducer Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SHOWLOADING]: (state, action) => action.data
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false;

export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}
