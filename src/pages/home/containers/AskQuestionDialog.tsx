/**
 * The Container fo PushQuestionDialog Component
 */
import * as React from 'react';
const Modal = require('antd/lib/modal/Modal');
import { autobind } from 'core-decorators';
import PushQuestionForm from '../components/PushQuestionForm';
import { connect } from 'react-redux';
import { togglePushQuestionDialogVisible, submitQuestion } from '../actions/index';

@connect(
    store => {
        return {
            visible: store.Home.getIn(['uistate', 'pushQuestionDialogVisible']),
            loading: store.Home.getIn(['uistate', 'pushQuestionDialogLoading']),
        }
    },
    dispatch => {
        return {
            togglePushQuestionDialogVisible: () => {
                dispatch(togglePushQuestionDialogVisible());
            },

            submitQuestion: (data) => {
                dispatch(submitQuestion(data));
            }
        }
    }
)
@autobind
export default class AskQuestionDialog extends React.Component<any, any> {

    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: props.visible || false,
            loading: props.loading || false,
        }
    }

    componentWillReceiveProps(nextProps) {
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
                <PushQuestionForm 
                    onSubmit = { this.handlerSubmit }
                />
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

    /**
     * 处理请求提交
     */
    private async handlerSubmit(data) {
        const { submitQuestion, togglePushQuestionDialogVisible } = this.props;

        await submitQuestion(data);

        // 关闭弹框
        togglePushQuestionDialogVisible();
    }
}

