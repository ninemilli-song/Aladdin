/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';

import ViewComponent from '../components';
import { 
    ACCOUNTING_ROLE_FILTER_DATA, 
    ACCOUNTINT_CHANNELS,  
    ACCOUNTINT_SELECT_MENU,
    ACCOUNTINT_ROLE_CHANGED,
    ACCOUNTING_ROLE_TYPES,
    ACCOUNTING_ROLE_SP_DETAIL,
    ACCOUNTING_SUBJECT_CATEGORY,
    ACCOUNTING_SUBJECT_DATA,
    ACCOUNTING_REPORT_DATA
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

                // 添加规则类型数据
                dispatch({
                    type: ACCOUNTING_ROLE_TYPES,
                    data: data,
                });

                // 获取准则内容
                if (data && data.length > 0) {
                    dispatch(getRole(data[0].code, data[0].exeYears[0]));
                }
            }
        });
    }
}

/**
 * 科目 - 获取会计科目分类
 */
const getSubjectCategory = (roleType, roleYear) => {
    return (dispatch, getState) => {
        return request.get(`api/getSubjectCategory?type=${roleType}&year=${roleYear}`).then((result) => {
            if (result.success) {
                const data = result.success.data;

                // 将科目分类添加到store中
                dispatch({
                    type: ACCOUNTING_SUBJECT_CATEGORY,
                    data: data,
                });
            }
        });
    }
}

/**
 * 科目 - 根据准则和年份获取会计数据
 * @param roleType 
 * @param roleYear 
 */
const getSubjectsData = (roleType, roleYear) => {
    return (dispatch, getState) => {
        return request.get(`api/getSubjectsData?type=${roleType}&year=${roleYear}`).then((result) => {
            if (result.success) {
                const data = result.success.data;

                // 将科目数据添加到store中
                dispatch({
                    type: ACCOUNTING_SUBJECT_DATA,
                    data: data
                });
            }
        });
    }
}

/**
 * 根据准则和年份获取账务报表数据
 * @param roleType 
 * @param roleYear 
 */
const getReportData = (roleType, roleYear) => {
    return (dispatch, getState) => {
        return request.get(`api/getReportData?type=${roleType}&year=${roleYear}`).then((result) => {
            if (result.success) {
                const data = result.success.data;

                // 将科目数据添加到store中
                dispatch({
                    type: ACCOUNTING_REPORT_DATA,
                    data: data
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
        return request.get(`api/getRule?type=${type}&year=${year}`).then((result) => {
            const roleType = type;
            const roleYear = year;
            const roleGPData = result.success ? 
                (result.success.data.gpRule ? result.success.data.gpRule.generalPrinciple : '') 
                : '';
            const roleSPData = result.success ? result.success.data.spRule : {};

            const role = Object.assign({}, {
                roleType,
                roleYear,
                roleGPData,
                roleSPData
            });
            
            dispatch({
                type: ACCOUNTINT_ROLE_CHANGED,
                data: role
            });
        });
    }
}

/**
 * 查询具体准则详情
 * @param spID 
 */
const getSPRuleDetail = (spID) => {
    return (dispatch, getState) => {
        return request.get(`api/getSPRuleDetail`, { spID }).then((result) => {
            if (result.success) {
                const data = result.success.data;
                const { title, specifics } = data;

                dispatch({
                    type: ACCOUNTING_ROLE_SP_DETAIL,
                    data: {
                        title,
                        content: specifics
                    }
                });
            }
        }).catch(() => {

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
            },
            getSPRuleDetail: (ruleId) => {
                dispatch(getSPRuleDetail(ruleId));
            },
            getSubjectCategory: (roleType, roleYear) => {
                dispatch(getSubjectCategory(roleType, roleYear));
            },
            getSubjectsData: (roleType, roleYear) => {
                dispatch(getSubjectsData(roleType, roleYear));
            },
            getReportData: (roleType, roleYear) => {
                dispatch(getReportData(roleType, roleYear));
            }
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.AccountingHelp,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
