/**
 * 提问列表
 */
import * as React from 'react'
import CutLine from '../../../components/cut-line/CutLine';
const Pagination = require('antd/lib/pagination');
import { autobind } from 'core-decorators';
import QDetailDialogContainer from '../containers/QDetailDialogContainer';
import QItemContainer, { QItemData } from '../containers/QItem';
import { connect } from 'react-redux';
// import QList from '../components/Qlist';
import { getQuestionList, onPageChanged, toggleDetailDialogVisible, onSelectedQ } from '../actions/index';
// import { toJS } from '../../../utils/hocs';

type QListData = {
    list: Array<QItemData>;                     // 列表数据
    total: number;                              // 结果总数
}

type PageOptionsType = {
    currentPage: number;                        // 当前页码
    pageSize: number;                           // 页面大小
}

interface QListProps {
    data?: QListData;                            // 数据
    // data: any;                               // 数据
    action?: any;
    pageOptions?: PageOptionsType;               // 分页参数
}

@connect(
    store => {
        return {
            data: store.QAS.getIn(['data', 'QList']),
            pageOptions: {
                currentPage: store.QAS.getIn(['uistate', 'currentPage']),
                pageSize: store.QAS.getIn(['uistate', 'pageSize']),
            }
        }
    },
    dispatch => {
        return {
            action: {
                getQuestionList: async (pageNum, pageSize) => {
                    dispatch(getQuestionList(pageNum, pageSize));
    
                    dispatch(onPageChanged(pageNum, pageSize));
                },
                showQDetail: (id) => {                                                      // 显示提问详情
                    dispatch(toggleDetailDialogVisible());                                  // 显示提问详情
                    dispatch(onSelectedQ(id));                                              // 设置选中的提问 id
                }
            },
        }
    }
)
@autobind
export default class QList extends React.Component<any, any> {

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
            data.getIn(['list']).map((item, index) => {
                const id = item.getIn(['id']);

                return (
                    <div
                        key = { `${this.prefixCls}-qitem-index-${ id }` }
                    >
                        <QItemContainer 
                            id = { id }
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
                    total={ data ? data.getIn(['total']) : null } 
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
