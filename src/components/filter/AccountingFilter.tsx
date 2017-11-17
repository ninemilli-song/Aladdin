/**
 * 会计制度相关过滤条件组件
 */
import * as React from 'react';
import './style.scss';
import FilterItem, { FilterItemProps, FilterOptions } from './FilterItem';

export type AccountingFilterOptions = Array<FilterItemProps>

interface AccountingFilterProps {
    prefixCls?: string,
    options?: AccountingFilterOptions,
    onChange?: (item: FilterOptions) => void,
}

export default class AccountingFilter extends React.Component<AccountingFilterProps, any> {

    static defaultProps = {
        prefixCls: 'default'
    }

    render() {
        const {prefixCls} = this.props;

        return (
            <div className={`${prefixCls}-accounting-filter`}>
                {
                    this.renderFilters()
                }
            </div>
        )
    }

    renderFilters() {
        const { options } = this.props;

        const filters = [];

        options.forEach((item, index) => {
            filters.push(
                <FilterItem 
                    key={ `${index}` }
                    label={ item.label }
                    options={ item.options }
                    onChange={ this.onChange }
                />
            )
        });

        return filters;
    }

    onChange = (item) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(item);
        }
    }
}
