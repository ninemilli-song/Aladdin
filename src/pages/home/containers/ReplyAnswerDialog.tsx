/**
 * 回复用户对某些问题进行的回答对话框组件
 */
import * as React from 'react';
import ReplyDialog from '../components/ReplyDialog';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { setReplyAnswerDialogVisible, submitAnswerReply } from '../actions/index';

interface ReplyAnswerDialogProps {
    data?: any;
    visible?: boolean;
    action?: any;
    questionId?: number;
}

@connect(
    store => {
        return {
            data: store.Home.getIn(['uistate', 'qReplyAnswerDialogOpts', 'data']),
            visible: store.Home.getIn(['uistate', 'qReplyAnswerDialogOpts', 'visible']),
            questionId: store.Home.getIn(['uistate', 'qReplyAnswerDialogOpts', 'questionId'])
        }
    },
    dispatch => {
        return {
            action: {
                closeReplyDialog: () => {
                    dispatch(setReplyAnswerDialogVisible(null, false, null));
                },
                addReply: (id, content, questionId) => {
                    dispatch(submitAnswerReply(id, content, questionId))
                }
            }
        }
    }
)
@autobind
export default class ReplyAnswerDialog extends React.Component<ReplyAnswerDialogProps, any> {

    render() {
        const { data, visible } = this.props;

        return (
            <ReplyDialog 
                data = { data }
                visible = { visible }
                onClose = { this.handleCloseReplyDialog }
                onReply = { this.handleReplySubmit }
            />
        )
    }

    /**
     * 关闭对话框
     */
    private handleCloseReplyDialog() {
        const { action } = this.props;

        action.closeReplyDialog();
    }

    /**
     * 提交回复
     */
    private handleReplySubmit(id, content) {
        const { action, questionId } = this.props;

        action.addReply(id, content, questionId);
    }
}
