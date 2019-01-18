/**
 * 钱输入控件
 */
import React from 'react';
import { InputNumber } from 'antd';

interface MoneyFieldProps {
    label?: string;
    value?: number; // 当 isRange === true, 此属性无效, 请使用minValue, maxValue
    minValue?: number; // 当 isRange === true, 此属性有效
    maxValue?: number; // 当 isRange === true, 此属性有效
    isRange?: boolean; // 是否为区间
    placeholder?: string;
    onChange?: (value) => void;
}

class MoneyField extends React.Component<MoneyFieldProps, any> {
    prefixCls = 'aladin-select-tree-field'

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value ? props.value : ''
        }
    }

    componentWillReceiveProps(nextProps: MoneyFieldProps) {
        const { value, minValue, maxValue } = nextProps;

        this.setState({
            value,
            minValue, 
            maxValue
        })
    }

    render() {
        const { label, placeholder, isRange } = this.props;
        const { value, minValue, maxValue } = this.state;

        return (
            <div className={`${this.prefixCls} aladin-field`}>
                {
                    label ? (
                        <span className={`${this.prefixCls}-label aladin-field-label`}>
                            { label }
                        </span>
                    ) : null
                }
                {
                    isRange ? (
                        <div className={`${this.prefixCls}-range aladin-field-value`}>
                            <InputNumber
                                className={`${this.prefixCls}-value`}
                                style={{ width: 80 }}
                                onChange={this.onMinChange}
                                value={minValue}
                                placeholder={placeholder}
                            />
                            <span className="aladin-join-input">-</span>
                            <InputNumber
                                className={`${this.prefixCls}-value`}
                                style={{ width: 80 }}
                                onChange={this.onMaxChange}
                                value={maxValue}
                                placeholder={placeholder}
                            />
                        </div>
                    ) : (
                        <InputNumber
                            className={`${this.prefixCls}-value aladin-field-value`}
                            style={{ width: 120 }}
                            onChange={this.onChange}
                            value={value}
                            placeholder={placeholder}
                        />
                    )
                }
            </div>
        )
    }

    /**
     * 区间最小值发生改变
     */
    onMinChange = (value) => {
        this.setState({
            minValue: value
        });

        this.onChange()
    }

    /**
     * 区间最大值发生改变
     */
    onMaxChange = (value) => {
        this.setState({
            maxValue: value
        });

        this.onChange()
    }

    /**
     * 非区间的情况下数值发生的改变
     */
    onValueChange = (value) => {
        this.setState({
            value: value
        });

        this.onChange()
    }

    onChange = () => {
        const { onChange } = this.props;
        const { minValue, maxValue, value } = this.state;

        if (onChange) {
            onChange({
                minValue,
                maxValue,
                value
            });
        }
    }
}

export default MoneyField;
