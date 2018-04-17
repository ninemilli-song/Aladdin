/**
 * 回答列表组件
 */
import * as React from 'react'
import AnswerItem, { AnswerItemProps } from './AnswerItem';

interface AnswerListProps {
    // data: Array<AnswerItemProps>;
    data: any;
}

export default class AnswerList extends React.Component<AnswerListProps, any> {

    prefixCls = 'answer-list';

    render() {
        const { data } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                {
                    data ? data.map((item, index) => {
                        return (
                            <AnswerItem 
                                key = { `${this.prefixCls}-${item.id}-${index}` }
                                id = { item.getIn(['id']) }
                                user = { item.getIn(['user']) }
                                content = { item.getIn(['content']) }
                                isAnonymous = { item.getIn(['isAnonymous']) }
                                approveCount = { item.getIn(['approveCount']) }
                                disapproveCount = { item.getIn(['disapproveCount']) }
                            />
                        )
                    }) : null
                }
            </div>
        )
    }
}
