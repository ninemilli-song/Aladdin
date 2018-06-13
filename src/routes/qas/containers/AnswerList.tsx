/**
 * The Container fo AnswerList Component
 */
import { connect } from 'react-redux';
import { approveAnswer } from '../actions/index';
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
    },
    dispatch => {
        return {
            actions: {
                approveAnswer: (id, approve) => {
                    dispatch(approveAnswer(id, approve));
                }
            }
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
                                data = { item }
                                doApprove = { this.approveHandler }
                            />
                        )
                    }) : null
                }
            </div>
        )
    }

    /**
     * 赞成 与 反对
     */
    private approveHandler(id, approve) {
        const { actions } = this.props;

        actions.approveAnswer(id, approve);
    }
}

