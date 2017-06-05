/**
 * Refer Component for tree
 */
import * as React from 'react';
import { TreeSelect } from 'antd';
import * as classNames from 'classnames';

interface TreeProps {
    data: any;  // tree data source
    selectedValue?: string; // selected value of the tree node
    onChange?: (value: string) => void;
    placeholder?: string;
    prefixCls?: string;
    className?: string;
}

export default class Tree extends React.Component<TreeProps, any> {

    static defaultProps = {
        prefixCls: 'tree-refer',
    }

    render() {
        const {selectedValue, placeholder, prefixCls, className} = this.props;
        const treeData = this.preprocessData();

        const cls = classNames(prefixCls, className);
        return (
            <div className= { cls }>
                <TreeSelect
                    showSearch
                    style = {{ width: 300 }}
                    value = {selectedValue}
                    dropdownStyle = {{ maxHeight: 400, overflow: 'auto' }}
                    treeData = {treeData}
                    placeholder = {placeholder || "Please select"}
                    treeDefaultExpandAll
                    multiple
                    treeCheckable
                    showCheckedStrategy = "SHOW_PARENT"
                    onChange = {this.onChange}
                />
            </div>
        )
    }

    private onChange = (value) => {
        // todo:
        const {onChange} = this.props;
        onChange(value);
    }

    // Transfer Origin Data to Tree Data
    private preprocessData = () => {
        const { data } = this.props;
        const treeData = [];

        // 过滤出一级节点
        const childData = [];
        data.forEach((item) => {
            const node = item.toJS();
                node.value = node.id;
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
                        if (rootDataItem.child) {
                            rootDataItem.child.push(childDataItem);
                        } else {
                            rootDataItem.child = [childDataItem];
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
