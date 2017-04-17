/**
 * The grid to show Warehouse list
 */
 import * as React from 'react';
 import { Table } from 'antd';

 interface WarehouseGridProps {
     prefix?: string,
     data: any,
 }

 export default class WarehouseGrid extends React.Component<WarehouseGridProps, any> {

     static defaultProps = {
         prefix: 'kyou-warehouse',
         data: [],
     }

     render(): JSX.Element {
        const { data, prefix } = this.props;

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
             <div>
                <Table
                    bordered
                    columns={ columns }
                    rowClassName = {
                        () => tableRowClass
                    }
                    dataSource={ data }
                    pagination={ true }
                    scroll={{ y: 300 }}
                />
             </div>
         )
     }
 }
