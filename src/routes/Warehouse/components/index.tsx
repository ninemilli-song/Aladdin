/**
 * View component
 */
import * as React from 'react';
// import CategoryGrid from '../../../components/category-grid';
import CategoryGrid from '../../../components/archive-grid';

interface WarehouseProps {

}

export default class Warehouse extends React.Component<any, any> {
    render () {
        const { store, action } = this.props;

        const data = store.get('data');
        const keyword = store.get('keyword');

        const list = data.get('list');
        const category = data.get('category');

        return (
            <CategoryGrid
                gridData = { list }
                categoryData = { category }
                keyword = { keyword }
                fetchCategory = { this.fetchCategory }
                fetchData = { this.fetchData }
            />
        )
    }

    private fetchCategory = () => {
        const { action } = this.props;
        action.getCategory();
    }

    private fetchData = (options) => {
        const { action } = this.props;
        action.getList(options);
    }
}
