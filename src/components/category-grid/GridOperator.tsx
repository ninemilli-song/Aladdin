/**
 * Header of the Warehouse Grid.
 */
import * as React from 'react';
import { Button, Input, Tag } from 'antd';
const Search = Input.Search;

interface GridOperatorProps {
    prefix?: string;
    height?: number;
    marginSpace?: number;
    onSearch?: (keyword: string) => void;
    keyword?: string;
}

export default class GridOperator extends React.Component<GridOperatorProps, any> {

    static defaultProps = {
        prefix: 'grid-bar',
        height: 60,
        onSearch: () => {},
        keyword: '',
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { prefix, height, marginSpace, keyword } = this.props;

        return (
            <div className={ prefix } style={{ height: height, marginBottom: marginSpace }}>
                <div className={ prefix + '-searchbox' }>
                    <Search
                        placeholder="请输入仓库名称"
                        onSearch={ this.onSearch }
                    />
                </div>
                <div className={ `${prefix}-search-kw` }>
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
