/**
 * The Category of Warehouse
 */
import * as React from 'react';

import WarehouseCategoryTree from './WarehouseCategoryTree';
import Category from '../../../components/tree/Category';

interface WarehouseCategoryProps {
    category: Array<any>;
}

export default class WarehouseCategory extends React.Component<WarehouseCategoryProps, any> {
    render(): JSX.Element {
        const { category } = this.props;

        return (
            <div>
                <Category data={ category } />
            </div>
        )
    }
}
