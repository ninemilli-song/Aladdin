/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { connect } from 'react-redux'
import { Spin } from 'antd';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

interface LoadingProps {
    prefix?: string;
    children?: any;
    visible?: any;
}

@connect(
    store => (
        {
            visible: store.loading,
        }
    )
)
export default class Loading extends React.Component<LoadingProps, any> {
    static defaultProps: LoadingProps = {
        prefix: 'app-loading',
    }

    render () {
        const { children, visible, prefix } = this.props;
        const date = new Date();

        console.log('Loading visible is: ', visible);

        return (
            visible ?
            (<AutoSizer>
                {
                    ({ width, height }) => (
                        <div className={ prefix }>
                            <div className={ `${prefix}-mask` }></div>
                            <span className={ `${prefix}-spin-anchor` }>
                                <div className={ `${prefix}-spin-wrapper` }>
                                    <Spin spinning={ visible} delay={ 10 }>
                                        { children }
                                    </Spin>
                                </div>
                            </span>

                        </div>
                    )
                }
            </AutoSizer>) : null
        )
    }
}
