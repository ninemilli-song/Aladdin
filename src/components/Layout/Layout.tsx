import * as React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import ui from 'redux-ui';
import Loading from '../loading';
import { PrimaryNav, Footer } from '../page-components';
import './assets/layout.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Signin from '../../routes/signin/containers/Signin';


// @ui({
//     key: 'AppLayout',
//     persist: true,
// })
class Layout extends React.Component<any, any> {

    prefixCls = 'layout';

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
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
        )
    }
}

export default Layout;
