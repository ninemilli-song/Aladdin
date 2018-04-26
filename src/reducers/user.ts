import { GET_USER_INFO, USER_SIGNIN } from '../actions/user';

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
        id: action.data ? action.data.id : null,
        name: action.data ? action.data.name : '',
        isAuthenticated: !!action.data
    });
};

// ------------------------------------
// reducer
// ------------------------------------
const ACTION_HANDLERS = {
    [GET_USER_INFO]: getUserInfo,
    [USER_SIGNIN]: userSignin,
}

// ------------------------------------
// init state
// ------------------------------------
const initState = {
    id: null,
    name: null,
    isAuthenticated: false,            // 用户是否认证
}

export default function userInfoReducer(state = initState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
