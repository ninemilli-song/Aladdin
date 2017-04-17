/**
 * Define reducer and action of Warehouse
 */
import * as Immutable from 'immutable';
const Mock = require('mockjs');

// ------------------------------------
// Constants
// ------------------------------------
export const WAREHOUSE_LIST = 'WAREHOUSE_LIST';
export const WAREHOUSE_CATEGORY = 'WAREHOUSE_CATEGORY';

// ------------------------------------
// Action
// ------------------------------------
export const getList = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch({
                    type: WAREHOUSE_LIST,
                    data: mockWarehouseList,
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
        // return Object.assign({}, state, {
        //     data: {
        //         warehouseList: action.data,
        //     }
        // })
        return state.set('data', Immutable.fromJS({
            warehouseList: action.data,
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
        warehouseList: [],
        category: [],
    },
});

export default function warehouseReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
