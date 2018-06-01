/**
 * 回答框
 */
import * as React from 'react';
const Modal = require('antd/lib/modal/Modal');

interface ReplayDialogProps {
    data?: any;                  // 问题数据
    replayCallback?: Function;   // 回答回调
    visible?: boolean;           // 是否显示
}

export default class ReplayDialog extends React.Component<ReplayDialogProps, any> {

    prefixCls: 'replay-dialog'

    render() {
        const { visible, replayCallback } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <Modal
                    wrapClassName = "qas"
                    visible={ visible }
                    closable = { false }
                    onOk={ this.handleReplay }
                    width = { 600 }
                    footer = { null }
                >
                    <div className={ `${this.prefixCls}-wrapper` }>
                        
                    </div>
                </Modal>
            </div>
        )
    }

    private handleReplay() {
        const { replayCallback } = this.props;

        if (replayCallback) {
            replayCallback();
        }
    }
}
