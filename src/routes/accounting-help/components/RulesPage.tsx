/**
 * 准则页面
 */
import * as React from 'react';
import Rules, { IRule, ISPRuleDetail} from './Rules';
import { AccountingFilterOptions } from '../../../components/filter/index';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
import { autobind } from 'core-decorators';

interface RulesPageProps {
    roleTypes: Array<any>, // 会计制度的过滤数据
    action: {[key: string]: Function},
    role: IRule,                           // role data
    spRuleDetail: ISPRuleDetail,
}

@autobind
export default class RulesPage extends React.Component<RulesPageProps, any> {

    componentWillMount() {
        const { action, role } = this.props;
        
        // action.getRole(role.roleType, role.roleYear);
    }

    render() {
        const { roleTypes, action, role, spRuleDetail } = this.props;

        const filterData = this.packFilterData();

        return (
            <div>
                <Rules 
                    filterOptions = { filterData }
                    onChange = { this.onRulesChanged }
                    role = { role }
                    action = { action }
                    spRuleDetail = { spRuleDetail }
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

    packFilterData(): AccountingFilterOptions {
        const { roleTypes, role } = this.props;

        const roleOptions = {
            label: '准则/制度',
            options: []
        };

        const yearOptions = {
            label: '执行年份',
            options: []
        }

        roleTypes.forEach((item) => {
            roleOptions.options.push({
                label: item.name,
                value: item.code
            });

            if (role.roleType === item.code) {
                item.exeYears.forEach((year) => {
                    yearOptions.options.push({
                        label: year,
                        value: year
                    });
                });
            }
        })

        return {
            roleOptions,
            yearOptions
        }
    }
}

