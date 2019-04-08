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
import './style/index.scss';
import { Layout, Menu, Icon } from 'antd';
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

    render() {
        const { data } = this.props;
        const { selectedMenuId, menus } = data;
        let selectedMenu, selectedSubMenu;

        // // 查找选中的二级菜单
        // selectedSubMenu = subMenus.find((item) => {
        //     return item.id === selectedMenuId;
        // });

        // // 根据选中的二级菜单，查找一级菜单
        // // 如果二级菜单不存在，则直接查找一级菜单
        // let parentMenuId = selectedSubMenu ? selectedSubMenu.parent : selectedMenuId;
        // selectedMenu = menus.find((item) => {
        //     return item.id === parentMenuId;
        // });

        // const pageCls = classnames({
        //     [`${this.prefixCls}-page`]: true,
        //     [`${this.prefixCls}-page-has-sub`]: selectedSubMenu
        // })

        return (
            // <div className={`${this.prefixCls}`}>
            //     <div className={`${this.prefixCls}-menus`}>
            //         <SiderNav 
            //             menus={menus}
            //             selectedMenuId={selectedMenu ? selectedMenu.id : '1'}
            //             onSelect = { this.onSelect }
            //         />
            //     </div>
            //     {
            //         selectedSubMenu ? (
            //             <div className={`${this.prefixCls}-menus-sub`}>
            //                 <SiderNav 
            //                     menus={subMenus}
            //                     selectedMenuId={selectedSubMenu.id}
            //                     onSelect={ this.onSelect }
            //                 />
            //             </div>
            //         ) : null
            //     }
            //     <div className={pageCls}>
            //         {
            //             this.props.children
            //         }
            //     </div>
            // </div>
            <Layout className={`${this.prefixCls}`}>
                <Sider 
                    className={`${this.prefixCls}-sider`}
                    theme="light"
                    style={{
                        height: '100vh', 
                        position: 'fixed', 
                        left: 0,
                    }}
                >
                    <div className="logo" />
                    <SiderNav
                        menus = { menus }
                    />
                    <div className='footer'></div>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
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
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ninemilli ©2018 Created by Ninemilli.Song
                    </Footer>
                </Layout>
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
}

export default Page;
