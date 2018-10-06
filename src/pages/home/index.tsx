import * as React from 'react';
import HomeView from './containers/homeContainer';
import reducer from './modules/homeModules';
import Layout from '../../components/Layout';

const ContainerWrapper = (props: { store: any }) => {
    const { store } = props;

    store.injectReducer({
        key: 'HomeView',
        reducer,
    });

    return (
        <Layout>
            <HomeView />
        </Layout>
    )
}

export default ContainerWrapper;
