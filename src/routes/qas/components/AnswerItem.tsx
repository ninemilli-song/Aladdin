/**
 * 回答条目
 */
import * as React from 'react'
import { UserInfo } from '../../../common/globalInterface';
import QASOperators from '../../../components/qas-operators/QASOperators';
import { formateNumberCount } from '../../../utils/utils';
const Avatar = require('antd/lib/avatar');
const { Map } = require('immutable');

export interface AnswerItemProps {
    data: any;                                              // 数据
    doApprove: (id: number, approve: boolean) => void;                  // 赞成
}

export default class AnswerItem extends React.Component<AnswerItemProps, any> {

    prefixCls = 'answer-item';

    render() {
        const { data, doApprove } = this.props;

        const operatorOpts = [
            {
                iconName: 'icon-dianzan',
                label: `赞成(${ formateNumberCount(data ? data.get('approveCount') : 0) })`,
                onClick: this.approveHandler
            },
            {
                iconName: 'icon-tucao',
                label: `反对(${ formateNumberCount(data ? data.get('disapproveCount') : 0) })`,
                onClick: this.disApproveHandler
            },
            {
                iconName: 'icon-faqiliaotian',
                label: `追问`,
                // callback: this.showInvite
            },
            {
                iconName: 'icon-xihuan',
                label: `收藏`,
                // callback: this.showShare
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
}
