/**
 * Main area of Warehouse
 */
import * as React from 'react';

import WarehouseGrid from './WarehouseGrid';
import WarehouseGridHeader from './WarehouseGridHeader';

const headerHeight = 30;

const marginSpace = 10;

interface WarehouseMainAreaProps {
    data: any;
    expand?: boolean; // 主区域是否展开
    width?: number;
    height?: number;
}

export default class WarehouseMainArea extends React.Component<WarehouseMainAreaProps, any> {

    static defaultProps = {
        prefix: 'warehouse-main',
        data: [],
        expand: false,
    }

    render(): JSX.Element {
        const { data, expand, width, height } = this.props;

        return (
            <div>
                <WarehouseGridHeader
                    expand={ expand }
                    height={ headerHeight }
                    marginSpace={ marginSpace }
                />
                <WarehouseGrid
                    data={ data }
                    width={ width }
                    height={ height - headerHeight - marginSpace }
                />
            </div>
        )
    }
}
