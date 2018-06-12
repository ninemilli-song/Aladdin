/**
 * The Container fo QDetailDialog Component
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
const Modal = require('antd/lib/modal/Modal');
const Spin = require('antd/lib/spin');
import { connect } from 'react-redux';
import { 
    setDetailDialogVisible, 
    getQDetailData, 
    clearQDetailData, 
    onSelectedQ, 
    replyQuestionExpand, 
    addReply,
    refreshQDetailData,
    concernQuestion,
    unconcernQuestion
} from '../actions/index';
import { toJS } from '../../../utils/hocs';
import QDetail from '../components/QDetail';

/**
 * 详情对话框组件
 */
interface QDetailDialogProps {
    id?: number;                         // 当前内容详情的 id
    action?: any;
    visible?: boolean;                   // 是否可见
    loading?: boolean;                   // 是否正在加载
    data?: any;                          // 详情数据
    replyQuestionExpand?: boolean;       // 回答问题框是否展开
}

@connect(
    store => {
        return {
            visible: store.QAS.getIn(['uistate', 'qDetailDialogOpts', 'visible']),
            loading: store.QAS.getIn(['uistate', 'qDetailDialogOpts', 'loading']),
            replyQuestionExpand: store.QAS.getIn(['uistate', 'qDetailDialogOpts', 'replyQuestionExpand']),
            id: store.QAS.getIn(['selectedQId']),
            data: store.QAS.getIn(['qDetailData'])
        }
    },
    dispatch => {
        return {
            action: {
                hide: () => {
                    // 重置ui状态
                    dispatch(setDetailDialogVisible(false));
                    dispatch(replyQuestionExpand(false));
                    // 重置数据状态
                    dispatch(clearQDetailData());
                    dispatch(onSelectedQ(-1));
                },
                getData: (id) => {
                    dispatch(getQDetailData(id));
                },
                replyQuestionOnFocus: () => {
                    dispatch(replyQuestionExpand(true));
                },
                replyQuestionOnBlur: () => {
                    dispatch(replyQuestionExpand(false));
                },
                onReplyQuestion: async (questionId, answer) => {                          // 回应问题
                    await dispatch(addReply(questionId, answer));

                    // 更新数据
                    dispatch(refreshQDetailData(questionId));
                },
                doConcern: (id) => {                                                    // 关注问题
                    dispatch(concernQuestion(id));
                },
                cancelConcern: (id) => {                                                // 取消关注
                    dispatch(unconcernQuestion(id));
                }
            },
        }
    }
)
@autobind
export default class QDetailDialog extends React.Component<QDetailDialogProps, any> {

    prefixCls = 'q-detail-dialog';
    
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        const { action, id } = this.props;
        const newId = nextProps.id;

        if (newId && newId !== id && newId !== -1 && nextProps.visible) {
            action.getData(newId);
        }
    }

    render() {
        const { visible, id, data, loading, replyQuestionExpand } = this.props;

        return (
            <Modal
                wrapClassName = "qas"
                visible={ visible }
                closable = { false }
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                width = { 600 }
                footer = { null }
            >
                <div className={ `${this.prefixCls}-wrapper` }>
                    {
                        loading ? (
                            <div className={ `${this.prefixCls}-spin-wrapper` }>
                                <Spin />
                            </div>
                        ) : (
                            <QDetail 
                                data = { data }
                                sayExpand = { replyQuestionExpand }
                                sayOnFocus = { this.replyQuestionOnFocus }
                                sayOnBlur = { this.replyQuestionOnBlur }
                                answerHandler = { this.showAnswer }
                                concernHandler = { this.concernHandler }
                                inviteHandler = { this.showInvite }
                                shareHandler = { this.showShare }
                                onReplyQuestion = { this.onReplyQuestion }
                            />
                        )
                    }
                </div>
            </Modal>
        )
    }

    handleOk() {
        // const { onSubmit } = this.props;

        // if (onSubmit) {
        //     onSubmit();
        // }
    }

    handleCancel() {
        // const { onCancel } = this.props;

        this.hide();

        // if (onCancel) {
        //     onCancel();
        // }
    }

    private hide() {
        const { action } = this.props;

        if (action.hide) {
            action.hide();
        }
    }

    private showAnswer(evt) {
        // 阻止事件冒泡传递 避免回应框收起
        evt.stopPropagation();

        // 展开回应问题对话框
        this.replyQuestionOnFocus();
    }

    private concernHandler(concern) {
        const { data, action } = this.props;
        const id = data.get('id');
        
        if (concern) {                 // 关注问题
            action.doConcern(id);
        } else {                        // 取消关注
            action.cancelConcern(id);
        }
    }

    private showInvite() {

    }

    private showShare() {

    }

    /**
     * 回答问题对话框获取焦点
     */
    private replyQuestionOnFocus () {
        const { action } = this.props;

        action.replyQuestionOnFocus();
    }

    private replyQuestionOnBlur () {
        const { action } = this.props;

        action.replyQuestionOnBlur();
    }

    /**
     * 回应问题
     */
    private onReplyQuestion (value) {
        const { data, action } = this.props;
        const questionId = data.get('id');

        // 回复问题
        action.onReplyQuestion(questionId, value);

        // 收起回应问题框
        action.replyQuestionOnBlur();
    }
}

