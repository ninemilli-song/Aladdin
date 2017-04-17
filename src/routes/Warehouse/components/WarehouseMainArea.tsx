/**
 * Main area of Warehouse
 */
import * as React from 'react';

import WarehouseGrid from './WarehouseGrid';
import WarehouseGridHeader from './WarehouseGridHeader';

interface WarehouseMainAreaProps {
    data: any,
    expand?: boolean, // 主区域是否展开
}

export default class WarehouseMainArea extends React.Component<WarehouseMainAreaProps, any> {

    static defaultProps = {
        prefix: 'warehouse-main',
        data: [],
        expand: false,
    }

    render(): JSX.Element {
        const { data, expand } = this.props;

        return (
            <div>
                <WarehouseGridHeader expand={ expand } />
                <WarehouseGrid data={ data } />
            </div>
        )
    }
}
