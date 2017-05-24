/**
 * Main area of Warehouse
 */
import * as React from 'react';

import Grid from './Grid';
import GridOperator from './GridOperator';

import { GridQueryOptions } from '../../common/globalInterface';

const headerHeight = 30;

const marginSpace = 10;

interface GridMainProps {
    data: any;
    expand?: boolean; // 主区域是否展开
    width?: number;
    height?: number;
    onPageChange?: (options: GridQueryOptions) => void;
}

export default class GridMain extends React.Component<GridMainProps, any> {

    static defaultProps = {
        prefix: 'grid-main',
        data: [],
        expand: false,
    }

    render(): JSX.Element {
        const { data, expand, width, height, onPageChange } = this.props;

        return (
            <div>
                <GridOperator
                    expand={ expand }
                    height={ headerHeight }
                    marginSpace={ marginSpace }
                />
                <Grid
                    data={ data }
                    width={ width }
                    height={ height - headerHeight - marginSpace }
                    onPageChange={ onPageChange }
                />
            </div>
        )
    }
}
