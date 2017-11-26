/**
 * 准则页面
 */
import * as React from 'react';
import Rules from './Rules';
import { AccountingFilterOptions } from '../../../components/filter/index';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
import { autobind } from 'core-decorators';

interface RulesPageProps {
    filterData: AccountingFilterOptions, // 会计制度的过滤数据
    selectedRole: string,                // 选中的“制度/准则”
    selectedYear: string,                // 选中的“执行年份” 
    action: {[key: string]: Function};
}

@autobind
export default class RulesPage extends React.Component<RulesPageProps, any> {
    render() {
        const { filterData, selectedRole, selectedYear } = this.props;

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

    onRulesChanged(val, type) {
        const { action } = this.props;

        if (type === AccountingFilterTypeEnum.ROLE) {
            action.changeRoleType(val.value);
        } else if (AccountingFilterTypeEnum.YEAR) {
            action.changeRoleYear(val.value);
        }
    }
}

