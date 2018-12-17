/**
 * Author: ninemill.song
 */
import * as React from 'react';
import { connect } from 'react-redux';
import './login.scss';
import { autobind } from 'core-decorators';
import LoginForm from './LoginForm';
import { loginDialogVisible, login } from '../../actions/user';
const Modal = require('antd/lib/modal/Modal');

@connect(
    store => (
        {
            isShow: store.globalUi.get('loginDialogVisible')
        }
    ),
    dispatch => (
        {
            show: () => {
                dispatch(loginDialogVisible(true))
            },
            hide: () => {
                dispatch(loginDialogVisible(false))
            },
            login: (mobile, password) => {
                dispatch(login(mobile, password))
            }
        }
    )
)
@autobind
export default class Login extends React.Component<any, any> {

    prefixCls = 'login';

    render() {
        const { isShow } = this.props;

        return (
            <Modal
                wrapClassName = { this.prefixCls }
                visible={ isShow }
                onCancel={ this.onCancel }
                title = { `登录` }
                closable = { false }
                width = { 600 }
                footer = { null }
            >
                <LoginForm 
                    onSubmit={ this.onSubmit }
                />
            </Modal>
        )
    }

    onSubmit(mobile, password) {
        const { login, hide } = this.props;

        // 登录
        login(mobile, password);

        // 隐藏对话框
        hide();
    }

    onCancel() {
        const { hide } = this.props;

        hide();
    }
}
