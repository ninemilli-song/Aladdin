/**
 * 回复用户对某些问题进行的回答对话框组件
 */
import * as React from 'react';
import ReplyDialog from '../components/ReplyDialog';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { setReplyAnswerDialogVisible } from '../actions/index';

interface ReplyAnswerDialogProps {
    data?: any;
    visible?: boolean;
    action?: any;
}

@connect(
    store => {
        return {
            data: store.QAS.getIn(['uistate', 'qReplyAnswerDialogOpts', 'data']),
            visible: store.QAS.getIn(['uistate', 'qReplyAnswerDialogOpts', 'visible'])
        }
    },
    dispatch => {
        return {
            action: {
                closeReplyDialog: () => {
                    dispatch(setReplyAnswerDialogVisible(null, false));
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
    private handleReplySubmit() {

    }
}
