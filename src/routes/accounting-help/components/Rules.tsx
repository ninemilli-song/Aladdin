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
    onChange?: (value: FilterOptions) => void;
}

@autobind
export default class Rules extends MainSider<RulesProps> {

    protected renderMain()  {
        const { filterOptions } = this.props;

        return (
            <div className="content">
                <AccountingFilter 
                    options = {filterOptions}
                    onChange = {this.onChange}
                />
            </div>
        )
    }

    protected renderSider() {
        return (
            <div>Sider</div>
        )
    }

    private onChange(value) {
        const {onChange} = this.props;

        if (onChange) {
            onChange(value);
        }
    }
}
