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

    filterOptions = [];

    title = '财会';

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.filterOptions = this.getFilterOptions();
    }

    render() {
        const { store } = this.props;
        const prefixCls = 'accounting-help-home';

        const contentComponent = this.getContent();

        return (
            <div className={prefixCls}>
                <SecondaryNav 
                    title = {this.title}
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
        const { store } = this.props;
        const { filterData } = store;
        console.log('accounting help home view >>>>> ', filterData);
        return (
            <div>
                <Rules 
                    filterOptions = { filterData }
                />
                <div className="content">

                </div>
            </div>
        )
    }

    getFilterOptions() {
        const { action } = this.props;

        return action.getFilterData();

        // return [
        //     {
        //         label: '准则/制度',
        //         options: [
        //             {
        //                 label: '企业会计准则',
        //                 value: 'option1',
        //                 checked: true,
        //             },
        //             {
        //                 label: '小企业会计准则',
        //                 value: 'option2',
        //                 checked: false,
        //             },
        //             {
        //                 label: '民间非营利组织会计制度',
        //                 value: 'option3',
        //                 checked: false,
        //             },
        //             {
        //                 label: '事业单位会计制度',
        //                 value: 'option4',
        //                 checked: false,
        //             },
        //             {
        //                 label: '医院会计制度',
        //                 value: 'option5',
        //                 checked: false,
        //             }
        //         ]
        //     },
        //     {
        //         label: '执行年份',
        //         options: [
        //             {
        //                 label: '2006',
        //                 value: '2006',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2007',
        //                 value: '2007',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2008',
        //                 value: '2008',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2009',
        //                 value: '2009',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2010',
        //                 value: '2010',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2011',
        //                 value: '2011',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2012',
        //                 value: '2012',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2013',
        //                 value: '2013',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2014',
        //                 value: '2014',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2015',
        //                 value: '2015',
        //                 checked: false,
        //             },
        //             {
        //                 label: '2016',
        //                 value: '2016',
        //                 checked: true,
        //             },
        //         ]
        //     }
        // ]
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
