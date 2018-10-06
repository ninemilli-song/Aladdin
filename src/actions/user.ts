import request from '../utils/fetch';
import { deleteCookie } from '../utils/cookie';
import { browserHistory } from 'react-router';

export const GET_USER_INFO = 'GET_USER_INFO';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const LOGIN_DIALOG_VISIBLE = 'LOGIN_DIALOG_VISIBLE';

/**
 * 用户相关 action
 */
const getUserInfo = () => {
    return (dispatch, getState) => {
        return request.get('sysUser/getUser').then((data) => {
                dispatch({
                    type: GET_USER_INFO,
                    data: data
                });
        });
    }
}

/**
 * 用户退出登录
 */
const logout = () => {
    // 清空客户端cookie中的用户id、token
    return (dispatch, getState) => {
        return request.post('sysUser/logout').then((result) => {
            // 清空store中用户数据
            dispatch({
                type: USER_LOGOUT,
            })
        });
    }
}

/**
 * 登陆
 * @param mobile 
 * @param password 
 */
const login = (mobile: string, password: string) => {
    return (dispatch, getState) => {
        return request.get('sysUser/login', { mobile,  password }).then((data) => {
            dispatch({
                type: USER_SIGNIN,
                data: data
            });
        });
    }
}

/**
 * 设置用户登陆弹框是否可见
 * @param visible 
 */
const loginDialogVisible = (visible) => {
    return {
        type: LOGIN_DIALOG_VISIBLE,
        data: visible
    }
}

export {
    getUserInfo,
    login,
    logout,
    loginDialogVisible
}
