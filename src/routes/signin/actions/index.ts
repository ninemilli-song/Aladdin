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
 * @param name 
 * @param password 
 */
const signin = (name, password) => {
    return (dispatch, getState) => {
        return request.get('auth/login', { name,  password }).then((data) => {
            dispatch({
                type: USER_SIGNIN,
                data: data
            });

            // window.open('/signin', '_self');
            // browserHistory.goBack();
        });
    }
}

export {
    signin
}
