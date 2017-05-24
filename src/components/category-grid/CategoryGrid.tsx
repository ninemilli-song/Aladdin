/**
 * View component
 */
import * as React from 'react';
import { Row, Col } from 'antd';

import Category from './Category';
import GridMain from './GridMain';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { GridQueryOptions } from '../../common/globalInterface';

export interface CategoryGridProps {
    store?: any;
    action?: any;
    pageSize?: number;
}

export default class CategoryGrid extends React.Component<CategoryGridProps, any> {

    constructor (props, context) {
        super(props, context);
    }

    render(): JSX.Element {
        const { store, action } = this.props;

        const data = store.get('data');
        const uiState = store.get('ui');

        const list = data.get('list');
        const category = data.get('category');

        const gridExpand = uiState.get('gridExpand');

        return (
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <div style={{ width: width, height: height }}>
                            <Row gutter={ 16 }>
                                <Col span={ 6 }>
                                    <Category
                                        category={ category }
                                        height={ height }
                                    />
                                </Col>
                                <Col span={ 18 }>
                                    <GridMain
                                        expand={ gridExpand }
                                        data={ list.toJS() }
                                        height={ height }
                                        onPageChange={ this.getData }
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
        const { action, pageSize } = this.props;

        console.info('⛑ ------> warehouse componentDidMount');

        action.getList({
            pagination: {
                page: 1,
                pageSize: pageSize ?  pageSize : 10,
            }
        });
        action.getCategory();
    }

    componentWillReceiveProps() {
        console.info('⛑ ------> warehouse componentWillReceiveProps');
    }

    // Get data from server
    getData = (options: GridQueryOptions) => {
        console.info('⛑ ------> get data: ', options);
        const { action } = this.props;

        action.getList(options);
    }
}
