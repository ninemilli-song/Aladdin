/**
 * Page Hoc
 * Pass 
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { getUserInfo, logout } from '../../actions/user';
import SiderNav from '../page-components/SiderNav';
import './style/index.scss';

interface PageProps {
    menus: Array<any>
}

@connect(store => (
    {
        menus: store.menus,
        userInfo: store.userInfo
    }
), dispatch => (
    {
        getUserInfo: () => {
            dispatch(getUserInfo());
        },
        logout: () => {
            dispatch(logout());
        }
    }
))
class Page extends React.Component<PageProps, any> {

    prefixCls = 's-m-page';

    render() {
        const { menus } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <div className={`${this.prefixCls}-sider-container`}>
                    <SiderNav 
                        menus={menus}
                    />
                </div>
                <div className={`${this.prefixCls}-page-container`}>
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default Page
