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
import { roleTypeSelected } from './model';
const BackTop = require('antd/lib/back-top');

interface ReportsProps extends MainSiderProps {
    filterOptions?: AccountingFilterOptions,
    data: Array<ReportItemProps>,
    action: {[key: string]: Function},
    roleTypeSelected: roleTypeSelected,
}

export default class Reports extends MainSider<ReportsProps> {
    
    prefixCls = 'reports';

    constructor(props) {
        super(props);

        const { action, roleTypeSelected } = props;
        const { roleType, roleYear } = roleTypeSelected;

        if (roleType && roleYear) {
            // 获取账务报表数据
            action.getReportData(roleType, roleYear);
        }
    }

    protected renderMain()  {
        const { filterOptions, roleTypeSelected} = this.props;
        const { roleOptions, yearOptions } = filterOptions;

        return (
            <div className={`${this.props}-body`}>
                <AccountingFilter 
                    roleOptions = { roleOptions }
                    yearOptions = { yearOptions }
                    onChange = { this.onChange }
                    role = { roleTypeSelected.roleType }
                    year = { roleTypeSelected.roleYear }
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

    onChange = (val) => {
        const { action } = this.props;

        // 选择会计准则/制度 和 年份
        action.selectRoleType(val.role, val.year);

        // 查询报表数据
        action.getReportData(val.role, val.year)
    }
}
