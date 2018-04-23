import * as React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import ui from 'redux-ui';
import Loading from '../loading';
import { PrimaryNav, Footer } from '../page-components';
import './assets/layout.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Signin from '../../routes/signin/containers/Signin';

interface LayoutProps {
    isAuthenticated: boolean;               // 用户是否已认证
}

// @ui({
//     key: 'AppLayout',
//     persist: true,
// })
@connect(
    store => {
        return {
            isAuthenticated: store.userInfo.isAuthenticated
        }
    }
)
class Layout extends React.Component<any, any> {

    prefixCls = 'layout';

    constructor(props: any) {
        super(props);
    }

    render() {
        const { isAuthenticated } = this.props;

        return isAuthenticated ? (
            <div className={ this.prefixCls }>
                <div className={ `${this.prefixCls}-wrapper` }>
                    <PrimaryNav />
                    <div className={ `${this.prefixCls}-body` }>
                        {
                            this.props.children
                        }
                        <Footer />
                    </div>
                </div>
                <Loading />
            </div>
        ) : (
            <Signin />
        );
    }
}

export default Layout;
