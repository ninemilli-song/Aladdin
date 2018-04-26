import request from '../utils/fetch';

export const GET_USER_INFO = 'GET_USER_INFO';
export const USER_SIGNIN = 'USER_SIGNIN';

/**
 * 用户相关 action
 */
const getUserInfo = () => {
    return (dispatch, getState) => {
        return request.get('api/user/getUserInfo').then((result) => {
            if (result.success) {
                const data = result.success.data;

                dispatch({
                    type: GET_USER_INFO,
                    data: data
                });
            }
        });
    }
}

export {
    getUserInfo
}
