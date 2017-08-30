import * as React from 'react';
import { Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ui from 'redux-ui';
import Loading from '../../components/loading';
import GlobalInfo from '../../components/global-info';

const Block = require('react-blocks');
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@ui({
    key: 'AppLayout',
    persist: true,
})
class Layout extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={''}>
                <div className="">
                    <div className="layout-nav-primary-wrapper">
                        <div className="info">
                            <GlobalInfo />
                        </div>
                        <ul className="menu">
                            <li className="menu-item">
                                <a>首页</a>
                            </li>
                            <li className="menu-item">
                                <a>蛙泳</a>
                            </li>
                            <li className="menu-item">
                                <a>自由泳</a>
                            </li>
                            <li className="menu-item">
                                <a>蝶泳</a>
                            </li>
                        </ul>
                    </div>
                    {
                        this.props.children
                    }
                </div>
                <Loading />
            </div>
        );
    }
}

export default Layout;
