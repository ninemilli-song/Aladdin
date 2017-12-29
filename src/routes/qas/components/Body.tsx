import * as React from 'react'
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import ISay from '../../../components/i-say/ISay';

interface BodyProps extends MainSiderProps {

}

export default class Body extends MainSider<BodyProps> {

    prefixCls = 'qas-body'

    renderMain() {

        return (
            <div className={ this.prefixCls }>
                <div className={ `${this.prefixCls}-question-area` }>
                    <ISay />
                </div>
                <div className={ `${this.prefixCls}-question-list` }>
                    qqq
                </div>
            </div>
        )
    }
}
