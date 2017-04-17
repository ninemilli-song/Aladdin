/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { Tree, Input, Button } from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

interface CategoryProps {
    data?: Array<any>;
}

export default class Category extends React.Component<CategoryProps, any> {
    static defaultProps = {
        data: [
            {
                parentId: '0',
                id: '1',
                name: 'a',
            },
            {
                parentId: '0',
                id: '2',
                name: 'b',
            },
            {
                parentId: '0',
                id: '3',
                name: 'c',
            },
            {
                parentId: '1',
                id: '4',
                name: 'aa',
            },
            {
                parentId: '2',
                id: '5',
                name: 'ba',
            },
        ],
    }

    gData: any

    constructor(props, context) {
        super(props, context);

        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        }

        this.gData = this.preprocessData();
    }

    componentWillReceiveProps(nextProps) {
        this.gData = this.preprocessData();
    }

    render() {
        const gData = this.gData;

        const { searchValue, expandedKeys, autoExpandParent } = this.state;

        const loop = data => data.map((item) => {
            const index = item.name.search(searchValue);
            const beforeStr = item.name.substr(0, index);
            const afterStr = item.name.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    { beforeStr }
                        <span style={{ color: '#f50' }}>
                            { searchValue }
                        </span>
                    { afterStr }
                </span>
            ) : <span>{ item.name }</span>;
            if (item.child) {
                return (
                    <TreeNode
                        key={ item.id }
                        title={ title }>
                        { loop(item.child) }
                    </TreeNode>
                );
            }
            return <TreeNode key={ item.name } title={ title } />;
        });

        return (
            <div>
                <Search
                    placeholder="Search"
                    onChange={ this.onChange } />
                <Tree
                  onExpand={ this.onExpand }
                  expandedKeys={ expandedKeys }
                  autoExpandParent={ autoExpandParent }
                >
                    { loop(gData) }
                </Tree>
                <Button
                    type="primary"
                    onClick={ this.createCategory }
                >创建分类</Button>
            </div>
        );
    }

    private onChange = (e) => {
        const { data } = this.props;
        const value = e.target.value;
        const gData = this.gData;

        const expandedKeys = data.map((item, index) => {
            if (item.name.indexOf(value) > -1) {
                return this.getParentKey(item.id, gData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);

        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    private onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    private preprocessData = () => {
        const { data } = this.props;
        const treeData = [];

        // 过滤出一级节点
        const childData = [];
        data.forEach((item) => {
            if (!item.parentId || item.parentId === '0') {
                treeData.push(item);
            } else {
                childData.push(item);
            }
        });

        const loopLeaf = (rootData, childData) => {
            const nRootData = [], nChildData = [];

            rootData.forEach((rootDataItem) => {
                childData.forEach((childDataItem) => {
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

    private getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.child) {
                if (node.child.some(item => item.id === key)) {
                    parentKey = node.id;
                } else if (this.getParentKey(key, node.child)) {
                    parentKey = this.getParentKey(key, node.child);
                }
            }
        }
        return parentKey;
    }

    // 创建分类
    private createCategory = () => {
        // todo: 跳转通用分类编辑页面
    }

    // 编辑分类
    private editCategory = () => {
        // todo: 跳转通用分类编辑页面
    }
}
