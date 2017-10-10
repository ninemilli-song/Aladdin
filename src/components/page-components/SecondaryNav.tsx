/**
 * 二级导航栏
 */
import * as React from 'react';
// import { Menu, Breadcrumb, Icon, Input } from 'antd';
const Icon = require('antd/lib/icon');
const Menu = require('antd/lib/menu');
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Input = require('antd/lib/input');
const Search = Input.Search;

export default class SecondaryNav extends React.Component<any, any> {
    render() {
        return (
            <div className="layout-nav-secondary-wrapper">
                <div className="layout-nav-secondary">
                    <div className="menu">
                        <Menu
                            mode="horizontal"
                        >
                            <Menu.Item key="training">
                                <a href="#/">
                                    <Icon type="mail" />
                                    实战
                                </a>
                            </Menu.Item>
                            <Menu.Item key="news" disabled>
                                <Icon type="appstore" />
                                动态
                            </Menu.Item>
                            <Menu.Item key="account">
                                <a href="#/warehouse">
                                    会计
                                </a>
                            </Menu.Item>
                            <Menu.Item key="finance">
                                <Icon type="pay-circle" />
                                财管
                            </Menu.Item>
                            <Menu.Item key="tax">
                                <Icon type="switcher" />
                                税务
                            </Menu.Item>
                            <Menu.Item key="work">
                                <Icon type="tool" />
                                工作
                            </Menu.Item>
                            <Menu.Item key="team">
                                <Icon type="team" />
                                圈子
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="search-box">
                        <Search
                            placeholder="input search text"
                            style={{ width: 200 }}
                            onSearch={value => console.log(value)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
