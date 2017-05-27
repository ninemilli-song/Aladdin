/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { Spin } from 'antd';
import ui from 'redux-ui';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

interface LoadingProps {
    prefix?: string;
    children?: any;
    ui?: any;
}

@ui({
    key: 'loading',
    persist: true,
    state: {
        showLoading: false,
    },
})
export default class Loading extends React.Component<LoadingProps, any> {
    static defaultProps: LoadingProps = {
        prefix: 'app-loading',
    }

    render () {
        const { children, ui, prefix } = this.props;
        return (
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <div className={ prefix } style={{ width: width, height: height }}>
                            <div className={ `${prefix}-mask` }></div>
                            <span className={ `${prefix}-spin-anchor` }>
                                <div className={ `${prefix}-spin-wrapper` }>
                                    <Spin spinning={ true } delay={ 100 }>
                                        { children }
                                    </Spin>
                                </div>
                            </span>

                        </div>
                    )
                }
            </AutoSizer>
        )
    }
}
