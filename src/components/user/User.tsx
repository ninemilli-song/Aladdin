/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import { connect } from 'react-redux';
import './style.scss';
import { logout } from '../../actions/user';
import { autobind } from 'core-decorators';

interface ComponentProps {
    logout?: Function;
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
            }
        }
    )
)
@autobind
export default class Component extends React.Component<ComponentProps, any> {

    prefixCls = 'nav-user';

    constructor(props, context) {
        super(props, context);
    }

    render () {
        const { data, logout } = this.props;
        
        const menu = (
            <Menu onClick = { this.handlerMenuClick }>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" onClick={ logout }>退出</Menu.Item>
            </Menu>
        );

        return (
            <li className={ `${this.prefixCls}-item` }>
                <Dropdown overlay={ menu } trigger={ ['click'] }>
                    <a className="ant-dropdown-link" href="#">
                        { data.name }
                        <Icon type="down" />
                    </a>
                </Dropdown>
            </li>
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
}
