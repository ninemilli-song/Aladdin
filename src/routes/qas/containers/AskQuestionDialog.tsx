/**
 * The Container fo PushQuestionDialog Component
 */
import * as React from 'react';
const Modal = require('antd/lib/modal/Modal');
import { autobind } from 'core-decorators';
import PushQuestionForm from '../components/PushQuestionForm';
import { connect } from 'react-redux';
import { togglePushQuestionDialogVisible } from '../actions/index';

/**
 * 我要提问 的弹框
 */
interface AskQuestionDialogProps {
    visible?: boolean,                   // 是否可见
    loading?: boolean,                   // 是否为loading态
    onSubmit?: () => void,              // 提交
    onCancel?: () => void,              // 关闭弹框
}

@connect(
    store => {
        return {
            visible: store.QAS.getIn(['uistate', 'pushQuestionDialogVisible']),
            loading: store.QAS.getIn(['uistate', 'pushQuestionDialogLoading']),
        }
    },
    dispatch => {
        return {
            togglePushQuestionDialogVisible: () => {
                dispatch(togglePushQuestionDialogVisible());
            }
        }
    }
)
@autobind
export default class AskQuestionDialog extends React.Component<any, any> {

    constructor(props: AskQuestionDialogProps, context) {
        super(props, context);

        this.state = {
            visible: props.visible || false,
            loading: props.loading || false,
        }
    }

    componentWillReceiveProps(nextProps: AskQuestionDialogProps) {
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
        const { onCancel, togglePushQuestionDialogVisible } = this.props;

        if (onCancel) {
            onCancel();
        }

        togglePushQuestionDialogVisible();
    }
}

