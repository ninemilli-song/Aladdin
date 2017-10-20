/**
 * 两列布局，左侧主区域 右侧边栏区域
 */
import * as React from 'react';
import { Row, Col } from 'antd';

interface MainSiderProps {
    prefixCls?: string,
    renderMain: () => JSX.Element,
    renderSider: () => JSX.Element,
}

export default class MainSider extends React.Component<MainSiderProps, any> {

    static defaultProps = {
        prefixCls: 'default'
    }

    render() {
        const { renderMain, renderSider, prefixCls } = this.props;

        return (
            <div className={ `${prefixCls}-main-sider` }>
                <Row gutter={8}>
                    <Col span={16}>
                        {renderMain()}
                    </Col>
                    <Col span={8}>
                        {renderSider()}
                    </Col>
                </Row>
            </div>
        )
    }
}
