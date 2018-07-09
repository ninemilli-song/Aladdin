/**
 * The Container fo QDetailDialog Component
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
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
    unconcernQuestion,
    alReplyQuestionExpand
} from '../actions/index';
import { toJS } from '../../../utils/hocs';
import ISay from '../../../components/i-say/ISay';
import AnswerList from './AnswerList';

/**
 * 详情对话框组件
 */
interface AnswerListPanelProps {
    questionId?: number;                 // 当前提问的 id
    action?: any;
    visible?: boolean;                   // 是否可见
    loading?: boolean;                   // 是否正在加载
    data?: any;                          // 详情数据
    replyExpand?: boolean;                   // 回答问题框是否展开
}

@connect(
    (store, ownProps) => {
        const { questionId } = ownProps;
        const data = store.QAS.get('qExpandQuestions').get(questionId).get('data');
        const replyExpand = store.QAS.get('qExpandQuestions').get(questionId).getIn(['uistate', 'replyExpand']);
        const loading = store.QAS.get('qExpandQuestions').get(questionId).getIn(['uistate', 'loading']);

        return {
            loading,
            replyExpand,
            questionId,
            data,
        }
    },
    dispatch => {
        return {
            action: {
                getData: (id) => {
                    dispatch(getQDetailData(id));
                },
                replyQuestionOnFocus: (id) => {
                    dispatch(alReplyQuestionExpand(id, true));
                },
                replyQuestionOnBlur: (id) => {
                    dispatch(alReplyQuestionExpand(id, false));
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
export default class AnswerListPanel extends React.Component<AnswerListPanelProps, any> {

    prefixCls = 'answer-list-panel';
    
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log('AnswerListPanel componentWillReceiveProps >>>>>>>');
        const { action, questionId, data } = this.props;

        if (questionId && !data) {
            action.getData(questionId);
        }
    }

    render() {
        const { loading, replyExpand, data } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                {
                    loading ? (
                        <div className={ `${this.prefixCls}-spin-wrapper` }>
                            <Spin />
                        </div>
                    ) : (
                        <div>
                            <div className={ `${this.prefixCls}-doReply` }>
                                <ISay
                                    placeholder = "谈谈您的看法吧！"
                                    title = "回答"
                                    expand = { replyExpand }
                                    onFocus = { this.replyQuestionOnFocus }
                                    // onBlur = { this.replyQuestionOnBlur }
                                    onSubmit = { this.onReplyQuestion }
                                />
                            </div>
                            <div className={ `${this.prefixCls}-replyList` }>
                                <AnswerList 
                                    data = {
                                        data ? data.get('answers') : []
                                    }
                                />
                            </div>
                        </div>
                    )
                }
            </div>
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
        const { data, action } = this.props;
        const questionId = data.get('id');

        action.replyQuestionOnFocus(questionId);
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

