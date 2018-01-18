import * as React from 'react';
import { SecondaryNav } from '../../../components/page-components';
import Rules from './Rules';
import { autobind } from 'core-decorators';
import { AccountingFilterOptions } from '../../../components/filter/index';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
import RulesPage from './RulesPage';
const Row = require('antd/lib/grid/row');
const Col = require('antd/lib/grid/col');
import '../assets/style.scss';

interface StoreType {
    filterData: AccountingFilterOptions,    // 会计制度的过滤数据
    channels: Array<any>,                   // 频道配置数据
    selectedMenu: string,                   // The selected menus key
    selectedRole: string,                   // 选中的“制度/准则”
    selectedYear: string,                   // 选中的“执行年份” 
    selectedRoleContent: string,            // 选中准则的文本
    role: any,                              // 准则数据
    roleTypes: any                          // 制度数据
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
        const { channels, selectedMenu } = store;
        const prefixCls = 'accounting-help-home';

        const contentComponent = this.getContent();

        return (
            <div className={prefixCls}>
                <SecondaryNav 
                    title = {this.title}
                    menuConfig = { channels }
                    selected = { selectedMenu }
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
        const { store, action } = this.props;
        const { selectedRole, selectedYear, selectedMenu, selectedRoleContent, role, roleTypes } = store;

        let component = null;
        switch (selectedMenu) {
            case 'rules':
                component = (
                    <RulesPage 
                        roleTypes = { roleTypes }
                        role = { role }
                        action = { action }
                    />
                );
                break;
        }

        return (
            component
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
}

export default Home;
