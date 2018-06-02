/**
 * 回答框
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
const Modal = require('antd/lib/modal/Modal');

interface ReplyDialogProps {
    data?: any;                     // 问题数据
    replyCallback?: Function;       // 回答回调
    visible?: boolean;              // 是否显示
    onClose?: Function;             // 关闭回调
}

@autobind
export default class ReplyDialog extends React.Component<ReplyDialogProps, any> {

    prefixCls: 'replay-dialog'

    render() {
        const { visible, replyCallback } = this.props;

        return (
                <Modal
                    wrapClassName = "qas"
                    title = "回复"
                    visible={ visible }
                    onOk={ this.handleReplay }
                    onCancel={ this.handleCancel }
                    width = { 600 }
                    footer = { null }
                >
                    <div className={ `${this.prefixCls}-wrapper` }>
                        aaa
                    </div>
                </Modal>
        )
    }

    private handleReplay() {
        const { replyCallback } = this.props;

        if (replyCallback) {
            replyCallback();
        }
    }

    private handleCancel() {
        const { onClose } = this.props;

        if (onClose) {
            onClose();
        }
    }
}
