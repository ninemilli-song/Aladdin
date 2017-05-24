/**
 * Define reducer and action of Warehouse
 */
import * as Immutable from 'immutable';
const Mock = require('mockjs');
import { GridQueryOptions, paginationOptions, filterOptions, sorterOptions } from '../../../common/globalInterface';

// ------------------------------------
// Constants
// ------------------------------------
export const WAREHOUSE_LIST = 'WAREHOUSE_LIST';
export const WAREHOUSE_CATEGORY = 'WAREHOUSE_CATEGORY';

// ------------------------------------
// Action
// ------------------------------------
function filterData(
    keyword: string = '',
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
        total: mockWarehouseList.length,
    };
}

// Get Grid List
export const getList = (options: GridQueryOptions = {}) => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = filterData(options.keyword, options.pagination, options.filters, options.sorter);
                dispatch({
                    type: WAREHOUSE_LIST,
                    data,
                })
            }, 200)
        })
    }
}

export const getCategory = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch({
                    type: WAREHOUSE_CATEGORY,
                    data: mockWarehouseCategory,
                })
            }, 200)
        })
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [WAREHOUSE_LIST]: (state, action) => {
        return state.set('data', Immutable.fromJS({
            list: action.data,
        }));
    },

    [WAREHOUSE_CATEGORY]: (state, action) => {
        const data = state.get('data');

        // if (!action.data) {
            console.log('------> category action data is undefined!');
        // }

        return state.set('data', data.set('category', action.data));
    }
}

// -------------------------------------
// Reducer
// -------------------------------------

const mockWarehouseList = Mock.mock({
    'list|200': [{
        'key': '@increment()',
        // 往来单位编码
        'code': `仓库-@increment`,
        // 往来单位名称
        'name': '@csentence(3, 18)',
        // 分类
        'category': `@pick(${[2,3,4,6,7,8]})`,
        // 备注
        'comment': `@csentence(30,100)`,
        // 创建时间
        'createDate': `@date()`,
        // 是否停用
        'stop': `@boolean()`,
    }]
}).list;

const mockWarehouseCategory = [
    {
        parentId: '0',
        id: '1',
        name: 'a',
    },
    {
        parentId: '0',
        id: '2',
        name: 'b',
    },
    {
        parentId: '0',
        id: '3',
        name: 'c',
    },
    {
        parentId: '1',
        id: '4',
        name: 'aa',
    },
    {
        parentId: '2',
        id: '5',
        name: 'ba',
    },
    {
        parentId: '1',
        id: '6',
        name: 'ab',
    },
];

const initialState = Immutable.fromJS({
    ui: {
        gridExpand: false,
    },
    data: {
        list: [],
        category: [],
    },
});

export default function warehouseReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
