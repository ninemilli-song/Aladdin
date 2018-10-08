import * as React from 'react';
import reducer from './modules/modules';
import View from './containers/container';
import Layout from '../../components/Layout';

const ComponentWrapper = (props: {store: any}) => {
    const { store } = props;

    store.injectReducer({
        key: 'AccountingHelp',
        reducer,
    })

    return (
        <Layout>
            <View />
        </Layout>
    )
};

export default ComponentWrapper;
