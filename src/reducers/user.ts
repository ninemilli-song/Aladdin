import { GET_USER_INFO, USER_SIGNIN, USER_LOGOUT } from '../actions/user';

// 获取用户信息
const getUserInfo = (state, action) => {
    const { userName, ...other } = action.data;

    return Object.assign({}, state, {
        isAuthenticated: !!action.data,
        ...other
    });
};

// 用户登陆
const userSignin = (state, action) => {
    return Object.assign({}, state, {
        ...action.data,
        isAuthenticated: !!action.data
    });
};

// 用户登出
const userLogout = (state, action) => {
    return {
        isAuthenticated: false
    };
};

// ------------------------------------
// reducer
// ------------------------------------
const ACTION_HANDLERS = {
    [GET_USER_INFO]: getUserInfo,
    [USER_SIGNIN]: userSignin,
    [USER_LOGOUT]: userLogout,
    ['CHANGEUSERNAME']: (state, action) => {
        return Object.assign({}, state, action.payload);
    }
}

// ------------------------------------
// init state
// ------------------------------------
const initState = {
    isAuthenticated: false,            // 用户是否认证
    username: 'aaa'
}

export default function userInfoReducer(state = initState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
