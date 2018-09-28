/**
 * Define reducer and action of Warehouse
 */
import * as Immutable from 'immutable';
import { GridQueryOptions, paginationOptions, filterOptions, sorterOptions } from '../../../common/globalInterface';

import { createReducer } from '../../../utils/reducer-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const ACCOUNTING_ROLE_FILTER_DATA = 'ACCOUNTING_ROLE_FILTER_DATA';
export const ACCOUNTINT_CHANNELS = 'ACCOUNTINT_CHANNELS';
export const ACCOUNTINT_SELECT_MENU = 'ACCOUNTINT_SELECT_MENU';
export const ACCOUNTINT_ROLE_CHANGED = 'ACCOUNTINT_ROLE_CHANGED';
export const ACCOUNTING_ROLE_TYPES = 'ACCOUNTING_ROLE_TYPES';
export const ACCOUNTING_ROLE_SP_DETAIL = 'ACCOUNTING_ROLE_SP_DETAIL';
export const ACCOUNTING_SUBJECT_CATEGORY = 'ACCOUNTING_SUBJECT_CATEGORY';
export const ACCOUNTING_SUBJECT_DATA = 'ACCOUNTING_SUBJECT_DATA';
export const ACCOUNTING_REPORT_DATA = 'ACCOUNTING_REPORT_DATA';
export const ACCOUNTING_ROLETYPE_SELECT = 'ACCOUNTING_ROLETYPE_SELECT';

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

const roleTypes = (state, action) => {
    return Object.assign({}, state, {
        roleTypes: action.data,
    })
}

const channels = (state, action) => {
    return Object.assign({}, state, {
        channels: action.data,
    });
}

const selectedMenu = (state, action) => {
    return Object.assign({}, state, {
        selectedMenu: action.data,
    });
}

const onRoleChanged = (state, action) => {
    return Object.assign({}, state, {
        role: action.data,
    })
}

const getSPRuleDetail = (state, action) => {
    return Object.assign({}, state, {
        spRuleDetail: action.data,
    })
}

const getSubjectCategory = (state, action) => {
    return Object.assign({}, state, {
        subjectCategory: action.data,
    });
}

const getSubjectsData = (state, action) => {
    return Object.assign({}, state, {
        subjectsData: action.data,
    });
}

const getReportData = (state, action) => {
    return Object.assign({}, state, {
        reportData: action.data,
    });
}

const selectRoleType = (state, action) => {
    return Object.assign({}, state, {
        roleTypeSelected: action.data,
    });
}

const ACTION_HANDLERS = {
    [ACCOUNTING_ROLE_FILTER_DATA]: filterData,
    [ACCOUNTING_ROLE_TYPES]: roleTypes,
    [ACCOUNTINT_CHANNELS]: channels,
    [ACCOUNTINT_SELECT_MENU]: selectedMenu,
    [ACCOUNTINT_ROLE_CHANGED]: onRoleChanged,
    [ACCOUNTING_ROLE_SP_DETAIL]: getSPRuleDetail,
    [ACCOUNTING_SUBJECT_CATEGORY]: getSubjectCategory,
    [ACCOUNTING_SUBJECT_DATA]: getSubjectsData,
    [ACCOUNTING_REPORT_DATA]: getReportData,
    [ACCOUNTING_ROLETYPE_SELECT]: selectRoleType,
}

// 初始化模块数据
const initialState = {
    filterData: {},                 // 会计制度的过滤数据
    channels: [],                   // 频道配置数据
    selectedMenu: 'rules',          // The selected menu key
    roleTypes: [],                  // 会计制度类型
    role: {
        roleGPData: '',             // roleText content
        roleSPData: [],             // roleText content
    },
    spRuleDetail: {},               // 具体准则内容
    subjectCategory: [],            // 科目 - 会计科目分类
    subjectsData: [],               // 科目 - 会计科目数据
    reportData: [],                 // 报表数据
    roleTypeSelected: {             // 选中的准则/制度 和 年份
        roleType: '1',              // roleType value
        roleYear: '2006',           // roleYear value
    }
};

// --------------------------------------
// Slice reducer
// --------------------------------------
const reducer = createReducer(initialState, ACTION_HANDLERS);
export default reducer;
