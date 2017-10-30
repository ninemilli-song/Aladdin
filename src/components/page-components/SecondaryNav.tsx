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

type MenuConfig = {
    label: string,
    key: string,
    icon: string,
}

interface SecondaryNavProps {
    menuConfig?: Array<MenuConfig>,
    hasSearch?: boolean,
    title?: string,
}

export default class SecondaryNav extends React.Component<SecondaryNavProps, any> {

    static defaultProps = {
        menuConfig: [],
        hasSearch: true
    }

    render() {
        return (
            <div className="layout-nav-secondary-wrapper">
                <div className="layout-nav-secondary">
                    {this.renderTitle()}
                    {this.renderMenu()}
                    {this.renderSearchBox()}
                </div>
            </div>
        )
    }

    renderTitle() {
        const {title} = this.props;
        return (
            <div className="title">
                <span>{title}</span>
            </div>
        )
    }

    renderMenu() {
        const { menuConfig, hasSearch } = this.props;
        
        if (menuConfig && menuConfig.length > 0) {
            const menuItems = [];
            menuConfig.forEach((item) => {
                menuItems.push(
                    <Menu.Item key={item.key}>
                        <Icon type={item.icon} />
                        {item.label}
                    </Menu.Item>
                );
            })

            return (
                <div className="menu">
                    <Menu
                        mode="horizontal"
                    >
                        {
                            menuItems
                        }
                    </Menu>
                </div>
            )
        } else {
            return null;
        }
    }

    renderSearchBox() {
        const { hasSearch } = this.props;

        if (hasSearch) {
            return (
                <div className="search-box">
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onSearch={value => console.log(value)}
                    />
                </div>
            )
        } else {
            return null;
        }
    }
}
