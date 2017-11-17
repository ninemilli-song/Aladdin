/**
 * 两列布局，左侧主区域 右侧边栏区域
 */
import * as React from 'react';
import { Row, Col } from 'antd';

export interface MainSiderProps {
    prefixCls?: string,
}

export default class MainSider<T extends MainSiderProps> extends React.Component<T, any> {

    static defaultProps = {
        prefixCls: 'default'
    }

    render() {
        const { prefixCls } = this.props;

        return (
            <div className={ `${prefixCls}-main-sider` }>
                <Row gutter={8}>
                    <Col span={18}>
                        {this.renderMain()}
                    </Col>
                    <Col span={6}>
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
