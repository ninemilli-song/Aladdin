import request from '../../../utils/fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const USER_SIGNIN = 'USER_SIGNIN';

// ---------------------------
// Actions
// ---------------------------
/**
 * 登陆
 * @param name 
 * @param password 
 */
const signin = (name, password) => {
    return (dispatch, getState) => {
        return request.get('auth/login', { name,  password }).then((result) => {
            const data = result.data;

            dispatch({
                type: USER_SIGNIN,
                data: data
            });
        });
    }
}

export {
    signin
}
