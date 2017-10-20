/**
 * 会计准则
 */
import * as React from 'react';
import MainSider from '../../../components/page-frame/MainSider';
import { AccountingFilter, AccountingFilterOptions } from '../../../components/filter';

interface RulesProps {
    prefixCls?: string,
    filterOptions?: AccountingFilterOptions
}

export default class Rules extends React.Component<RulesProps, any> {

    static defaultProps = {
        prefixCls: 'default',
        filterOptions: [
            {
                label: '列1',
                options: [
                    {
                        label: '选项1',
                        value: 'option1'
                    },
                    {
                        label: '选项2',
                        value: 'option2'
                    }
                ]
            }
        ]
    }

    render() {
        const { prefixCls } = this.props;

        return (
            <div className={`${prefixCls}-rules`}>
                <MainSider 
                    renderMain={this.renderMain}
                    renderSider={this.renderSider}
                />
            </div>
        )
    }

    private renderMain = () => {
        const { filterOptions } = this.props;

        return (
            <div>
                <AccountingFilter 
                    options = {filterOptions}
                />
            </div>
        )
    }

    private renderSider = () => {
        return (
            <div>Sider</div>
        )
    }
}
