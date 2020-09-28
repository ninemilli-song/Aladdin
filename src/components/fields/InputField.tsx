/**
 * 普通输入组件
 * 包括：lable 普通输入框
 */
import React from 'react';
import { Input } from 'antd';
import './assets/index';

interface InputProps {
    label?: string;
    placeholder?: string;
    allowClear?: boolean;
    value?: string;
    onChange?: (value) => void;
}

class InputNormal extends React.Component<InputProps, any> {
    prefixCls = 'aladin-input-normal'

    constructor(props, context) {
        super(props, context);

        // 支持受控组件
        this.state = {
            value: props.value ? props.value : ''
        }
    }

    componentWillReceiveProps(nextProps: InputProps) {
        const { value } = nextProps;

        // 支持受控组件
        this.setState({
            value
        })
    }

    render() {
        const { label, placeholder, allowClear } = this.props;
        const { value } = this.state;

        return (
            <div className={`${this.prefixCls} aladin-field`}>
                {
                    label ? (
                        <span className={`${this.prefixCls}-label aladin-field-label`}>
                            { label }
                        </span>
                    ) : null
                }
                <Input
                    className={`${this.prefixCls}-value aladin-field-value`}
                    style={{ width: 180 }}
                    placeholder={placeholder}
                    allowClear={allowClear}
                    value={value}
                    onChange={this.onChange}
                />
            </div>
        )
    }

    onChange = (e) => {
        const {onChange} = this.props;

        this.setState({
            value: e.target.value
        })

        if (onChange) {
            onChange(e);
        }
    }
}

export default InputNormal;
