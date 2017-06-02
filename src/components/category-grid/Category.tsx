/**
 * The Category of Warehouse
 */
import * as React from 'react';
import { List } from 'immutable';

import Category from '../tree/Category';

interface WarehouseCategoryProps {
    expand?: boolean;
    category: List<any>;
    height?: number;
    onSelect?: (keys, e) => void;
    onFold?: (fold: boolean) => void;
}

export default class WarehouseCategory extends React.Component<WarehouseCategoryProps, any> {
    render(): JSX.Element {
        const { category, height, onSelect, expand, onFold } = this.props;

        return (
            <div>
                <Category
                    expand = {
                        expand
                    }
                    data = {
                        category
                    }
                    height = {
                        height
                    }
                    onSelect = {
                        onSelect
                    }
                    onFold = {
                        onFold
                    }
                />
            </div>
        )
    }
}
