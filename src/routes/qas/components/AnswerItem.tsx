/**
 * 回答条目
 */
import * as React from 'react'
import { UserInfo } from '../../../common/globalInterface';
import QASOperators from '../../../components/qas-operators/QASOperators';
import { formateNumberCount } from '../../../utils/utils';
import { autobind } from 'core-decorators';
const Avatar = require('antd/lib/avatar');
const { Map } = require('immutable');

export interface AnswerItemProps {
    data: any;                                              // 数据
    doApprove: (id: number, approve: boolean) => void;                  // 赞成
    onCollected: (id: number) => void;                                  // 收藏 回应
    onUnCollected: (id: number) => void;                                // 取消收藏 回应
    onReply: (id: number) => void;                                                // 回复
}

@autobind
export default class AnswerItem extends React.Component<AnswerItemProps, any> {

    prefixCls = 'answer-item';

    render() {
        const { data, doApprove } = this.props;
        const hasCollected = data.get('hasCollected');
        const hasApproved = data.get('hasApproved');
        const hasDisapproved = data.get('hasDisapproved');

        const operatorOpts = [
            {
                iconName: hasApproved ? 'icon-dianzan-tianchong' : 'icon-dianzan',
                className: hasApproved ? 'selected' : 'unselected',
                label: `赞成(${ formateNumberCount(data ? data.get('approveCount') : 0) })`,
                onClick: this.approveHandler
            },
            {
                iconName: hasDisapproved ? 'icon-tucao-tianchong' : 'icon-tucao',
                className: hasDisapproved ? 'selected' : 'unselected',
                label: `反对(${ formateNumberCount(data ? data.get('disapproveCount') : 0) })`,
                onClick: this.disApproveHandler
            },
            {
                iconName: 'icon-faqiliaotian',
                label: `回复`,
                onClick: this.replyHandler
            },
            {
                iconName: hasCollected ? 'icon-xihuan-tianchong' : 'icon-xihuan',
                label: hasCollected ? `取消收藏` : `收藏`,
                className: hasCollected ? 'selected' : 'unselected',
                onClick: hasCollected ? this.cancelCollectHandler : this.collectHandler
            },
        ];

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <div className={ `${this.prefixCls}-profile` }>
                    <div className="profile">
                        <Avatar 
                            size = "large"
                            icon = "user"
                            src = { data ? data.getIn(['user', 'profile']) : null }
                        />
                    </div>
                </div>
                <div className={ `${this.prefixCls}-content` }>
                    <div className={ `${this.prefixCls}-content-top` }>
                        <span className="name">
                            { data ? data.getIn(['user', 'nickName']) : '' }
                        </span>
                        <span className="updateDate">
                            • { data ? data.get('createTime') : '' }
                        </span>
                    </div>
                    <div className={ `${this.prefixCls}-content-body` }>
                        {
                            data ? data.get('answer') : ''
                        }
                    </div>
                    <div className={ `${this.prefixCls}-content-footer` }>
                        <QASOperators 
                            operators = { operatorOpts }
                        />
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 赞成
     * @param e 
     */
    private approveHandler(e) {
        const { doApprove, data } = this.props;
        const id = data.get('id');

        if (doApprove) {
            doApprove(id, true);
        }
    }

    /**
     * 不赞成
     * @param e 
     */
    private disApproveHandler(e) {
        const { doApprove, data } = this.props;
        const id = data.get('id');

        if (doApprove) {
            doApprove(id, false);
        }
    }

    /**
     * 收藏 回应
     * @param e 
     */
    private collectHandler(e) {
        const { data, onCollected } = this.props;
        const id = data.get('id');

        if (onCollected) {
            onCollected(id);
        }
    }

    private cancelCollectHandler(e) {
        const { data, onUnCollected } = this.props;
        const id = data.get('id');

        if (onUnCollected) {
            onUnCollected(id);
        }
    }

    private replyHandler(e) {
        const { data, onReply } = this.props;
        const id = data.get('id');

        if (onReply) {
            onReply(id);
        }
    }
}
