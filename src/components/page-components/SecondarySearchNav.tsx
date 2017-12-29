/**
 * 二级导航栏
 */
import * as React from 'react';
const Button = require('antd/lib/button/button');
// import { Menu, Breadcrumb, Icon, Input } from 'antd';
const Input = require('antd/lib/input');
const Search = Input.Search;

interface SearchHeaderProps {
    title?: string,
    onSearch?: (keyword) => void,
}

export default class SecondarySearchNav extends React.Component<SearchHeaderProps, any> {

    static defaultProps = {

    }

    render() {
        return (
            <div className="layout-nav-secondary-wrapper">
                <div className="layout-nav-secondary layout-nav-secondary-search clearfix">
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
                    onSearch={value => console.log(value)}
                />
            </div>
        )
    }

    renderButtons() {
        return (
            <div className="buttons">
                <Button type="primary">提问</Button>
            </div>
        )
    }
}
