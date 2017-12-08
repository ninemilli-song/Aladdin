/**
 * 边栏区导航控件
 */
import * as React from 'react';
import { Row, Col } from 'antd';
import './style.scss';

export interface SiderNavProps {
    prefixCls?: string,
}

export default class SiderNav extends React.Component<SiderNavProps, any> {

    static defaultProps = {
        prefixCls: 'sider-nav'
    }

    render() {
        const { prefixCls } = this.props;

        return (
            <div className={ `${prefixCls}-container` }>
                <ul className={ `${prefixCls}-group` }>
                    <li className={ `${prefixCls}-group-item` }>第一章</li>
                    <li className={ `${prefixCls}-group-item` }>第二章</li>
                    <li className={ `${prefixCls}-group-item` }>第三章</li>
                    <li className={ `${prefixCls}-group-item` }>第四章</li>
                </ul>
            </div>
        )
    }

}
