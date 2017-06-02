/**
 * The grid to show Warehouse list
 */
import * as React from 'react';
import { Table, Button } from 'antd';
import ButtonIcon from '../button-icon';
// import Icon from 'antd/lib/icon';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import { GridQueryOptions } from '../../common/globalInterface';

interface GridProps {
    prefix?: string;
    data: any;
    width?: number;
    height?: number;
    pageSize?: number;
    columns?: any[];
    onPageChange?: (options: GridQueryOptions) => void;
}

// 表格高度的外部空间，用于计算表格自适应高度值
const externalHeight = 115;

export default class Grid extends React.Component<GridProps, any> {

    static defaultProps = {
        prefix: 'kyou-grid',
        data: [],
        pageSize: 10,
        onPageChange: () => {},
        columns: [
            {
                title: '序号',
                width: 80,
                key: 'index',
                fixed: 'left' as 'left',
                render: (text, record, index) => {
                    return <span>{ index + 1 }</span>
                },
            },
            {
                title: '名称',
                width: 100,
                key: 'name',
                fixed: 'left' as 'left',
                dataIndex: 'name',
            },
            {
                title: '编码',
                width: 80,
                key: 'code',
                dataIndex: 'code',
            }, {
                title: '分类',
                width: 60,
                key: 'category',
                dataIndex: 'category',
            }, {
                title: '结账状态',
                key: 'stop',
                width: 100,
                dataIndex: 'stop',
                render: (text, record) => {
                    const statusText = text ? '停用' : '未停用';
                    return (<div>{ statusText }</div>);
                },
            }, {
                title: '建立时间',
                width: 100,
                key: 'createDate',
                dataIndex: 'createDate',
            }, {
                title: '备注',
                key: 'comment',
                dataIndex: 'comment',
            }, {
                title: '操作',
                key: 'operation',
                className: `grid-operator`,
                fixed: 'right' as 'right',
                width: 100,
                render: () => {
                    return (
                        <div>
                            <span className="grid-operator-button">
                                <ButtonIcon
                                    icon="edit"
                                    title="收起分类"
                                />
                            </span>
                            <span className="grid-operator-button">
                                <ButtonIcon
                                    icon="delete"
                                    title="收起分类"
                                />
                            </span>
                        </div>
                    )
                }
            }
        ],
    }

    render(): JSX.Element {
        const { data, prefix, width, height, columns, pageSize } = this.props;

        const tableRowClass = prefix + '-rowCls';

        console.log('Grid -------> data: ', data);

        return (
            <Table
                columns={ columns }
                rowClassName = {
                    () => tableRowClass
                }
                dataSource={ data.get('data').toJS() }
                pagination={
                    {
                        pageSize,
                        total: data.get('total'),
                    }
                }
                onChange={ this.pageChangeHandler }
                scroll={{ x: 1500, y: height - externalHeight }}
            />
        )
    }

    pageChangeHandler = (pagination, filters, sorter) => {
        const { onPageChange } = this.props;

        const paginationOpt = {
            pageSize: pagination.pageSize,
            page: pagination.current,
        }

        onPageChange({
            pagination: paginationOpt,
            filters,
            sorter,
        });
    }
}
