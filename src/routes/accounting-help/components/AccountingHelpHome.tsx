import * as React from 'react';
import { SecondaryNav } from '../../../components/page-components';
import Rules from './Rules';
import { autobind } from 'core-decorators';
import { AccountingFilterOptions } from '../../../components/filter/index';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
const Row = require('antd/lib/grid/row');
const Col = require('antd/lib/grid/col');

interface StoreType {
    filterData: AccountingFilterOptions, // 会计制度的过滤数据
    channels: Array<any>,   // 频道配置数据
    selectedRole: string, // 选中的“制度/准则”
    selectedYear: string, // 选中的“执行年份”
}

export interface HomeProps  {
    store: StoreType;
    action: {[key: string]: Function};
}

@autobind
class Home extends React.Component<HomeProps, any> {

    title = '财会';

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        // Get Filter Data
        this.getFilterOptions();
        // Get Channels Data
        this.getChannels();
    }

    render() {
        const { store } = this.props;
        const { channels } = store;
        const prefixCls = 'accounting-help-home';

        const contentComponent = this.getContent();

        return (
            <div className={prefixCls}>
                <SecondaryNav 
                    title = {this.title}
                    menuConfig = { channels }
                    onClick = { this.onMenuSelected }
                />
                <div className="layout-content">
                    {
                        contentComponent
                    }
                </div>
            </div>
        )
    }

    getContent() {
        const { store } = this.props;
        const { filterData, selectedRole, selectedYear } = store;
        console.log('accounting help home view >>>>> ', filterData);
        return (
            <div>
                <Rules 
                    filterOptions = { filterData }
                    onChange = { this.onRulesChanged }
                    role = { selectedRole }
                    year = { selectedYear }
                />
                <div className="content">

                </div>
            </div>
        )
    }

    getChannels() {
        const { action } = this.props;

        action.getChannels();
    }

    getFilterOptions() {
        const { action } = this.props;

        action.getFilterData();
    }

    onMenuSelected(item) {
        console.log('onMenuSelected >>>>>>>>>> ', item);
        const { action } = this.props;

        action.selectMenu(item.key);
    }
    
    onRulesChanged(val, type) {
        const { action } = this.props;

        if (type === AccountingFilterTypeEnum.ROLE) {
            action.changeRoleType(val.value);
        } else if (AccountingFilterTypeEnum.YEAR) {
            action.changeRoleYear(val.value);
        }
    }
}

export default Home;
