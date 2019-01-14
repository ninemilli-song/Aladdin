/**
 * 侧边菜单
 */
import * as React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

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
                    onClick={this.handleClick}
                    style={{ width: 90 }}
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedMenuId]}
                    mode="inline"
                >
                    {
                        menus.map(item => (
                            <Menu.Item key={ item.id }>
                                <Link to={ item.path || '' }>
                                    { item.label }
                                </Link>
                            </Menu.Item>
                        ))
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
