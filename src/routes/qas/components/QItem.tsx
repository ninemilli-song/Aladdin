import * as React from 'react'
import { UserInfo } from '../../../common/globalInterface';
const Avatar = require('antd/lib/avatar');

export type QItemData = {
    id: number;                             // 问题id
    title: string;                          // 标题
    question: string;                       // 内容
    isAnonymous: boolean;                   // 是否匿名
    user: UserInfo;                         // 用户信息
    answersCount: number;                   // 回答次数
    collectedCount: number;                 // 收藏次数
    updateDate: string;                     // 更新日期
}

interface QItemProps {
    data?: QItemData;
}

export default class QItem extends React.Component<QItemProps> {

    prefixCls = 'q-item';

    static defaultProps = {
        data: {
            name: 'UserName',
            text: 'Text',
            title: 'Title',
            time: '2018-1-2',
            answerCount: 10,
            concernCount: 10,
        }
    };

    render() {
        const { data } = this.props;

        return (
            <div className={ this.prefixCls }>
                <div className={ `${this.prefixCls}-user` }>
                    <div className="profile">
                        <Avatar />
                    </div>
                    <span className="name">
                        { data.user.name }
                    </span>
                </div>
                <div className={ `${this.prefixCls}-title` }>
                    <span>
                        { data.title }
                    </span>
                </div>
                <div className={ `${this.prefixCls}-text` }>
                    { data.question }
                </div>
                <div className={ `${this.prefixCls}-time` }>
                    提问于：{ data.updateDate }
                </div>
                <div className={ `${this.prefixCls}-operaters` }>
                    <ul>
                        <li onClick={ this.showAnswer }>
                            <i className="iconfont icon-message_fill"></i>
                            <span>回答({ data.answersCount })</span>
                        </li>
                        <li onClick={ this.showInvite }>
                            <i className="iconfont icon-message_fill"></i>
                            <span>邀请</span>
                        </li>
                        <li onClick={ this.showShare }>
                            <i className="iconfont icon-message_fill"></i>
                            <span>分享</span>
                        </li>
                        <li onClick={ this.doConcern }>
                            <i className="iconfont icon-message_fill"></i>
                            <span>关注({ data.collectedCount })</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    // Show answer dialog
    private showAnswer() {

    }

    // Show invite dialog
    private showInvite() {

    }

    // Show share dialog
    private showShare() {

    }

    // Do concern dialog
    private doConcern() {

    }
}
