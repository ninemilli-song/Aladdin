/**
 * Author: ninemill.song
 */
import * as React from 'react';
import connect from 'react-redux';
import 'login.scss';
import { autobind } from 'core-decorators';
import LoginForm from './LoginForm';
const Modal = require('antd/lib/modal/Modal');

@connect(
    store => (
        {
            isShow: store.uistate.showLoginDialog
        }
    ),
    dispatch => (
        {
            show: () => {
                dispatch()
            },
            hide: () => {
                dispatch()
            },
            login: () => {
                dispatch()
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
                wrapClassName = "qas"
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
        const { login } = this.props;

        login(mobile, password);
    }

    onCancel() {
        const { hide } = this.props;

        hide();
    }
}
