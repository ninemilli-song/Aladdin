import request from '../../../utils/fetch';
import { browserHistory } from 'react-router';

// ------------------------------------
// Constants
// ------------------------------------
export const USER_SIGNIN = 'USER_SIGNIN';

// ---------------------------
// Actions
// ---------------------------
/**
 * 登陆
 * @param mobile 
 * @param password 
 */
const signin = (mobile, password) => {
    return (dispatch, getState) => {
        return request.get('auth/login', { mobile,  password }).then((data) => {
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
