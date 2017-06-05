/**
 * Grid page of Archives
 */
import * as React from 'react';
import { Row, Col } from 'antd';
import GridMain from '../category-grid/GridMain';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { GridQueryOptions } from '../../common/globalInterface';

export interface CategoryGridProps {
    pageSize?: number;
    gridData: any;  // The Data show in the grid
    categoryData: any;  // The Data of category
    keyword?: string;    // The keyword for keyword
    fetchCategory: () => void;
    fetchData: (option: GridQueryOptions) => void;
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

        this.initData();
    }

    render(): JSX.Element {
        const { pageSize, gridData, categoryData, keyword } = this.props;
        const { foldCategory } = this.state;

        return (
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <div style={{ width: width, height: height }}>
                            <Row gutter={ 16 }>
                                <Col>
                                    <GridMain
                                        data={ gridData }
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

    initData() {
        const { pageSize, fetchCategory, fetchData } = this.props;

        fetchData({
            pagination: {
                page: 1,
                pageSize: pageSize,
            }
        });

        fetchCategory();
    }

    // Get data from server
    getData = (options: GridQueryOptions) => {
        const date = new Date();
        const { fetchData } = this.props;

        fetchData(options);
    }

    // 分类选中
    selectCategory = (keys, e) => {
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
