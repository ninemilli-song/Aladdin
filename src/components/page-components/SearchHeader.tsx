/**
 * 二级导航栏
 */
import * as React from 'react';
// import { Menu, Breadcrumb, Icon, Input } from 'antd';
const Input = require('antd/lib/input');
const Search = Input.Search;

interface SearchHeaderProps {
    title?: string,
    onSearch?: (keyword) => void,
}

export default class SearchHeader extends React.Component<SearchHeaderProps, any> {

    static defaultProps = {

    }

    render() {
        return (
            <div className="layout-nav-header-wrapper">
                {this.renderTitle()}
                {this.renderSearchBox()}
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
            <div className="search-box">
                <Search
                    placeholder="input search text"
                    style={{ width: 200 }}
                    onSearch={value => console.log(value)}
                />
            </div>
        )
    }
}
