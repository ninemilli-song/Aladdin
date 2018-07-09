/**
 * The Container fo AnswerList Component
 */
import { connect } from 'react-redux';
import { approveAnswer, collectAnswer, setReplyAnswerDialogVisible } from '../actions/index';
import { toJS } from '../../../utils/hocs';
import * as React from 'react'
import AnswerItem, { AnswerItemProps } from '../components/AnswerItem';
import { autobind } from 'core-decorators';
import CutLine from '../../../components/cut-line/CutLine';

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
                },
                collectAnswer: (id, hasCollected) => {
                    dispatch(collectAnswer(id, hasCollected));
                },
                replyAnswer: (id) => {
                    dispatch(setReplyAnswerDialogVisible(id, true));
                }
            }
        }
    }
)
@autobind
export default class AnswerList extends React.Component<any, any> {

    prefixCls = 'answer-list';

    render() {
        const { data } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                {
                    data ? data.map((item, index) => {
                        return (
                            <div key={ `${this.prefixCls}-answer-item-${index}-${item.id}` }>
                                <AnswerItem 
                                    key = { `${this.prefixCls}-${item.getIn(['id'])}-${index}` }
                                    data = { item }
                                    doApprove = { this.approveHandler }
                                    onCollected = { this.collectHandler }
                                    onUnCollected = { this.unCollectHandler }
                                    onReply = { this.onReplyHandler }
                                />
                                {
                                    index < data.size - 1 ? (
                                        <CutLine />
                                    ) : null
                                }
                            </div>
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

    /**
     * 收藏 回应
     * @param id 
     */
    private collectHandler(id) {
        const { actions } = this.props;

        actions.collectAnswer(id, true);
    }

    /**
     * 取消收藏 回应
     * @param id 
     */
    private unCollectHandler(id) {
        const { actions } = this.props;

        actions.collectAnswer(id, false);
    }

    /**
     * 回复
     */
    private onReplyHandler(id) {
        const { actions } = this.props;

        actions.replyAnswer(id);
    }
}

