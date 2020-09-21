/**
 * 树选择控件
 */
import React from 'react';
import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;

interface SelectTreeFieldProps {
    label?: string;
    value?: string;
    placeholder?: string;
    allowClear?: boolean;
    onChange?: (value) => void;
}

class SelectTreeField extends React.Component<SelectTreeFieldProps, any> {
    prefixCls = 'aladin-select-tree-field'

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: props.value ? props.value : ''
        }
    }

    componentWillReceiveProps(nextProps: SelectTreeFieldProps) {
        const { value } = nextProps;

        this.setState({
            value
        })
    }

    render() {
        const { label, placeholder } = this.props;
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
                <TreeSelect
                    // className={`${this.prefixCls}-value aladin-field-value`}
                    // style={{ width: 180 }}
                    // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    // onChange={this.onChange}
                    // value={value}
                    // placeholder={placeholder}
                    // allowClear
                    // multiple
                >
                    <TreeNode value="parent 1" key="0-1">
                        <TreeNode value="parent 1-0" key="0-1-1">
                            <TreeNode value="leaf1" key="random" />
                            <TreeNode value="leaf2" key="random1" />
                        </TreeNode>
                        <TreeNode value="parent 1-1" key="random2">
                            <TreeNode 
                                value="sss" 
                                // title={<b style={{ color: '#08c' }}>sss</b>} 
                                key="random3" 
                            />
                        </TreeNode>
                    </TreeNode>
                </TreeSelect>
            </div>
        )
    }

    onChange = (value, label, extra) => {
        const { onChange } = this.props;

        this.setState({
            value
        });

        if (onChange) {
            onChange(value);
        }
    }
}

export default SelectTreeField;
