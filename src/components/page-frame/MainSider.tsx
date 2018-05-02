/**
 * 两列布局，左侧主区域 右侧边栏区域
 */
import * as React from 'react';
import { Row, Col } from 'antd';
import './assets/mainSider.scss';

export interface MainSiderProps {
    prefixCls?: string;
    main?: JSX.Element;                                 // 主区域
    sider?: JSX.Element;                               // 侧边区域
}

// export default class MainSider<T extends MainSiderProps> extends React.Component<T, any> {
export default class MainSider extends React.Component<MainSiderProps, any> {
    // 子类可以定义自己的样式
    protected className: string;

    static defaultProps = {
        prefixCls: 'default'
    }

    render() {
        const { prefixCls } = this.props;

        return (
            <div className={ `${prefixCls}-main-sider ${this.className}` }>
                <Row gutter={8}>
                    <Col span={16}>
                        {this.renderMainWrapper()}
                    </Col>
                    <Col span={8}>
                        {this.renderSiderWrapper()}
                    </Col>
                </Row>
            </div>
        )
    }

    renderMainWrapper() {
        const { prefixCls, main } = this.props;

        return (
            <div className={ `${prefixCls}-main-wrapper` }>
                {
                    main
                }
            </div>
        )
    }

    renderSiderWrapper() {
        const { prefixCls, sider } = this.props;

        return (
            <div className={ `${prefixCls}-sider-wrapper` }>
                {
                    sider
                }
            </div>
        )
    }
}
