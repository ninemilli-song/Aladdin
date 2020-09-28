import * as React from 'react';
import { Row, Col } from 'antd';
import AppTitle from '../../../components/page-components/AppTitle';
import AppBody from '../../../components/page-components/AppBody';
import InputField from '../../../components/fields/InputField';
import '../assets/index';
import SelectTreeField from '../../../components/fields/SelectTreeField';
import MoneyField from '../../../components/fields/MoneyField';

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
                                    <InputField
                                        label="商品名称或编码"
                                        placeholder="请输入名称或编码"
                                        allowClear
                                    />
                                </Col>
                                <Col span={8}>
                                    <SelectTreeField
                                        label="商品分类"
                                        placeholder="请选择商品分类"
                                        allowClear
                                    />
                                </Col>
                                <Col span={8}>
                                    <MoneyField
                                        label="价格区间"
                                        isRange
                                    />
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
