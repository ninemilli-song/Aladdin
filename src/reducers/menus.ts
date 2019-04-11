import { SET_SELECTED_MENU_ID } from '../actions/menus';

const initState = {
    menus: [
        {
            id: '1',
            label: '概况',
            key: 'rules',
            path: '/dashboard',
            icon: 'mail'
        },
        {
            id: '2',
            label: '店鋪',
            key: 'subjects',
            icon: 'appstore'
        },
        {
            id: '3',
            label: '商品',
            key: 'products',
            path: '/product-list',
            icon: 'pay-circle',
            sub: [{
                id: '3-1',
                label: '商品目录',
                key: 'product-list',
                path: '/product-list',
                icon: '',
                parent: '3'
            },
            {
                id: '3-2',
                label: '新增商品',
                key: 'product-edit',
                path: '/product-edit',
                icon: '',
                parent: '3'
            },
            {
                id: '3-3',
                label: '商品分类',
                key: 'product-category',
                path: '/product-category',
                icon: '',
                parent: '3'
            }]
        },
        {
            id: '4',
            label: '订单',
            key: 'indus',
            icon: 'switcher',
        },
        {
            id: '5',
            label: '客户',
            key: 'analysis',
            icon: 'tool',
        },
        {
            id: '6',
            label: '数据',
            key: 'entries',
            icon: 'team',
        },
        {
            id: '7',
            label: '资产',
            key: 'practice',
            icon: 'team',
        }
    ],
    // subMenus: [
    //     {
    //         id: '3-1',
    //         label: '商品目录',
    //         key: 'product-list',
    //         path: '/product-list',
    //         icon: '',
    //         parent: '3'
    //     },
    //     {
    //         id: '3-2',
    //         label: '新增商品',
    //         key: 'product-edit',
    //         path: '/product-edit',
    //         icon: '',
    //         parent: '3'
    //     },
    //     {
    //         id: '3-3',
    //         label: '商品分类',
    //         key: 'product-category',
    //         path: '/product-category',
    //         icon: '',
    //         parent: '3'
    //     }
    // ],
    selectedMenuId: ''
}

const setSelectedMenuId = (state, action) => {
    return Object.assign({}, state, {
        selectedMenuId: action.payload
    })
}

const ACTION_HANDLERS = {
    [SET_SELECTED_MENU_ID]: setSelectedMenuId
}

export default function menusReducer(state = initState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
