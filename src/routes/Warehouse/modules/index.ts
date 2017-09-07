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
export const WAREHOUSE_LIST = 'WAREHOUSE_LIST';
export const WAREHOUSE_CETUSERINFO = 'WAREHOUSE_CETUSERINFO';

// ------------------------------------
// Action
// ------------------------------------
function filterData(
    keyword: string = '',
    category: string | string[] = '',
    pagination: paginationOptions = null,
    filters: filterOptions = {},
    sorter: sorterOptions = null
    ) {
    console.info('🦀 ---------> filter data function');
    let data = mockWarehouseList;

    // Keyword filter
    if (!!keyword) {
        data = mockWarehouseList.filter((item) => {
            return item.name.indexOf(keyword) !== -1;
        });
    }
    console.info('🦀 ---------> keyword filter data: ', data);

    // Category filter
    if (category) {
        if (Array.isArray(category)) {
            if (category.length > 0) {
                data = data.filter((item) => {
                    return category.indexOf(item.category + '') !== -1;
                });
            }
        } else {
            data = data.filter((item) => {
                return item.category === category;
            });
        }
    }
    console.info('🦀 ---------> category filter data: ', data);

    // Filters filter
    const filterFields = Object.keys(filters);
    if (filterFields.length > 0) {
        data = data.filter((item) => {
            filterFields.forEach((field) => {
                return item[field] && filters[field].indexOf(item[field]) !== -1;
            });
        });
    }
    console.info('🦀 ---------> filters filter data: ', data);

    const total = data.length;

    // Do sorter
    if (sorter) {
        const { field, order } = sorter;

        data = data.sort((a, b) => {
            if (a < b) {
                return order === 'ascend' ? -1 : 1;
            } else if (a > b) {
                return order === 'ascend' ? 1 : -1;
            } else {
                return 0;
            }
        })
    }
    console.info('🦀 ---------> filters sort data: ', data);

    // Do pagination
    console.info('🦀 ---------> filters pagination: ', pagination);
    if (pagination) {
        const { page, pageSize } = pagination;

        const form = (page - 1) * pageSize;
        const to = page * pageSize - 1;

        data = data.slice(form, to + 1);
    }
    console.info('🦀 ---------> Data sort finished: ', data);

    return {
        data,
        total,
    };
}

// Get Grid List
export const getList = (options: GridQueryOptions = {}) => {
    return (dispatch, getState) => {
        dispatch({
            type: SHOWLOADING,
            showLoading: true,
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                const data = filterData(options.keyword,
                    options.category,
                    options.pagination,
                    options.filters,
                    options.sorter);
                resolve(data);
            }, 100)
        }).then((data) => {
            dispatch({
                type: SHOWLOADING,
                showLoading: false,
            });
            dispatch({
                type: WAREHOUSE_LIST,
                data: Immutable.fromJS(data),
                keyword: options.keyword,
                selectedCategory: options.category,
            });
        })
    }
}

export const getUserInfo = () => {
    return (dispatch, getState) => {
        // 数据共享
        const state = getState();
        const { userInfo } = state;

        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch({
                    type: WAREHOUSE_CETUSERINFO,
                    data: userInfo,
                })
            }, 100)
        })
    }
}


// -------------------------------------
// Reducer
// -------------------------------------

// ------------------------------------
// Case reducer
// ------------------------------------

const warehouseList = (state, action) => {
    return Object.assign({}, state, {
        a: 'new-a',
    });
}

const warehouseUserInfo = (state, action) => {
    return Object.assign({}, state, {
        warehouseUserInfo: action.data,
    })
}

const ACTION_HANDLERS = {
    [WAREHOUSE_LIST]: warehouseList,
    [WAREHOUSE_CETUSERINFO]: warehouseUserInfo,
}

const mockWarehouseList = Mock.mock({
    'list|200': [{
        'key': '@increment()',
        // 往来单位编码
        'code': `仓库-@increment`,
        // 往来单位名称
        'name': '@csentence(3, 18)',
        // 分类
        'category': `@pick(${['2','3','4','6','7','8']})`,
        // 备注
        'comment': `@csentence(30,100)`,
        // 创建时间
        'createDate': `@date()`,
        // 是否停用
        'stop': `@boolean()`,
    }]
}).list;

const initialState = {
    a: 'a',
    warehouseUserInfo: [],
};

// Slice reducer
const warehouseReducer = createReducer(initialState, ACTION_HANDLERS);
export default warehouseReducer;
