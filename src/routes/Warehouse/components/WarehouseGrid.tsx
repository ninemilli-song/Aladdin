/**
 * The grid to show Warehouse list
 */
 import * as React from 'react';
 import { Table } from 'antd';
 import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

 interface WarehouseGridProps {
     prefix?: string;
     data: any;
     width?: number;
     height?: number;
 }

// 表格高度的外部空间，用于计算表格自适应高度值
 const externalHeight = 115;

 export default class WarehouseGrid extends React.Component<WarehouseGridProps, any> {

     static defaultProps = {
         prefix: 'kyou-warehouse',
         data: [],
     }

     render(): JSX.Element {
        const { data, prefix, width, height } = this.props;

        console.log('🦀 ------------> WarehouseGrid render height: ', height);

        const tableRowClass = prefix + '-rowCls';

        const columns = [
            {
                title: '编码',
                width: 80,
                key: 'code',
                dataIndex: 'code',
            }, {
                title: '名称',
                width: 200,
                key: 'name',
                dataIndex: 'name',
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
            }
        ];

        return (
            <Table
                bordered
                columns={ columns }
                rowClassName = {
                    () => tableRowClass
                }
                dataSource={ data }
                pagination={ true }
                scroll={{ y: height - externalHeight }}
            />
        )
     }
 }
