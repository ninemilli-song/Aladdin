/**
 * 提问列表
 */
import * as React from 'react'
import CutLine from '../../../components/cut-line/CutLine';
const Pagination = require('antd/lib/pagination');
import { autobind } from 'core-decorators';
// import QDetailDialogContainer from '../containers/QDetailDialogContainer';
import QDetailDialog from '../containers/QDetailDialog';
import QItem, { QItemData } from '../containers/QItem';
import { connect } from 'react-redux';
// import QList from '../components/Qlist';
import { getQuestionList, onPageChanged, onSelectedQ } from '../actions/index';
import ReplayDialog from '../components/ReplayDialog';
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
            {
                this.renderAnswerDialog()
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
                        <QItem 
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
            <QDetailDialog />
        )
    }

    /**
     * 回答框
     */
    renderAnswerDialog() {
        return (
            <ReplayDialog />
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
}
