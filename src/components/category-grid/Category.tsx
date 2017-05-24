/**
 * The Category of Warehouse
 */
import * as React from 'react';

import Category from '../tree/Category';

interface WarehouseCategoryProps {
    category: Array<any>;
    height?: number;
}

export default class WarehouseCategory extends React.Component<WarehouseCategoryProps, any> {
    render(): JSX.Element {
        const { category, height } = this.props;

        return (
            <div>
                <Category
                    data={ category }
                    height={ height }
                />
            </div>
        )
    }
}
