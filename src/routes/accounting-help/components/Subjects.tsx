/**
 * 财会 - 科目
 */
import * as React from 'react';
import MainSider from '../../../components/page-frame/MainSider';
import { AccountingFilterOptions, AccountingFilter } from '../../../components/filter/index';
import { FilterOptions } from '../../../components/filter/FilterItem';
import { IRule } from './Rules';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
const BackTop = require('antd/lib/back-top');

interface SubjectsProps {
    filterOptions?: AccountingFilterOptions,
    role?: IRule,      // 当前会计数据
    action: {[key: string]: Function},
}

export default class Subjects extends MainSider<any> {
    
    prefixCls = 'subjects';

    constructor(props) {
        super(props);
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
        return (
            <div>
                Hello subjects!
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
