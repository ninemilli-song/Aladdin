/**
 * The Container fo AnswerList Component
 */
import { connect } from 'react-redux';
import {  } from '../actions/index';
import { toJS } from '../../../utils/hocs';
import * as React from 'react'
import AnswerItem, { AnswerItemProps } from '../components/AnswerItem';

/**
 * 回答列表组件
 */

interface AnswerListProps {
    data?: Array<AnswerItemProps>;
}

@connect(
    store => {
        return {
            data: store.QAS.getIn(['qDetailData', 'answers']),
        }
    }
)
export default class AnswerList extends React.Component<any, any> {

    prefixCls = 'answer-list';

    render() {
        const { data } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                {
                    data ? data.map((item, index) => {
                        return (
                            <AnswerItem 
                                key = { `${this.prefixCls}-${item.getIn(['id'])}-${index}` }
                                id = { item.getIn(['id']) }
                                user = { item.getIn(['user'])}
                                content = { item.getIn(['content'])}
                                isAnonymous = { item.getIn(['isAnonymous'])}
                                approveCount = { item.getIn(['approveCount']) }
                                disapproveCount = { item.getIn(['disapproveCount'])}
                            />
                        )
                    }) : null
                }
            </div>
        )
    }
}

