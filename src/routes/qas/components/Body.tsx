import * as React from 'react'
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import ISay from '../../../components/i-say/ISay';
import QItem, { QItemData } from './QItem';
import { UserInfo } from '../../../common/globalInterface';
import { actions } from '../../Counter/modules/counter';
import { autobind } from 'core-decorators';
import CutLine from '../../../components/cut-line';
const Pagination = require('antd/lib/pagination');

type QList = {
    list: Array<QItemData>;                     // 列表数据
    total: number;                          // 结果总数
}

interface BodyProps extends MainSiderProps {
    questions?: QList,                      // 提问数据
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
                <div className={ `${this.prefixCls}-question-list` }>
                    {
                        this.genQList()
                    }
                </div>
                <div className={ `${this.prefixCls}-question-pagination` }>
                    {
                        this.renderPagination()
                    }
                </div>
            </div>
        )
    }

    /**
     * 渲染分页组件
     */
    renderPagination() {
        const { questions } = this.props;
        return (
            <Pagination 
                total={ questions ? questions.total : null } 
                onChange={ this.handlePageChange }
                size="small"
                pageSize={ 10 }
            />
        )
    }

    /**
     * 渲染列表
     */
    genQList() {
        const { questions } = this.props;

        const questionNodes = questions ? 
            questions.list.map((item, index) => {
                return (
                    <div
                        key = { `${this.prefixCls}-qitem-index-${item.id}` }
                    >
                        <QItem 
                            data = { item }
                        />
                        <CutLine />
                    </div>
                )
        }) : null;

        return questionNodes;
    }

    /**
     * 处理分页切换
     * @param page 
     * @param pageSize 
     */
    handlePageChange(page, pageSize) {
        const { onPageChanged } = this.props;

        if (onPageChanged) {
            onPageChanged(page, pageSize);
        }
    }
}
