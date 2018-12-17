/**
 * create reducer
 * @param initState 
 * @param handlers 
 */
export function createReducer(initState, handlers) {
    return function reducer(state = initState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}
