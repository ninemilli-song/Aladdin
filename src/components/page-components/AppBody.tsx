/**
 * 应用内容区域
 */
import * as React from 'react';

class AppBody extends React.Component<any, any> {
    prefixCls = 'app-body';

    render() {
        return(
            <div className={`${this.prefixCls}`}>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default AppBody;
