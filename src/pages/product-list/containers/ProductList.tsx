import * as React from 'react';
import { Row, Col } from 'antd';
import AppTitle from '../../../components/page-components/AppTitle';
import AppBody from '../../../components/page-components/AppBody';

class ProductList extends React.Component<any, any> {
    prefixCls = 'product-list';

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className={`${this.prefixCls}`}>
                <AppTitle
                    name="商品目录"
                />
                <AppBody>
                    <div className={`${this.prefixCls}-body`}>
                        <div className={`${this.prefixCls}-filter`}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    a
                                </Col>
                                <Col span={8}>
                                    b
                                </Col>
                                <Col span={8}>
                                    c
                                </Col>
                            </Row>
                        </div>
                        <div className={`${this.prefixCls}-table`}></div>
                    </div>
                </AppBody>
            </div>
        )
    }
}

export default ProductList;
