/**
 * 侧边菜单
 */
import * as React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

interface SliderNavProps {
    menus: Array<any>
}

class SiderNav extends React.Component<SliderNavProps, any> {

    prefixCls = 's-m-slider-nav'

    render() {
        const { menus } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 90 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {
                        menus.map(item => (
                            <Menu.Item key={ item.id }>
                                { item.label }
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        )
    }

    handleClick = () => {

    }
}

export default SiderNav;
