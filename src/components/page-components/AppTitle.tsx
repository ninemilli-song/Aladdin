/**
 * 页面内容头部
 */
import * as React from 'react';
import './assets/app-title';

interface TitleProps {
    name: string; // 页面的标题名称
}

class AppTitle extends React.Component<TitleProps, any> {
    prefixCls = 'app-title';

    render() {
        const { name } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <span className={`${this.prefixCls}-name`}>
                    { name }
                </span>
            </div>
        )
    }
}

export default AppTitle;
