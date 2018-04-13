import * as React from 'react'
import { UserInfo } from '../../../common/globalInterface';
import { formateNumberCount } from '../../../utils/utils';
import { ActionButton } from '../../../components/button';
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
    onShowDetail?: (id: number) => void;              // 详情展示
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
                        <Avatar 
                            size = "large"
                            icon = "user"
                            src = { data.user.profile || null }
                        />
                    </div>
                    <span className="name">
                        { data.user.name }
                    </span>
                    <span className="updateDate">
                        • { data.updateDate }
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
                <div className={ `${this.prefixCls}-operaters` }>
                    <ul>
                        <li onClick={ this.showAnswer }>
                            <ActionButton
                                iconName = "icon-xiaoxi"
                                label = { `回答(${ formateNumberCount(data.answersCount) })` }
                            />
                        </li>
                        <li onClick={ this.doConcern }>
                            <ActionButton
                                iconName = "icon-shoucang"
                                label = { `关注(${ formateNumberCount(data.collectedCount) })` }
                            />
                        </li>
                        <li onClick={ this.showInvite }>
                            <ActionButton
                                iconName = "icon-chengyuan-tianjia"
                                label = { `邀请` }
                            />
                        </li>
                        <li onClick={ this.showShare }>
                            <ActionButton
                                iconName = "icon-zhuanfa"
                                label = { `分享` }
                            />
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

    private showDetail() {
        const { data, onShowDetail } = this.props;

        if (onShowDetail) {
            onShowDetail(data.id);
        }
    }
}
