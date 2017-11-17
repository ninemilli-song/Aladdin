/**
 * 会计准则
 */
import * as React from 'react';
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import { AccountingFilter, AccountingFilterOptions } from '../../../components/filter';
import { autobind } from 'core-decorators';
import { FilterOptions } from '../../../components/filter/FilterItem';

interface RulesProps extends MainSiderProps {
    prefixCls?: string,
    filterOptions?: AccountingFilterOptions,
    onChange?: (value: FilterOptions, type: string) => void,
    role?: string,  // 选中的会计制度
    year?: string,  // 选中的年份
}

@autobind
export default class Rules extends MainSider<RulesProps> {

    protected renderMain()  {
        const { filterOptions, role, year } = this.props;
        const { roleOptions, yearOptions } = filterOptions;

        return (
            <div className="content">
                <AccountingFilter 
                    roleOptions = { roleOptions }
                    yearOptions = { yearOptions }
                    onChange = {this.onChange}
                    role = { role }
                    year = { year }
                />
            </div>
        )
    }

    protected renderSider() {
        return (
            <div>Sider</div>
        )
    }

    private onChange(value, type) {
        const {onChange} = this.props;

        if (onChange) {
            onChange(value, type);
        }
    }
}
