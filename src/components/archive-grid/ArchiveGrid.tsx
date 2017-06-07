/**
 * Grid page of Archives
 */
import * as React from 'react';
import { Row, Col } from 'antd';
import GridMain from '../category-grid/GridMain';
import Grid from '../category-grid/Grid';
import GridOperator from '../category-grid/GridOperator';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { GridQueryOptions } from '../../common/globalInterface';

export interface CategoryGridProps {
    name?: string;  // The name of page
    pageSize?: number;
    gridData: any;  // The Data show in the grid
    categoryData: any;  // The Data of category
    keyword?: string;    // The keyword for keyword
    selectedCategory?: string | string[];
    fetchCategory: () => void;
    fetchData: (option: GridQueryOptions) => void;
}

const headerHeight = 30;

const marginSpace = 10;

export default class CategoryGrid extends React.Component<CategoryGridProps, any> {

    // The id of selected category
    category: string | string[];

    // The keyword for search
    keyword: string;

    static defaultProps = {
        pageSize: 20,
        name: 'noname',
    }

    constructor (props, context) {
        super(props, context);

        this.initData();
    }

    render(): JSX.Element {
        const { pageSize, gridData, categoryData, keyword, selectedCategory, name } = this.props;

        return (
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <div style={{ width: width, height: height }}>
                            <Row gutter={ 16 }>
                                <Col>
                                    <GridOperator
                                        name = { name }
                                        height = { headerHeight }
                                        marginSpace={ marginSpace }
                                        onSearch = { this.onSearch }
                                        keyword = { keyword }
                                        categoryData = { categoryData }
                                        selectedCategory = { selectedCategory }
                                        onCategorySelected = { this.selectCategory }
                                    />
                                    <Grid
                                        data={ gridData }
                                        width={ width }
                                        height={ height - headerHeight - marginSpace }
                                        onPageChange={ this.reloadData }
                                        pageSize = { pageSize }
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
    selectCategory = (keys) => {
        // set selected category
        this.category = keys || [];

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
}
