/**
 * Refer Component for tree
 */
import * as React from 'react';
import { TreeSelect } from 'antd';
import * as classNames from 'classnames';

interface TreeProps {
    data: any;  // tree data source
    values?: string | string[]; // selected value of the tree node
    onChange?: (value: string[]) => void;
    placeholder?: string;
    prefixCls?: string;
    className?: string;
}

export default class Tree extends React.Component<TreeProps, any> {

    static defaultProps = {
        prefixCls: 'tree-refer',
    }

    constructor (props, context) {
        super(props, context);

        this.state = {
            values: [],
        }
    }

    render() {
        const { placeholder, prefixCls, className } = this.props;
        const treeData = this.preprocessData();

        const { values } = this.state;
        const cls = classNames(prefixCls, className);
        return (
            <div className= { cls }>
                <TreeSelect
                    showSearch
                    allowClear
                    style = {{ width: 200 }}
                    value = { values }
                    dropdownStyle = {{ maxHeight: 400, overflow: 'auto' }}
                    treeData = { treeData }
                    placeholder = { placeholder || '选择分类' }
                    treeDefaultExpandAll
                    showCheckedStrategy = "SHOW_PARENT"
                    onChange = { this.onChange }
                />
            </div>
        )
    }

    private onSelect = (value) => {
        const { onChange, data } = this.props;
        console.log('tree selected node -----------> ', value);

        // Set Selected values
        this.setState({
            values: value,
        })

        let ids = [];
        if (value) {
            ids = data.toJS().filter((item) => {
                return value === item.name;
            }).map((v) => {
                return v.id;
            });
        }

        console.log('tree selected ids -----------> ', ids);

        // Invoke callback
        onChange(ids);
    }

    private onChange = (value = null) => {
        console.log('onSearch value -------> ', value);
        this.onSelect(value);
    }

    // Transfer Origin Data to Tree Data
    private preprocessData = () => {
        const { data } = this.props;
        const treeData = [];

        // 过滤出一级节点
        const childData = [];
        data.forEach((item) => {
            const node = item.toJS();
                node.value = node.name;
                node.label = node.name;
                node.key = node.id;
            if (!node.parentId || node.parentId === '0') {
                treeData.push(node);
            } else {
                childData.push(node);
            }
        });

        const loopLeaf = (rootData, childDataArr) => {
            const nRootData = [], nChildData = [];

            rootData.forEach((rootDataItem) => {
                childDataArr.forEach((childDataItem) => {
                    if (childDataItem.parentId === rootDataItem.id) {
                        if (rootDataItem.children) {
                            rootDataItem.children.push(childDataItem);
                        } else {
                            rootDataItem.children = [childDataItem];
                        }
                        nRootData.push(childDataItem);
                    } else if (nChildData.indexOf(childDataItem) !== -1) {
                        nChildData.push(childDataItem);
                    }
                });
            });

            if (nChildData.length > 0) {
                loopLeaf(nRootData, nChildData);
            }
        }

        loopLeaf(treeData, childData);

        return treeData;
    }
}
