import * as React from 'react'
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';

interface BodyProps extends MainSiderProps {

}

export default class Body extends MainSider<BodyProps> {

    renderMain() {
        const { prefixCls } = this.props;

        return (
            <div className={ prefixCls }>
                QAS Body
            </div>
        )
    }
}
