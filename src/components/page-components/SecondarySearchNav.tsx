/**
 * 二级导航栏
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
const Button = require('antd/lib/button/button');
// import { Menu, Breadcrumb, Icon, Input } from 'antd';
const Input = require('antd/lib/input');
const Search = Input.Search;

interface SearchHeaderProps {
    title?: string,                         // 标题
    buttonTitle?: string,                   // 按钮文字
    onSearch?: (keyword) => void,           // 搜索回调
    onButtonClick?: () => void,             // 按钮回调
}

@autobind
export default class SecondarySearchNav extends React.Component<SearchHeaderProps, any> {

    static defaultProps = {

    }

    render() {
        return (
            <div className="nav-secondary-wrapper">
                <div className="nav-secondary nav-secondary-search clearfix">
                    {this.renderTitle()}
                    {this.renderSearchBox()}
                    {this.renderButtons()}
                </div>
            </div>
        )
    }

    renderTitle() {
        const {title} = this.props;
        return (
            <div className="title">
                <span>{ title }</span>
            </div>
        )
    }

    renderSearchBox() {
        return (
            <div className="search-box-nav">
                <Search
                    placeholder="搜索你感兴趣的内容"
                    style={{ width: 500 }}
                    size="large"
                    onSearch={ this.onSearch }
                />
            </div>
        )
    }

    renderButtons() {
        const { buttonTitle } = this.props;

        return (
            <div className="buttons">
                <Button 
                    type="primary"
                    onClick={ this.onButtonClick }
                >
                    {
                        buttonTitle
                    }
                </Button>
            </div>
        )
    }

    /**
     * 搜索回调
     * @param keyword 
     */
    onSearch(keyword) {
        const { onSearch } = this.props;

        if (onSearch) {
            onSearch(keyword);
        }
    }

    /**
     * 按钮点击回调
     */
    onButtonClick() {
        const { onButtonClick } = this.props;

        if (onButtonClick) {
            onButtonClick();
        }
    }
}
