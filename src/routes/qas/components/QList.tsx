/**
 * 提问列表
 */
import * as React from 'react'
import QItem, { QItemData } from './QItem';
import CutLine from '../../../components/cut-line/CutLine';
const Pagination = require('antd/lib/pagination');
import { autobind } from 'core-decorators';
import QDetailDialogContainer from '../containers/QDetailDialogContainer';
import QItemContainer from '../containers/QItemContainer';

type QListData = {
    list: Array<QItemData>;                     // 列表数据
    total: number;                              // 结果总数
}

type PageOptionsType = {
    currentPage: number;                        // 当前页码
    pageSize: number;                           // 页面大小
}

interface QListProps {
    data: QListData;                            // 数据
    // data: any;                            // 数据
    action: any;
    pageOptions: PageOptionsType;               // 分页参数
}

@autobind
export default class QList extends React.Component<QListProps, any> {

    prefixCls = 'q-list';

    render() {
        return (
            <div className={ `${this.prefixCls}-question-list-wrapper` }>
            {
                this.genQList()
            }
            {
                this.renderPagination()
            }
            {
                this.renderDetailDialog()
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
                        <QItemContainer 
                            id = { item.id }
                        />
                        <CutLine />
                    </div>
                )
        }) : null;

        return (
            <div className={ `${this.prefixCls}-list` }>
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
        const { data, pageOptions } = this.props;
        return (
            <div className={ `${this.prefixCls}-pagination` }>
                <Pagination 
                    total={ data ? data.total : null } 
                    onChange={ this.handlePageChange }
                    size="small"
                    current = { pageOptions.currentPage }
                    pageSize={ pageOptions.pageSize }
                />
            </div>
        )       
    }

    /**
     * 渲染详情框
     */
    renderDetailDialog() {
        return (
            <QDetailDialogContainer />
        )
    }

    /**
     * 处理分页切换
     * @param page 
     * @param pageSize 
     */
    handlePageChange(page, pageSize) {
        const { action } = this.props;

        if (action.getQuestionList) {
            action.getQuestionList(page, pageSize);
        }
    }

    /**
     * 显示提问详情
     * @param id 提问条目的id
     */
    private handleOnShowDetail(id) {
        const { action } = this.props;

        action.showQDetail(id);
    }
}
