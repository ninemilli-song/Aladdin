/**
 * 回答框
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
import Question from './Question';
import ISay from '../../../components/i-say/ISay';
const Modal = require('antd/lib/modal/Modal');

interface ReplyDialogProps {
    data?: any;                     // 问题数据
    replyCallback?: Function;       // 回答回调
    visible?: boolean;              // 是否显示
    onClose?: Function;             // 关闭回调
}

@autobind
export default class ReplyDialog extends React.Component<ReplyDialogProps, any> {

    prefixCls = 'qas-replay-dialog';

    render() {
        const { visible, replyCallback, data } = this.props;

        return (
                <Modal
                    wrapClassName = "qas"
                    visible={ visible }
                    onOk={ this.handleReplay }
                    onCancel={ this.handleCancel }
                    title = { `回复` }
                    closable = { false }
                    width = { 600 }
                    footer = { null }
                >
                    <div className={ `${this.prefixCls}-wrapper` }>
                        <Question 
                            data = { data }
                        />
                        <div className={ `${this.prefixCls}-doReply` }>
                            <ISay
                                placeholder = "谈谈您的看法吧！"
                                title = "回复"
                                expand = { true }
                                submitLabel = "回复"
                            />
                        </div>
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
