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
export const HOMEVIEW_QUANZI_DATA = 'HOMEVIEW_QUANZI_LIST';
export const HOMEVIEW_WENDA_DATA = 'HOMEVIEW_WENDA_DATA';

// -------------------------------------
// Reducer
// -------------------------------------

// ------------------------------------
// Case reducer
// ------------------------------------

const quanziData = (state, action) => {
    return Object.assign({}, state, {
        quanziData: action.data,
    });
}

const wendaData = (state, action) => {
    return Object.assign({}, state, {
        wendaData: action.data,
    })
}

const ACTION_HANDLERS = {
    [HOMEVIEW_QUANZI_DATA]: quanziData,
    [HOMEVIEW_WENDA_DATA]: wendaData,
}

const initialState = {
    quanziData: [],
    wendaData: [],
};

// Slice reducer
const homeViewReducer = createReducer(initialState, ACTION_HANDLERS);
export default homeViewReducer;
