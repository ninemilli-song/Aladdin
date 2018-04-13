/**
 * 返回到顶部
 */
import * as React from 'react';
const BackTop = require('antd/lib/back-top');
import './assets/backtop.scss';

interface BackProps {
    target?: () => JSX.Element;
    visibilityHeight?: number;
    onClick?: () => void;
}

export default (props: BackProps) => {
    return (
        <div className="acc-back-top">
            <BackTop>
                <div className="acc-back-top-inner">
                    <i className="iconfont icon-zhiding1"></i>
                </div>
            </BackTop>
        </div>
    )
}
