/**
 * 我要提问 的弹框
 */
import * as React from 'react';
const Modal = require('antd/lib/modal/Modal');
const Button = require('antd/lib/button/button');
import { autobind } from 'core-decorators';
import PushQuestionForm from './PushQuestionForm';

interface PushQuestionDialogProps {
    visible: boolean,                   // 是否可见
    loading: boolean,                   // 是否为loading态
    onSubmit?: () => void,              // 提交
    onCancel?: () => void,              // 关闭弹框
}

@autobind
export default class PushQuestionDialog extends React.Component<PushQuestionDialogProps, any> {

    constructor(props: PushQuestionDialogProps, context) {
        super(props, context);

        this.state = {
            visible: props.visible || false,
            loading: props.loading || false,
        }
    }

    componentWillReceiveProps(nextProps: PushQuestionDialogProps) {
        this.setState({
            visible: nextProps.visible || false,
            loading: nextProps.loading || false,
        });
    }

    render() {
        const { visible, loading } = this.state;

        return (
            <Modal
                visible={ visible }
                title="提问"
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                width = { 600 }
                // maskClosable = { false }
                footer={ null }
            >
                <PushQuestionForm />
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

        if (onCancel) {
            onCancel();
        }

        this.setState({
            visible: false,
            loading: false,
        });
    }
}
