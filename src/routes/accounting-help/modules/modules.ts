/**
 * Define reducer and action of Warehouse
 */
import * as Immutable from 'immutable';
const Mock = require('mockjs');
import { GridQueryOptions, paginationOptions, filterOptions, sorterOptions } from '../../../common/globalInterface';
import { SHOWLOADING } from '../../../common/appActions';

import { createReducer } from '../../../utils/reducer-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const ACCOUNTING_ROLE_FILTER_DATA = 'ACCOUNTING_ROLE_FILTER_DATA';
export const ACCOUNTINT_CHANNELS = 'ACCOUNTINT_CHANNELS';
export const ACCOUNTINT_SELECT_ROLE = 'ACCOUNTINT_SELECT_ROLE';
export const ACCOUNTINT_SELECT_YEAR = 'ACCOUNTINT_SELECT_YEAR';
export const ACCOUNTINT_SELECT_MENU = 'ACCOUNTINT_SELECT_MENU';

// -------------------------------------
// Reducer
// -------------------------------------

// ------------------------------------
// Case reducer
// ------------------------------------
const filterData = (state, action) => {
    return Object.assign({}, state, {
        filterData: action.data,
    });
}

const channels = (state, action) => {
    return Object.assign({}, state, {
        channels: action.data,
    });
}

const selectedRole = (state, action) => {
    return Object.assign({}, state, {
        selectedRole: action.data,
    });
}

const selectedYear = (state, action) => {
    return Object.assign({}, state, {
        selectedYear: action.data,
    });
}

const selectedMenu = (state, action) => {
    return Object.assign({}, state, {
        selectedMenu: action.data,
    });
}

const ACTION_HANDLERS = {
    [ACCOUNTING_ROLE_FILTER_DATA]: filterData,
    [ACCOUNTINT_CHANNELS]: channels,
    [ACCOUNTINT_SELECT_ROLE]: selectedRole,
    [ACCOUNTINT_SELECT_YEAR]: selectedYear,
    [ACCOUNTINT_SELECT_MENU]: selectedMenu,
}

// 初始化模块数据
const initialState = {
    filterData: {},             // 会计制度的过滤数据
    channels: [],               // 频道配置数据
    selectedMenu: 'rules',           // The selected menu key
    selectedRole: 'option1',    // 选中的“制度/准则”
    selectedYear: '2006',       // 选中的“执行年份”
};

// --------------------------------------
// Slice reducer
// --------------------------------------
const reducer = createReducer(initialState, ACTION_HANDLERS);
export default reducer;
