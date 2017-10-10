import * as React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ui from 'redux-ui';
import Loading from '../../components/loading';
import GlobalInfo from '../../components/global-info';

const Block = require('react-blocks');

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
                                <a 
                                    href="#/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    首页
                                </a>
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
