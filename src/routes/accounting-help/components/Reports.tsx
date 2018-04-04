/**
 * 财会 - 报表
 */
import * as React from 'react';
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import { AccountingFilterOptions, AccountingFilter } from '../../../components/filter/index';
import { FilterOptions } from '../../../components/filter/FilterItem';
import { IRule } from './Rules';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
import ReportItem, { ReportItemProps } from './ReportItem';
const BackTop = require('antd/lib/back-top');

interface ReportsProps extends MainSiderProps {
    filterOptions?: AccountingFilterOptions,
    data: Array<ReportItemProps>,
    action: {[key: string]: Function},
    role?: IRule,
}

export default class Reports extends MainSider<ReportsProps> {
    
    prefixCls = 'reports';

    constructor(props) {
        super(props);

        const { action, role } = props;
        const { roleType, roleYear } = role;

        if (roleType && roleYear) {
            // 获取账务报表数据
            action.getReportData(roleType, roleYear);
        }
    }

    protected renderMain()  {
        const { filterOptions, role } = this.props;
        const { roleOptions, yearOptions } = filterOptions;

        return (
            <div className={`${this.props}-body`}>
                <AccountingFilter 
                    roleOptions = { roleOptions }
                    yearOptions = { yearOptions }
                    onChange = { this.onChange }
                    role = { role.roleType }
                    year = { role.roleYear }
                />
                { this.renderText() }
                <BackTop>
                    <div className={`${this.prefixCls}-back-top`} title="返回到顶部">
                        <i className="iconfont icon-zhiding"></i>
                    </div>
                </BackTop>
            </div>
        )
    }

    private renderText() {
        const { data } = this.props;

        const elements = data.map((item, index) => {
            return (
                <ReportItem 
                    key = { `${this.prefixCls}-${index}-${item.id}` }
                    id = { item.id }
                    name = { item.name }
                    content = { item.content }
                />
            )
        });

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                {
                    elements
                }
            </div>
        )
    }

    private onChange(val, type) {
        const { action, role } = this.props;

        if (type === AccountingFilterTypeEnum.ROLE) {
            action.getRole(val.value, role.roleYear);
        } else if (AccountingFilterTypeEnum.YEAR) {
            action.getRole(role.roleType, val.value);
        }
    }
}
