import * as React from 'react'
import { UserInfo } from '../../../common/globalInterface';
import { formateNumberCount } from '../../../utils/utils';
import { ActionButton } from '../../../components/button';
import { autobind } from 'core-decorators';
import { QASOperators } from '../../../components/qas-operators/QASOperators';
const Avatar = require('antd/lib/avatar');

export type QItemData = {
    id: number;                             // 问题id
    title: string;                          // 标题
    question: string;                       // 内容
    isAnonymous: boolean;                   // 是否匿名
    user: UserInfo;                         // 用户信息
    answersCount: number;                   // 回答次数
    collectedCount: number;                 // 收藏次数
    updateTime: string;                     // 更新日期
}

interface QItemProps {
    data?: QItemData;
    onShowDetail?: (id: number) => void;              // 详情展示
}

@autobind
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

        const operatorOpts = [
            {
                iconName: 'icon-xiaoxi',
                label: `回答(${ formateNumberCount(data.answersCount || 0) })`,
                callback: this.showAnswer
            },
            {
                iconName: 'icon-shoucang',
                label: `关注(${ formateNumberCount(data.collectedCount || 0) })`,
                callback: this.doConcern
            },
            {
                iconName: 'icon-chengyuan-tianjia',
                label: `邀请`,
                callback: this.showInvite
            },
            {
                iconName: 'icon-zhuanfa',
                label: `分享`,
                callback: this.showShare
            },
        ];

        return (
            <div className={ this.prefixCls } onClick={ this.showDetail }>
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
                        • { data.updateTime }
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
                    <QASOperators 
                        operators = { operatorOpts }
                    />
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
