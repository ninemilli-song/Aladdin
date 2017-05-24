/**
 * The grid to show Warehouse list
 */
import * as React from 'react';
import { Table, Button } from 'antd';
// import Icon from 'antd/lib/icon';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import { GridQueryOptions } from '../../common/globalInterface';

interface WarehouseGridProps {
    prefix?: string;
    data: any;
    width?: number;
    height?: number;
    onPageChange?: (options: GridQueryOptions) => void;
}

// 表格高度的外部空间，用于计算表格自适应高度值
const externalHeight = 115;

export default class WarehouseGrid extends React.Component<WarehouseGridProps, any> {

    static defaultProps = {
        prefix: 'kyou-warehouse',
        data: [],
        onPageChange: () => {},
    }

    render(): JSX.Element {
        const { data, prefix, width, height } = this.props;

        console.log('🦀 ------------> WarehouseGrid render height: ', height);

        const tableRowClass = prefix + '-rowCls';

        const columns = [
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
                                <Button
                                    icon="edit"
                                    shape="circle"
                                    type="primary"
                                />
                            </span>
                            <span className="grid-operator-button">
                                <Button
                                    icon="delete"
                                    shape="circle"
                                    type="dashed"
                                />
                            </span>
                        </div>
                    )
                }
            }
        ];

        return (
            <Table
                columns={ columns }
                rowClassName = {
                    () => tableRowClass
                }
                dataSource={ data.data }
                pagination={
                    {
                        total: data.total,
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
