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
import { getQuestionList, onPageChanged, onSelectedQ, setReplyDialogVisible, addReply } from '../actions/index';
import ReplyDialog from '../components/ReplyDialog';
import ReplyAnswerDialog from './ReplyAnswerDialog';
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
            },
            uistate: store.QAS.get('uistate'),
            selectedQId: store.QAS.getIn(['selectedQId']),
            isAuthenticated: store.userInfo.isAuthenticated
        }
    },
    dispatch => {
        return {
            action: {
                getQuestionList: async (pageNum, pageSize) => {
                    dispatch(getQuestionList(pageNum, pageSize));
    
                    dispatch(onPageChanged(pageNum, pageSize));
                },
                hideReplyDialog: () => {                                                  // 隐藏回答对话框
                    dispatch(onSelectedQ(null));                                          // 设置选中的提问 id
                    dispatch(setReplyDialogVisible(false));                               // 隐藏对话框
                },
                addReply: (questionId, answer) => {
                    dispatch(addReply(questionId, answer));
                }
            },
        }
    }
)
@autobind
export default class QList extends React.Component<any, any> {

    prefixCls = 'q-list';

    componentWillReceiveProps(nexprops) {
        const { isAuthenticated, action } = this.props;
        // 如果用户认证状态改变 更新问题数据
        if (isAuthenticated !== nexprops.isAuthenticated) {
            action.getQuestionList();
        }
    }

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
                // this.renderReplyDialog()
            }
            {
                this.renderReplyAnswerDialog()
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
                        {
                            index < data.getIn(['list']).size - 1 ? (
                                <CutLine />
                            ) : null
                        }
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

    // /**
    //  * 回答框
    //  */
    // renderReplyDialog() {
    //     const { uistate, data, selectedQId } = this.props;
    //     const visible = uistate ? uistate.getIn(['qReplyDialogOpts', 'visible']) : false;
    //     const list = data ? data.getIn(['list']) : [];

    //     const selectedQ = list.find((value, key) => {
    //         if (value.get('id') === selectedQId) {
    //             return true;
    //         }
    //     });

    //     return (
    //         <ReplyDialog 
    //             data = { selectedQ }
    //             visible = { visible }
    //             onClose = { this.handleCloseReplyDialog }
    //             onReply = { this.handleReplySubmit }
    //         />
    //     )
    // }

    /**
     * 回复 Answer 对话框
     */
    renderReplyAnswerDialog() {
        return (
            <ReplyAnswerDialog />
        )
    }

    private handleCloseReplyDialog(id) {
        const { action } = this.props;

        action.hideReplyDialog();
    }

    /**
     * 回复问题
     * @param questionId 问题 id
     * @param answer 回复内容
     */
    private handleReplySubmit(questionId, answer) {
        const { action } = this.props;

        action.addReply(questionId, answer);
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
