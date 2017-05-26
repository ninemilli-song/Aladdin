/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { Spin } from 'antd';
import ui from 'redux-ui';

@ui({
    key: 'loading',
    state: {
        showLoading: false,
    },
})
export default class Loading extends React.Component<any, any> {
    render () {
        const { child, ui } = this.props;
        return (
            <Spin spinning={ui.showLoading} delay={100}>
                { child }
            </Spin>
        )
    }
}
