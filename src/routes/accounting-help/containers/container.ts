/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';

import ViewComponent from '../components';
import { 
    ACCOUNTING_ROLE_FILTER_DATA, 
    ACCOUNTINT_CHANNELS, 
    ACCOUNTINT_SELECT_YEAR, 
    ACCOUNTINT_SELECT_ROLE, 
    ACCOUNTINT_SELECT_MENU
} from '../modules/modules';
import { FilterOptions } from '../../../components/filter/FilterItem';

// ---------------------------
// Actions
// ---------------------------
// 准则/制度 数据
const getRoleType = (accountingRoleTypes) => {
    const roleTypes = {
        label: '准则/制度',
        options: []
    };

    accountingRoleTypes.forEach((item, index) => {
        roleTypes.options.push(Object.assign({}, item));
    });
    
    return roleTypes;
}

// 年份 数据
const getRoleYears = (accountingRoleYears) => {
    const roleYears = {
        label: '执行年份',
        options: []
    };

    accountingRoleYears.forEach((item, index) => {
        roleYears.options.push(Object.assign({}, item));
    });

    return roleYears;
}

/**
 * 获取 会计制度 过滤条件数据
 * @param options
 */
const getFilterData = () => {
    return (dispatch, getState) => {
        // 数据共享
        const state = getState();
        const { globalInfo } = state;
        const { accountingRoleTypes, accountingRoleYears } = globalInfo;

        const roleTypes = getRoleType(accountingRoleTypes);

        // 年份
        const roleYears = getRoleYears(accountingRoleYears);

        dispatch({
            type: ACCOUNTING_ROLE_FILTER_DATA,
            data: {
                roleOptions: roleTypes,
                yearOptions: roleYears
            }
        });

        // // 选中 '制度'
        // dispatch({
        //     type: ACCOUNTINT_SELECT_ROLE,
        //     data: role
        // });

        // // 选中 '年份'
        // dispatch({
        //     type: ACCOUNTINT_SELECT_YEAR,
        //     data: year
        // });
    }
}

const getChannels = () => {
    return (dispatch, getState) => {
        const state = getState();
        const {globalInfo} = state;
        const {accountingChannels} = globalInfo;

        dispatch({
            type: ACCOUNTINT_CHANNELS,
            data: accountingChannels
        })
    }
}

const selectMenu = (selectedKey) => {
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNTINT_SELECT_MENU,
            data: selectedKey
        })
    }
}

/**
 * 修改当前选中的会计制度
 * @param value 
 */
const changeRoleType = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNTINT_SELECT_ROLE,
            data: value
        })
    }
}

const changeRoleYear = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: ACCOUNTINT_SELECT_YEAR,
            data: value
        })
    }
}

const mapActionCreators = (dispatch) => {
    return {
        action: {
            getFilterData: () => {
                dispatch(getFilterData());
            },
            getChannels: () => {
                dispatch(getChannels());
            },
            selectMenu: (selectedKey) => {
                dispatch(selectMenu(selectedKey));
            },
            changeRoleType: (key) => {
                dispatch(changeRoleType(key));
            },
            changeRoleYear: (key) => {
                dispatch(changeRoleYear(key));
            }
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.AccountingHelp,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
