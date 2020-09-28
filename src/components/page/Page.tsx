/**
 * Page Hoc
 * Pass 
 */
import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getUserInfo, logout } from '../../actions/user';
import SiderNav from '../page-components/SiderNav';
import { SET_SELECTED_MENU_ID } from '../../actions/menus';
import './style/index';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const {
    Header, Content, Footer, Sider,
} = Layout;

@connect(store => (
    {
        data: store.menus,
        userInfo: store.userInfo
    }
), dispatch => (
    {
        getUserInfo: () => {
            dispatch(getUserInfo());
        },
        logout: () => {
            dispatch(logout());
        },
        setSelectedMenu: (selectedMenuId) => {
            dispatch({
                type: SET_SELECTED_MENU_ID,
                payload: selectedMenuId
            })
        }
    }
))
class Page extends React.Component<any, any> {

    prefixCls = 's-m-page';

    constructor(props, context) {
        super(props, context);

        this.state = {
            collapsed: false
        };
    }

    render() {
        const { data } = this.props;
        const { selectedMenuId, menus } = data;
        let selectedMenu, selectedSubMenu;

        return (
            <Layout className={`${this.prefixCls}`}>
                <Sider 
                    className={`${this.prefixCls}-sider`}
                    trigger= { null }
                    collapsible
                    collapsed={this.state.collapsed}
                    theme="light"
                >
                    <div className="logo" />
                    <SiderNav
                        menus = { menus }
                    />
                    <div className="footer">
                        {
                            this.state.collapsed ? (
                                <MenuUnfoldOutlined
                                    className="trigger"
                                    onClick={this.onToggleSider}
                                />
                            ) : (
                                <MenuFoldOutlined
                                    className="trigger"
                                    onClick={this.onToggleSider}
                                />
                            )
                        }
                    </div>
                </Sider>
                <div 
                    className={classnames(
                        `${this.prefixCls}-content`, 
                        {
                            'collapsed': this.state.collapsed,
                            'unCollapsed': !this.state.collapsed
                        }
                    )}
                >
                    <Header 
                        className="header"
                    >
                    </Header>
                    <Content 
                        className="content"
                    >
                        {
                            this.props.children || (
                                <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                                ...
                                <br />
                                Really
                                <br />...<br />...<br />...<br />
                                long
                                <br />...<br />...<br />...<br />...<br />...<br />...
                                <br />...<br />...<br />...<br />...<br />...<br />...
                                <br />...<br />...<br />...<br />...<br />...<br />...
                                <br />...<br />...<br />...<br />...<br />...<br />...
                                <br />...<br />...<br />...<br />...<br />...<br />...
                                <br />...<br />...<br />...<br />...<br />...<br />...
                                <br />...<br />...<br />...<br />...<br />...<br />
                                content
                                </div>
                            )
                        }
                    </Content>
                    <Footer 
                        className={`${this.prefixCls}-content-footer`}
                    >
                        <span>
                            Ninemilli ©2018 Created by ninemilli.song
                        </span>
                    </Footer>
                </div>
            </Layout>
        )
    }

    componentDidMount() {
        // const { location, data, setSelectedMenu } = this.props;
        // const { menus, subMenus } = data;
        // // 从 react-router 注入的 location对象中获取当前路径
        // const { pathname } = location;

        // // 从二级菜单中查找pathname对应的当前菜单
        // let selectedMenu = subMenus.find((subMenu) => {
        //     return subMenu.path === pathname;
        // });

        // // 如果当前路径不在二级菜单中则查找一级菜单
        // if (!selectedMenu) {
        //     selectedMenu = menus.find(menu => {
        //         return menu.path === pathname;
        //     });
        // }

        // setSelectedMenu(selectedMenu ? selectedMenu.id : '')
    }

    onSelect = (item, selectedMenuId) => {
        // const { setSelectedMenu, data } = this.props;
        // const { menus, subMenus } = data;
        // let selectedMenu, selectedSubMenu;

        // // 先判断点击是否为第一级菜单
        // selectedMenu = menus.find((menu) => {
        //     return menu.id === selectedMenuId;
        // })

        // // 如果是第一级菜单，则默认选中二级菜单的第一项
        // if (selectedMenu) {
        //     const curSubMenus = subMenus.filter((submenu) => {
        //         return submenu.parent === selectedMenuId;
        //     });

        //     selectedSubMenu = curSubMenus[0];
        // }

        // // 如果是存在二级菜单，则使用子菜单id为选中项，否则以传入的id为主
        // setSelectedMenu(selectedSubMenu ? selectedSubMenu.id : selectedMenuId);
    }

    onToggleSider = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
}

export default Page;
