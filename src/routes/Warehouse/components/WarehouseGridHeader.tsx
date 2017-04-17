/**
 * Header of the Warehouse Grid.
 */
import * as React from 'react';
import { Button } from 'antd';

interface WarehouseGridHeaderProps {
    prefix?: string;
    expand?: boolean; // 主区域是否展开
}

export default class WarehouseGridHeader extends React.Component<WarehouseGridHeaderProps, any> {

    static defaultProps = {
        prefix: 'warehouse-grid-header',
        expand: false,
    }

    render() {
        const { prefix, expand } = this.props;

        const expandIcon = expand ? 'double-right' : 'double-left';

        return (
            <div className={ prefix }>
                <Button type="primary" icon={ expandIcon } />
            </div>
        )
    }
}
