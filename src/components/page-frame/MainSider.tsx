/**
 * 两列布局，左侧主区域 右侧边栏区域
 */
import * as React from 'react';
import { Row, Col } from 'antd';

export interface MainSiderProps {
    prefixCls?: string,
}

export default class MainSider<T extends MainSiderProps> extends React.Component<T, any> {
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
                        {this.renderMain()}
                    </Col>
                    <Col span={8}>
                        {this.renderSider()}
                    </Col>
                </Row>
            </div>
        )
    }

    protected renderMain(): JSX.Element | any {
    }

    protected renderSider(): JSX.Element | any {
    }
}
