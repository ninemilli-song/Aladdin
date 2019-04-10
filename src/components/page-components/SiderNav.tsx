/**
 * 侧边菜单
 */
import * as React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import './assets/sidernav.scss';

interface SliderNavProps {
    menus: Array<any>,
    selectedMenuId?: string,
    onSelect?: (item, key) => void
}

class SiderNav extends React.Component<SliderNavProps, any> {

    prefixCls = 's-m-slider-nav'

    render() {
        const { menus, selectedMenuId } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <Menu 
                    theme="light" 
                    mode="inline" 
                    defaultSelectedKeys={['1']}
                    onClick={this.handleClick}
                    selectedKeys={[selectedMenuId]}
                >
                    {
                        menus.map(item => {
                            return item.sub && item.sub.length > 0 ? (
                                <SubMenu
                                    key={ item.id }
                                    title={
                                        <span>
                                            <Icon type={ item.icon } />
                                            <span>{ item.label }</span>
                                        </span>
                                    }
                                >
                                    {
                                        item.sub.map(subItem => (
                                            <Menu.Item 
                                                key={ subItem.id }
                                            >
                                                <Link to={ subItem.path || '' }>
                                                    { subItem.label }
                                                </Link>
                                            </Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            ) : (
                                <Menu.Item key={ item.id }>
                                    <Icon type={ item.icon } />
                                    <span>
                                        <Link to={ item.path || '' }>
                                            { item.label }
                                        </Link>
                                    </span>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }

    handleClick = ({ key, item }) => {
        const { onSelect } = this.props;

        if (onSelect) {
            onSelect(item, key);
        }
    }
}

export default SiderNav;
