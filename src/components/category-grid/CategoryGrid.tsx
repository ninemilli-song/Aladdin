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

    // The id of selected category
    category: string;

    // The keyword for search
    keyword: string;

    static defaultProps = {
        pageSize: 20,
    }

    constructor (props, context) {
        super(props, context);

        this.state = {
            foldCategory: false,    // Fold the category panel
        }
    }

    render(): JSX.Element {
        const { store, action, pageSize} = this.props;
        const { foldCategory } = this.state;

        const data = store.get('data');
        const uiState = store.get('ui');
        const keyword = store.get('keyword');

        const list = data.get('list');
        const category = data.get('category');

        const gridExpand = uiState.get('gridExpand');

        return (
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <div style={{ width: width, height: height }}>
                            <Row gutter={ 16 }>
                                <Col span={ foldCategory ? 1 : 6 }>
                                    <Category
                                        expand={ !foldCategory }
                                        category={ category }
                                        height={ height }
                                        onSelect = { this.selectCategory }
                                        onFold = { this.onFoldCategory }
                                    />
                                </Col>
                                <Col span={ foldCategory ? 23 : 18 }>
                                    <GridMain
                                        expand={ gridExpand }
                                        data={ list }
                                        height={ height }
                                        onPageChange={ this.reloadData }
                                        pageSize = { pageSize }
                                        onSearch = { this.onSearch }
                                        keyword = { keyword }
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

        action.getList({
            pagination: {
                page: 1,
                pageSize: pageSize,
            }
        });
        action.getCategory();
    }

    componentDidUpdate() {
        const { action, pageSize } = this.props;
        const date = new Date();
    }

    componentWillReceiveProps() {
        const date = new Date();
    }

    // Get data from server
    getData = (options: GridQueryOptions) => {
        const date = new Date();
        const { action } = this.props;

        action.getList(options);
    }

    // 分类选中
    selectCategory = (keys, e) => {
        console.info('selectCategory: ', keys, e);
        // set selected category
        this.category = keys[0] || '';

        // refresh grid's data
        this.reloadData();
    }

    private reloadData = (options?: GridQueryOptions) => {
        const {  pageSize } = this.props;

        const reloadOpts = Object.assign({}, {
            category: this.category,
            keyword: this.keyword,
            pagination: {
                page: 1,
                pageSize: pageSize,
            },
        }, options);

        this.getData(reloadOpts);
    }

    private onSearch = (keyword) => {
        this.reloadData({
            keyword,
        });
    }

    private onFoldCategory = (fold: boolean) => {
        this.setState({
            foldCategory: fold,
        })
    }
}
