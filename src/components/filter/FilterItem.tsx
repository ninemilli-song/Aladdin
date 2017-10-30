/**
 * 会计制度相关过滤条件组件
 */
import * as React from 'react';
// import { Row, Col } from 'antd';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Tag = require('antd/lib/tag');
const { CheckableTag } = Tag;
import './style.scss';

type FilterOptions = {
    label: string,
    value: string,
    checked: boolean,
}

export interface FilterItemProps {
    prefixCls?: string,
    label?: string,
    options?: Array<FilterOptions>,
}

export default class FilterItem extends React.Component<FilterItemProps, any> {

    static defaultProps = {
        prefixCls: 'default',
        label: 'no-label',
        options: [
            {
                label: '选项1',
                value: 'option1'
            }
        ]
    }

    render() {
        const {prefixCls, label} = this.props;

        return (
            <div className={`${prefixCls}-filter-item`}>
                <Row gutter={8}>
                    <Col span={4}>
                        {label}
                    </Col>
                    <Col span={20}>
                        {this.renderOpts()}
                    </Col>
                </Row>
            </div>
        )
    }

    renderOpts() {
        const { options } = this.props;

        const optsWidgets = [];

        options.forEach((item) => {
            optsWidgets.push(
                <CheckableTag 
                    key={item.value}
                    checked={item.checked}
                >
                    {item.label}
                </CheckableTag>
            );
        });

        return optsWidgets;
    }
}
