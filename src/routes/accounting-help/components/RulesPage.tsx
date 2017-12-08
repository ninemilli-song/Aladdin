/**
 * 准则页面
 */
import * as React from 'react';
import Rules, { IRule } from './Rules';
import { AccountingFilterOptions } from '../../../components/filter/index';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
import { autobind } from 'core-decorators';

interface RulesPageProps {
    filterData: AccountingFilterOptions, // 会计制度的过滤数据
    action: {[key: string]: Function},
    role: IRule,                           // role data
}

@autobind
export default class RulesPage extends React.Component<RulesPageProps, any> {

    componentWillMount() {
        const { action, role } = this.props;
        
        action.getRole(role.roleType, role.roleYear);
    }

    render() {
        const { filterData, action, role } = this.props;

        return (
            <div>
                <Rules 
                    filterOptions = { filterData }
                    onChange = { this.onRulesChanged }
                    role = { role }
                    action = { action }
                />
            </div>
        )
    }

    onRulesChanged(val, type) {
        const { action, role } = this.props;

        if (type === AccountingFilterTypeEnum.ROLE) {
            action.getRole(val.value, role.roleYear);
        } else if (AccountingFilterTypeEnum.YEAR) {
            action.getRole(role.roleType, val.value);
        }
    }
}

