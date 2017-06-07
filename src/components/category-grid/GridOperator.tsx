/**
 * Header of the Warehouse Grid.
 */
import * as React from 'react';
import * as classNames from 'classnames';
import { Button, Input, Tag } from 'antd';
import Tree from '../refer/Tree';
const Search = Input.Search;

interface GridOperatorProps {
    name?: string;
    prefix?: string;
    height?: number;
    marginSpace?: number;
    onSearch?: (keyword: string) => void;
    keyword?: string;
    categoryData?: any,
    selectedCategory?: string | string[],
    onCategorySelected?: (categorys: string[]) => void;
}

export default class GridOperator extends React.Component<GridOperatorProps, any> {

    static defaultProps = {
        name: 'noname',
        prefix: 'grid-bar',
        height: 60,
        onSearch: () => {},
        keyword: '',
        categoryData: null,
        selectedCategory: [],
        onCategorySelected: () => {},
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { prefix, height, marginSpace, keyword, categoryData,
            onCategorySelected, selectedCategory, name } = this.props;

        return (
            <div className={ prefix } style={{ height: height, marginBottom: marginSpace }}>
                <div className={ classNames([`${prefix}-add`, 'inline-block']) }>
                    <Button type="primary" icon="plus">{`新增${name}`}</Button>
                </div>
                <div className={ prefix + '-search' }>
                    <span>商品：</span>
                    <div className={ classNames([`${prefix}-search-input`, 'inline-block']) }>
                        <Search
                            placeholder={`按${name}名称检索`}
                            onSearch={ this.onSearch }
                        />
                    </div>
                </div>
                <div className={ classNames([prefix + '-category'], 'inline-block') }>
                    <span>分类：</span>
                    <Tree
                       data = { categoryData }
                       values = { selectedCategory }
                       onChange = { onCategorySelected }
                    />
                </div>
                <div className={ classNames([`${prefix}-search-kw`], 'inline-block') }>
                    {
                        keyword ? (
                            <Tag
                                closable
                                afterClose={ this.cancelKeyword }>
                                { keyword }
                            </Tag>
                        ) : null
                    }
                </div>
                <div className={ classNames('inline-block', 'pos-right') }>
                    <Button icon="delete">{`批量删除${name}`}</Button>
                </div>
            </div>
        )
    }

    private onSearch = (value) => {
        const { onSearch } = this.props;

        onSearch(value);

        this.setState({
            keyword: value,
        });
    }

    private cancelKeyword = () => {
        this.onSearch('');
    }
}
