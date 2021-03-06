/**
 * 会计制度相关过滤条件组件
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
import { Row, Col, Tag } from 'antd';
const { CheckableTag } = Tag;
import './style.scss';

export type FilterOptions = {
    id: number,
    label: string,
    value: string,
    checked: boolean,
}

export interface FilterItemProps {
    label?: string,
    options?: Array<FilterOptions>,
    onChange?: (item: FilterOptions) => void,
    selectedValue?: string, // 选中值
}

@autobind
export default class FilterItem extends React.Component<FilterItemProps, any> {

    static defaultProps = {
        label: 'no-label',
        options: [
            {
                label: '选项1',
                value: 'option1'
            }
        ]
    }

    render() {
        const {label} = this.props;

        return (
            <div className={`filter-item`}>
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
        const { options, selectedValue } = this.props;
        const optsWidgets = [];

        options.forEach((item, index) => {
            const checked = item.value === selectedValue ? true : false;

            optsWidgets.push(
                <CheckableTag 
                    key={ `${item.value}-${index}` }
                    checked={ checked }
                    onChange={ value => {
                        this.onChange(item, value)
                    } }
                >
                    { item.label }
                </CheckableTag>
            );
        });

        return optsWidgets;
    }

    onChange(item: FilterOptions, checked) {
        const {onChange} = this.props;

        if (onChange) {
            item.checked = checked;
            onChange(item);
        }
    }
}
