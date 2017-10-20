import * as React from 'react';
import { SecondaryNav } from '../../../components/page-components';
import Rules from './Rules';
const Row = require('antd/lib/grid/row');
const Col = require('antd/lib/grid/col');

export interface HomeProps  {
    store: any;
    action: {[key: string]: Function};
}

class Home extends React.Component<HomeProps, any> {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { action } = this.props;
    }

    render() {
        const { store } = this.props;
        const { quanziData, wendaData } = store;
        const prefixCls = 'home';

        const contentComponent = this.getContent();

        return (
            <div className={prefixCls}>
                <SecondaryNav 
                    menuConfig = {this.menuConfig()}
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
        return (
            <Rules />
        )
    }

    /**
     * 菜单配置
     */
    menuConfig() {
        return [
            {
                label: '准则',
                key: 'rules',
                icon: 'mail'
            },
            {
                label: '科目',
                key: 'subjects',
                icon: 'appstore'
            },
            {
                label: '报表',
                key: 'reports',
                icon: 'pay-circle'
            },
            {
                label: '行业',
                key: 'indus',
                icon: 'switcher'
            },
            {
                label: '解读',
                key: 'analysis',
                icon: 'tool'
            },
            {
                label: '分录',
                key: 'entries',
                icon: 'team'
            },
            {
                label: '实务',
                key: 'practice',
                icon: 'team'
            }
        ]
    }
}

export default Home;
