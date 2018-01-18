/**
 * 边栏区导航控件
 */
import * as React from 'react';
import { Row, Col } from 'antd';
const Anchor = require('antd/lib/anchor');
const { Link } = Anchor;
import './style.scss';

interface LinkProps {
    href: string,                   // 目标元素的id
    title: string,                  // 显示标题
    childs?: Array<LinkProps>         // 子元素
}

export interface SiderNavProps {
    prefixCls?: string,
    data?: Array<LinkProps>,
}

export default class SiderNav extends React.Component<SiderNavProps, any> {

    static defaultProps = {
        prefixCls: 'sider-nav'
    }

    render() {
        const { prefixCls, data } = this.props;

        return (
            <div className={ `${prefixCls}-container` }>
                <Anchor className={ `${prefixCls}-group` }>
                    {
                        this.renderLinks(data)
                    }
                </Anchor>
            </div>
        )
    }

    renderLinks(data) {
        const { prefixCls } = this.props;

        let links = [];
        if (data && data.length > 0) {
            data.forEach((item, index) => {
                if (item.childs) {      // 添加子节点
                    links.push((
                        <Link 
                            key={ `nav-link-${item.href}-${index}` }
                            className={ `${prefixCls}-group-item` } 
                            title={ item.title } 
                            href={ `#${item.href}` } 
                        >
                        {
                            this.renderLinks(item.childs)
                        }
                        </Link>
                    ));
                } else {
                    links.push((
                        <Link 
                            key={ `nav-link-${item.href}-${index}` }
                            className={ `${prefixCls}-group-item` } 
                            title={ item.title } 
                            href={ `#${item.href}` } 
                        />
                    ));
                }
            });
        }

        return links;
    }
}
