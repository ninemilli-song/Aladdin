/**
 * View component
 */
import * as React from 'react';
import {BasePage} from '../../../components/page-frame';
// import ArchiveGrid from '../../../components/archive-grid';

interface WarehouseProps {
    store: any,
    action: any,
}

export default class Warehouse extends BasePage<WarehouseProps> {

    entityName = 'Warehouse';

    constructor(props, context) {
        super(props, context);
    }

    renderContent () {
        const { store, action } = this.props;

        return (
            <div>
                <div>
                    {
                        store.warehouseUserInfo.name
                    }
                </div>
                <button
                    onClick={() => {
                        this.getUserInfo();
                    }} 
                >
                    click me!
                </button>
            </div>
        )
    }

    private getUserInfo = () => {
        const { action } = this.props;
        action.getUserInfo();
    }

    private fetchData = (options) => {
        const { action } = this.props;
        action.getList(options);
    }
}
