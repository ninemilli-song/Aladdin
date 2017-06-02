/**
 * Author: ninemilli.song
 */
import * as React from 'react';
import { List } from 'immutable';
import ButtonIcon from '../button-icon';
import { Tree, Input, Button } from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

interface CategoryProps {
    expand?: boolean;
    data: List<any>;
    height?: number;
    prefixCls?: string;
    onSelect?: (selectedKeys, e: any) => void;
    onFold?: (fold: boolean) => void;
}

const externalHeight = 50;

export default class Category extends React.Component<CategoryProps, any> {
    static defaultProps = {
        data: [],
        prefixCls: 'category',
        expand: true,
        onFold: () => {},
    }

    treeData: any

    constructor(props, context) {
        super(props, context);

        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        }
    }

    render() {
        const { prefixCls, expand } = this.props;

        return (
            <div className={ prefixCls }>
                {
                    expand ? this.renderCategory() : this.renderBlank()
                }
            </div>
        )
    }

    private renderCategory = () => {
        this.treeData = this.preprocessData();

        const { expandedKeys, autoExpandParent } = this.state;

        const { height, prefixCls, onSelect, expand } = this.props;

        return (
            <div>
                <div className={ `${prefixCls}-bar` }>
                    <Search
                        placeholder="Search"
                        onChange={ this.onChange } />
                    <ButtonIcon
                        icon='setting'
                        title='维护分类'
                        className='setting'
                        onClick={ this.createCategory }
                    />
                    <ButtonIcon
                        icon='left-square'
                        title='收起分类'
                        className='expand'
                        onClick={ this.onFold }
                    />
                </div>
                <div className={ `${prefixCls}-tree` } style={{ height: height - externalHeight }}>
                    <Tree
                      onExpand={ this.onExpand }
                      expandedKeys={ expandedKeys }
                      autoExpandParent={ autoExpandParent }
                      onSelect={ onSelect }
                    >
                        { this.renderTreeNode(this.treeData) }
                    </Tree>
                </div>
            </div>
        );
    }

    private renderBlank = () => {
        const { prefixCls } = this.props;

        return (
            <div>
                <div className={ `${prefixCls}-bar` }>
                    <ButtonIcon
                        icon='right-square'
                        title='展开分类'
                        className='expand'
                        onClick={ this.onFold }
                    />
                </div>
            </div>
        );
    }

    private onChange = (e) => {
        const { data } = this.props;
        const value = e.target.value;

        const expandedKeys = data.toJS().map((item, index) => {
            if (item.name.indexOf(value) > -1) {
                return this.getParentKey(item.id, this.treeData);
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
            if (!item.get('parentId') || item.get('parentId') === '0') {
                treeData.push(item.toJS());
            } else {
                childData.push(item.toJS());
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

    // Get the parentId by key.
    // params:
    //  @ key - search key
    //  @ tree - data of tree structure
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

    private renderTreeNode = (data) => {
        const { searchValue } = this.state;

        const treeNodes = data.map((item) => {
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
                        { this.renderTreeNode(item.child) }
                    </TreeNode>
                );
            }
            return <TreeNode key={ item.id } title={ title } />;
        });

        return treeNodes;
    }

    // 创建分类
    private createCategory = () => {
        // todo: 跳转通用分类编辑页面
    }

    // 编辑分类
    private editCategory = () => {
        // todo: 跳转通用分类编辑页面
    }

    // Fold the category panel
    private onFold = () => {
        const { expand, onFold } = this.props;
        onFold(expand);
    }
}
