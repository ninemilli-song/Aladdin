import * as React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ui from 'redux-ui';
import Loading from '../loading';
import { PrimaryNav } from '../page-components';

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
                    <PrimaryNav />
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
