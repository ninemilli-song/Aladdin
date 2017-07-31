/**
 * View component
 */
import * as React from 'react';
// import ArchiveGrid from '../../../components/archive-grid';

interface WarehouseProps {

}

export default class Warehouse extends React.Component<any, any> {

    entityName = 'Warehouse';

    render () {
        const { store, action } = this.props;

        const data = store.get('data');
        const keyword = store.get('keyword');
        const selectedCategory = store.get('selectedCategory');

        const list = data.get('list');
        const category = data.get('category');

        return (
            <div></div>
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
