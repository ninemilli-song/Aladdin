/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';

import ViewComponent from '../components';
import { ACCOUNTING_ROLE_FILTER_DATA } from '../modules/modules';

const getFilterData = () => {
    return (dispatch, getState) => {
        // 数据共享
        const state = getState();
        const { globalInfo } = state;
        const { accountingRoleTypes, accountingRoleYears } = globalInfo;

        const filterData = [];

        // 准则/制度
        const roleTypes = {
            label: '准则/制度',
            options: []
        };
        accountingRoleTypes.forEach((item, index) => {
            const checked = index === 0 ? true : false;
            roleTypes.options.push(Object.assign({}, item, {
                checked: checked
            }));
        });
        filterData.push(roleTypes);

        // 年份
        const roleYears = {
            label: '执行年份',
            options: []
        };
        accountingRoleYears.forEach((item, index) => {
            const checked = index === 0 ? true : false;
            roleYears.options.push(Object.assign({}, item, {
                checked: checked
            }));
        });
        filterData.push(roleYears);

        dispatch({
            type: ACCOUNTING_ROLE_FILTER_DATA,
            data: filterData
        });
    }
}

const mapActionCreators = (dispatch) => {
    return {
        action: {
            getFilterData: () => {
                dispatch(getFilterData());
            }
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.AccountingHelp,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
