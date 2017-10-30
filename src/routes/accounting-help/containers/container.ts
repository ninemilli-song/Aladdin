/**
 * Wrap view component with state and action.
 */
import { connect } from 'react-redux';

import ViewComponent from '../components';
import { ACCOUNTING_ROLE_FILTER_DATA, ACCOUNTINT_CHANNELS } from '../modules/modules';

// ---------------------------
// Actions
// ---------------------------
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
        const state = getState();
        const {globalInfo} = state;
        const {accountingChannels} = globalInfo;

        accountingChannels.forEach(item => {
            if (item.key === selectedKey) {
                item.selected = true;
            } else {
                item.selected = false;
            }
        });

        console.log('selectMenu >>>>>>>>>>> ', selectedKey);
        console.log('selectMenu >>>>>>>>>>> ', accountingChannels);

        dispatch({
            type: ACCOUNTINT_CHANNELS,
            data: accountingChannels
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
            }
        },
    }
}

const mapStateToProps = (state) => ({
    store: state.AccountingHelp,
})

export default connect(mapStateToProps, mapActionCreators)(ViewComponent);
