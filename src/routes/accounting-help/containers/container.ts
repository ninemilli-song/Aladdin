/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';

import ViewComponent from '../components';
import { 
    ACCOUNTING_ROLE_FILTER_DATA, 
    ACCOUNTINT_CHANNELS,  
    ACCOUNTINT_SELECT_MENU,
    ACCOUNTINT_ROLE_CHANGED
} from '../modules/modules';
import { FilterOptions } from '../../../components/filter/FilterItem';
import request from '../../../utils/fetch';

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

        return request.get('api/getRolesFilters').then((result) => {
            if (result.success) {
                const data = result.success.data;

                // 分类
                const roleTypes = getRoleType(data.types);
        
                // 年份
                const roleYears = getRoleYears(data.years);

                dispatch({
                    type: ACCOUNTING_ROLE_FILTER_DATA,
                    data: {
                        roleOptions: roleTypes,
                        yearOptions: roleYears
                    }
                });
            }
        });
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
 * @param type  会计制度类型
 * @param year  会计制度年份
 */
const getRole = (type, year) => {
    return (dispatch, getState) => {
        return request.get(`api/getRole?type=${type}&year=${year}`).then((result) => {
            const roleType = result.success ? result.success.data.type : type;
            const roleYear = result.success ? result.success.data.year : year;
            const roleText = result.success ? result.success.data.content : '';

            const role = Object.assign({}, {
                roleType,
                roleYear,
                roleText,
            });
            
            dispatch({
                type: ACCOUNTINT_ROLE_CHANGED,
                data: role
            });
        });
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
            getRole: (type, year) => {
                dispatch(getRole(type, year));
            }
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.AccountingHelp,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
