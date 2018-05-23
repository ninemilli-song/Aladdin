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
    id: number;                         // id
    user: UserInfo                           // 用户信息
    content: string;                    // 内容详情
    isAnonymous: boolean;               // 是否匿名
    approveCount: number;               // 赞同数
    disapproveCount: number;            // 不赞同数
}

export default class AnswerItem extends React.Component<AnswerItemProps, any> {

    prefixCls = 'answer-item';

    render() {
        const { id, user, content, isAnonymous, approveCount, disapproveCount } = this.props;

        const operatorOpts = [
            {
                iconName: 'icon-dianzan',
                label: `赞成(${ formateNumberCount(approveCount || 0) })`,
                // callback: this.showAnswer
            },
            {
                iconName: 'icon-tucao',
                label: `反对(${ formateNumberCount(disapproveCount || 0) })`,
                // callback: this.doConcern
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
                            src = { user.profile }
                        />
                    </div>
                </div>
                <div className={ `${this.prefixCls}-content` }>
                    <div className={ `${this.prefixCls}-content-top` }>
                        <span className="name">
                            { user.name }
                        </span>
                    </div>
                    <div className={ `${this.prefixCls}-content-body` }>
                        {
                            content
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
}
