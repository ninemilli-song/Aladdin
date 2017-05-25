/**
 * The Category of Warehouse
 */
import * as React from 'react';
import { List } from 'immutable';

import Category from '../tree/Category';

interface WarehouseCategoryProps {
    category: List<any>;
    height?: number;
    onSelect?: (keys, e) => void;
}

export default class WarehouseCategory extends React.Component<WarehouseCategoryProps, any> {
    render(): JSX.Element {
        const { category, height, onSelect } = this.props;

        return (
            <div>
                <Category
                    data = {
                        category
                    }
                    height = {
                        height
                    }
                    onSelect = {
                        onSelect
                    }
                />
            </div>
        )
    }
}
