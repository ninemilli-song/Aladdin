/**
 * The Category Tree Component of Warehouse
 */
 import * as React from 'react';
 import { Tree } from 'antd';
 const TreeNode = Tree.TreeNode;

 export default class WarehouseCategoryTree extends React.Component<any, any> {

    static defaultProps = {
        prefix: 'kyou-warehouse-category',
        keys: [
            '0-0-0',
            '0-0-1',
        ]
    }

    constructor(props, context) {
        super(props, context);

        const keys = props.keys;

        this.state = {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
        }
    }

     render(): JSX.Element {
         return (
             <Tree className="myCls" showLine checkable
                defaultExpandedKeys={ this.state.defaultExpandedKeys }
                defaultSelectedKeys={ this.state.defaultSelectedKeys }
                defaultCheckedKeys={ this.state.defaultCheckedKeys }
                onSelect={ this.onSelect }
                onCheck={ this.onCheck }
              >
                <TreeNode title="parent 1" key="0-0">
                  <TreeNode title="parent 1-0" key="0-0-0" disabled>
                    <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                    <TreeNode title="leaf" key="0-0-0-1" />
                  </TreeNode>
                  <TreeNode title="parent 1-1" key="0-0-1">
                    <TreeNode title={
                        <span style={{ color: '#08c' }}>sss</span>
                    } key="0-0-1-0" />
                  </TreeNode>
                </TreeNode>
              </Tree>
         )
     }

     onSelect(info) {
        console.log('selected', info);
     }

     onCheck(info) {
        console.log('onCheck', info);
     }
 }
