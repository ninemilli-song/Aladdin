/**
 * 二级导航栏
 */
import * as React from 'react';
const Icon = require('antd/lib/icon');
const Menu = require('antd/lib/menu');
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Input = require('antd/lib/input');
const Search = Input.Search;
import './assets/secondarynav.scss';

type MenuConfig = {
    label: string,
    key: string,
    icon: string
}

interface SecondaryNavProps {
    menuConfig?: Array<MenuConfig>,
    selected?: string;                  // The selected menu key
    hasSearch?: boolean,
    title?: string,
    onClick?: (item, key, keyPath) => void,
}

export default class SecondaryNav extends React.Component<SecondaryNavProps, any> {

    static defaultProps = {
        menuConfig: [],
        hasSearch: true
    }

    render() {
        return (
            <div className="nav-secondary-wrapper">
                <div className="nav-secondary">
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
        const { menuConfig, hasSearch, onClick, selected } = this.props;
        
        if (menuConfig && menuConfig.length > 0) {
            const menuItems = [];
            const selectedKeys = [];
            menuConfig.forEach((item) => {
                menuItems.push(
                    <Menu.Item key={item.key}>
                        <Icon type={item.icon} />
                        {item.label}
                    </Menu.Item>
                );

                if (selected && item.key === selected) {
                    selectedKeys.push(item.key);
                }
            })

            return (
                <div className="menu">
                    <Menu
                        mode="horizontal"
                        selectedKeys={ selectedKeys }
                        onClick={ onClick }
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
