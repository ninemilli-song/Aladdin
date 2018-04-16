/**
 * 详情对话框组件
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
const Modal = require('antd/lib/modal/Modal');

interface QDetailDialogProps {
    id: number;                         // 当前内容详情的 id
    action: any;
    visible: boolean;                   // 是否可见
    onSubmit: () => void;               // 提交
    onCancel: () => void;               // 取消
    data: any;                          // 详情数据
}

@autobind
export default class QDetailDialog extends React.Component<QDetailDialogProps, any> {

    prefixCls = 'q-detail';
    
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        const { action, id } = this.props;
        const newId = nextProps.id;

        if (newId && id !== newId) {
            action.getData(newId);
        }
    }

    render() {
        const { visible, id } = this.props;

        return (
            <Modal
                visible={ visible }
                closable = { false }
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                width = { 600 }
                footer={ null }
            >
                QDetailDialog ========> { id }
            </Modal>
        )
    }

    handleOk() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit();
        }
    }

    handleCancel() {
        const { onCancel } = this.props;

        this.hide();

        if (onCancel) {
            onCancel();
        }
    }

    private hide() {
        const { action } = this.props;

        if (action.hide) {
            action.hide();
        }
    }
}
