/**
 * 回答列表组件
 */
import * as React from 'react'
import AnswerItem, { AnswerItemProps } from './AnswerItem';

interface AnswerListProps {
    data: Array<AnswerItemProps>;
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
                                id = { item.id }
                                user = { item.user}
                                content = { item.content}
                                isAnonymous = { item.isAnonymous}
                                approveCount = { item.approveCount }
                                disapproveCount = { item.disapproveCount}
                            />
                        )
                    }) : null
                }
            </div>
        )
    }
}
