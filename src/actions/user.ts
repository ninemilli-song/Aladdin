import request from '../utils/fetch';
import { deleteCookie } from '../utils/cookie';
import jwtConstant from '../constant/jwt';
import { browserHistory } from 'react-router';

export const GET_USER_INFO = 'GET_USER_INFO';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_LOGOUT = 'USER_LOGOUT';

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

/**
 * 用户退出登录
 */
const logout = () => {
    // 清空客户端cookie中的用户id、token
    // deleteCookie(jwtConstant.TOKEN_COOKIE_NAME);
    // deleteCookie(jwtConstant.ADMIN_COOKIE_NAME);
    return (dispatch, getState) => {
        return request.get('auth/logout').then((result) => {
            if (result.success) {
                // 清空store中用户数据
                dispatch({
                    type: USER_LOGOUT,
                })
            }
        }).then(() => {
            console.log('browserHistory ======> ', browserHistory);
            browserHistory.push('/signin');
        });
    }
}

export {
    getUserInfo,
    logout
}
