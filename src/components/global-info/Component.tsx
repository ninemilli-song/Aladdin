/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import { IAction } from './module';

interface ComponentProps {
    action: IAction;
    data: any;
}

export default class Component extends React.Component<ComponentProps, any> {

    constructor(props, context) {
        super(props, context);

        this.init();
    }

    componentWillReceiveProps(nextProps) {
        // this.init();
    }

    private init = () => {
        const {action} = this.props;

        action.getUserInfo();
    }

    render () {
        const { data } = this.props;
        console.log('global - info -------------> ', this.props);
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3d menu item</Menu.Item>
            </Menu>
        );

        return (
            <ul className="info">
                <li className="menu-item">消息</li>
                <li className="menu-item">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            { data.name }
                            <Icon type="down" />
                        </a>
                    </Dropdown>
                </li>
            </ul>
        )
    }
}
