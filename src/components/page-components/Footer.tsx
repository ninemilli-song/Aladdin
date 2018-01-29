/**
 * 页面尾部区域
 */
import * as React from 'react';
import './assets/footer.scss';

export default class Footer extends React.Component<any, any> {
    prefixCls = 'footer';

    render() {
        return (
            <div className={ `${this.prefixCls}-wrapper ` }>
                <span className={ `${this.prefixCls}-icp` }>
                    © 2005－2018 xxx.com, all rights reserved 北京xxx有限公司
                </span>
                <span className={ `${this.prefixCls}-links` }>
                    <a href="javascript:void(0)">关于xxx</a>
                    &nbsp;·&nbsp;
                    <a href="javascript:void(0)">在xxx工作</a>
                    &nbsp;·&nbsp;
                    <a href="javascript:void(0)">联系我们</a>
                    &nbsp;·&nbsp;
                    <a href="javascript:void(0)">免责声明</a>
                    &nbsp;·&nbsp;
                    <a href="javascript:void(0)">帮助中心</a>
                    &nbsp;·&nbsp;
                    <a href="javascript:void(0)">移动应用</a>
                    &nbsp;·&nbsp;
                    <a href="javascript:void(0)">**广告</a>
                </span>
            </div>
        )
    }
}
