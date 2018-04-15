/**
 * 提问列表
 */
import * as React from 'react'
import QItem, { QItemData } from './QItem';
import CutLine from '../../../components/cut-line/CutLine';
const Pagination = require('antd/lib/pagination');
import { autobind } from 'core-decorators';

type QListData = {
    list: Array<QItemData>;                     // 列表数据
    total: number;                              // 结果总数
}

interface QListProps {
    data: QListData;                            // 数据
    action: any;
}

@autobind
export default class QList extends React.Component<QListProps, any> {

    prefixCls = 'qas-body';

    render() {
        return (
            <div className={ `${this.prefixCls}-question-list-wrapper` }>
            {
                this.genQList()
            }
            {
                this.renderPagination()
            }
            </div>
        )
    }

    /**
     * 渲染列表
     */
    genQList() {
        const { data } = this.props;

        const listEles = data ? 
            data.list.map((item, index) => {
                return (
                    <div
                        key = { `${this.prefixCls}-qitem-index-${item.id}` }
                    >
                        <QItem 
                            data = { item }
                        />
                        <CutLine />
                    </div>
                )
        }) : null;

        return (
            <div className={ `${this.prefixCls}-question-list` }>
                {
                    listEles
                }
            </div>
        )
    }

    /**
     * 渲染分页组件
     */
    renderPagination() {
        const { data } = this.props;
        return (
            <div className={ `${this.prefixCls}-question-pagination` }>
                <Pagination 
                    total={ data ? data.total : null } 
                    onChange={ this.handlePageChange }
                    size="small"
                    pageSize={ 10 }
                />
            </div>
        )       
    }

    /**
     * 处理分页切换
     * @param page 
     * @param pageSize 
     */
    handlePageChange(page, pageSize) {
        const { action } = this.props;

        if (action.onPageChanged) {
            action.onPageChanged(page, pageSize);
        }
    }
}
