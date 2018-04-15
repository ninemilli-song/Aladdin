import * as React from 'react'
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import ISay from '../../../components/i-say/ISay';
import { autobind } from 'core-decorators';
import QListContainer from '../containers/QListContainer';

interface BodyProps extends MainSiderProps {
    onPageChanged?: (page: number, pageSize: number) => void,             // 切换分页回调
}

@autobind
export default class Body extends MainSider<BodyProps> {

    prefixCls = 'qas-body';

    renderMain() {

        return (
            <div className={ this.prefixCls }>
                <div className={ `${this.prefixCls}-question-area` }>
                    <ISay />
                </div>
                <QListContainer />
            </div>
        )
    }
}
