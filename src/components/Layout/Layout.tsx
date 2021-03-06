import * as React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import ui from 'redux-ui';
import Loading from '../loading';
import { PrimaryNav, Footer } from '../page-components';
import './assets/layout.scss';
import Login from '../login/Login';


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
                    <Login />
                </div>
                {/* <Loading /> */}
            </div>
        )
    }
}

export default Layout;
