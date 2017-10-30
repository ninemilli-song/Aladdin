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

const ACTION_HANDLERS = {
    [ACCOUNTING_ROLE_FILTER_DATA]: filterData,
    [ACCOUNTINT_CHANNELS]: channels
}

const initialState = {
    filterData: [],
    channels: []
};

// --------------------------------------
// Slice reducer
// --------------------------------------
const reducer = createReducer(initialState, ACTION_HANDLERS);
export default reducer;
