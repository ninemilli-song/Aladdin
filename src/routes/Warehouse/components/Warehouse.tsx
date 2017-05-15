/**
 * View component
 */
import * as React from 'react';
import { Row, Col } from 'antd';

import WarehouseCategory from './WarehouseCategory';
import WarehouseMainArea from './WarehouseMainArea';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

interface WarehouseProps {
    width?: number;
    height?: number;
    store?: any;
    action?: any;
}

export default class Warehouse extends React.Component<WarehouseProps, any> {

    constructor (props, context) {
        super(props, context);
    }

    render(): JSX.Element {
        const { store, action, width, height } = this.props;

        const data = store.get('data');
        const uiState = store.get('ui');

        const warehouseList = data.get('warehouseList');
        const warehouseCategory = data.get('category');

        const gridExpand = uiState.get('gridExpand');

        return (
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <div style={{ width: width, height: height }}>
                            <Row gutter={ 16 }>
                                <Col span={ 6 }>
                                    <WarehouseCategory
                                        category={ warehouseCategory }
                                        height={ height }
                                    />
                                </Col>
                                <Col span={ 18 }>
                                    <WarehouseMainArea
                                        expand={ gridExpand }
                                        data={ warehouseList.toJS() }
                                        height={ height }
                                    />
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </AutoSizer>
        )
    }

    componentDidMount() {
        const { action } = this.props;

        action.getList();
        action.getCategory();
    }
}
