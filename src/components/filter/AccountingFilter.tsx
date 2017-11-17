/**
 * 会计制度相关过滤条件组件
 */
import * as React from 'react';
import './style.scss';
import FilterItem, { FilterItemProps, FilterOptions } from './FilterItem';
import { autobind } from 'core-decorators';

export type AccountingFilterOptions = {
    roleOptions: FilterItemProps;
    yearOptions: FilterItemProps;
}

/**
 * 会计准则 过滤条件类型
 */ 
export const AccountingFilterTypeEnum = {
    ROLE: 'role',
    YEAR: 'year'
}

interface AccountingFilterProps {
    prefixCls?: string,
    onChange?: (item: FilterOptions, type: string) => void,
    roleOptions: FilterItemProps;
    yearOptions: FilterItemProps;
    role?: string,  // 选中的会计制度
    year?: string,  // 选中的年份
}

@autobind
export default class AccountingFilter extends React.Component<AccountingFilterProps, any> {

    static defaultProps = {
        prefixCls: 'default'
    }

    render() {
        const {prefixCls} = this.props;

        return (
            <div className={`${prefixCls}-accounting-filter`}>
                {
                    this.renderRoles()
                }
                {
                    this.renderYears()
                }
            </div>
        )
    }

    /**
     * 渲染制度
     */
    renderRoles() {
        const { roleOptions, role } = this.props;

        const filters = [];

        return (
            <FilterItem 
                { ...roleOptions }
                selectedValue = { role }
                onChange={ this.onRoleChange }
            />
        )
    }

    // 渲染年份
    renderYears() {
        const { yearOptions, year } = this.props;
        
        const filters = [];

        return (
            <FilterItem 
                { ...yearOptions }
                selectedValue = { year }
                onChange={ this.onYearChange }
            />
        )
    }

    onRoleChange (item) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(item, AccountingFilterTypeEnum.ROLE);
        }
    }

    onYearChange (item) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(item, AccountingFilterTypeEnum.YEAR);
        }
    }
}
