/**
 * Header of the Warehouse Grid.
 */
import * as React from 'react';
import { Button, Input } from 'antd';
const Search = Input.Search;

interface GridOperatorProps {
    prefix?: string;
    expand?: boolean; // 主区域是否展开
    height?: number;
    marginSpace?: number;
}

export default class GridOperator extends React.Component<GridOperatorProps, any> {

    static defaultProps = {
        prefix: 'grid-bar',
        expand: false,
        height: 60,
    }

    render() {
        const { prefix, expand, height, marginSpace } = this.props;

        const expandIcon = expand ? 'double-right' : 'double-left';

        return (
            <div className={ prefix } style={{ height: height, marginBottom: marginSpace }}>
                <Button type="primary" icon={ expandIcon } />
                <div className={ prefix + '-searchbox' }>
                    <Search
                        placeholder="请输入仓库名称"
                        onChange={ this.onChange } />
                </div>

            </div>
        )
    }

    onChange() {

    }
}
