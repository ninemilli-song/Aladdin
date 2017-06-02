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
    pageSize?: number;
    onPageChange?: (options: GridQueryOptions) => void;
    onSearch?: (keyword) => void;
    keyword?: string;
}

export default class GridMain extends React.Component<GridMainProps, any> {

    static defaultProps = {
        prefix: 'grid-main',
        data: [],
        expand: false,
        onSearch: () => {},
        keyword: '',
    }

    render(): JSX.Element {
        const { data, expand, width, height, onPageChange, pageSize, onSearch, keyword } = this.props;

        return (
            <div>
                <GridOperator
                    expand={ expand }
                    height={ headerHeight }
                    marginSpace={ marginSpace }
                    onSearch = { onSearch }
                    keyword = { keyword }
                />
                <Grid
                    data={ data }
                    width={ width }
                    height={ height - headerHeight - marginSpace }
                    onPageChange={ onPageChange }
                    pageSize = { pageSize }
                />
            </div>
        )
    }
}
