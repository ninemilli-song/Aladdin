/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import { connect } from 'react-redux';
import './style.scss';
import { logout, getUserInfo, loginDialogVisible } from '../../actions/user';
import { autobind } from 'core-decorators';

interface ComponentProps {
    logout?: () => void;
    getUserInfo?: Function;
    showLogin?: Function;
    data?: any;
}

@connect(
    store => (
        {
            data: store.userInfo,
        }
    ),
    dispatch => (
        {
            logout: () => {
                dispatch(logout())
            },
            showLogin: () => {
                dispatch(loginDialogVisible(true))
            },
            getUserInfo: () => {
                dispatch(getUserInfo());
            }
        }
    )
)
@autobind
export default class Component extends React.Component<ComponentProps, any> {

    prefixCls = 'nav-user';

    constructor(props, context) {
        super(props, context);

        this.init(props);
    }

    /**
     * 初始化
     * @param props 
     */
    init(props: ComponentProps) {
        const { getUserInfo } = props;

        // 初始化用户信息
        getUserInfo();
    }

    render () {
        const { data } = this.props;
        const element = data.isAuthenticated ? this.renderUserWidget() : this.renderLogin();

        return (
            <li className={ `${this.prefixCls}-item` }>
                { element }
            </li>
        )
    }

    private renderUserWidget() {
        const { data, logout } = this.props;

        const menu = (
            <Menu onClick = { this.handlerMenuClick }>
                <Menu.Item key="0">
                    <a href="">我的资料</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" onClick={ logout }>退出</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={ menu } trigger={ ['click'] }>
                <a className="ant-dropdown-link" href="#">
                    { data.nickName }
                    <Icon type="down" />
                </a>
            </Dropdown>
        )
    }

    private renderLogin() {
        return (
            <div className={ `${this.prefixCls}-login` }>
                {/* <a href="/signin">登陆/注册</a> */}
                <a href="javascript: void(0)" onClick={ this.login }>登陆/注册</a>
            </div>
        )
    }

    private handlerMenuClick(params) {
        const { logout } = this.props;
        const { item, key, keyPath } = params;

        console.log('I want to see params =======> ', params);
        if (key === '3') {
            logout();
        }
    }

    /**
     * 显示登陆框
     */
    private login() {
        const { showLogin } = this.props;

        showLogin();
    }
}
