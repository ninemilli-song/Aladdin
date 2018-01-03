import * as React from 'react'
const Avatar = require('antd/lib/avatar');

type QItemData = {
    profile?: string;
    name?: string;
    title?: string;
    text?: string;
    time?: string;
    answerCount?: number;
    concernCount?: number;
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
                        { data.name }
                    </span>
                </div>
                <div className={ `${this.prefixCls}-title` }>
                    <span>
                        { data.title }
                    </span>
                </div>
                <div className={ `${this.prefixCls}-text` }>
                    { data.text }
                </div>
                <div className={ `${this.prefixCls}-time` }>
                    提问于：{ data.time }
                </div>
                <div className={ `${this.prefixCls}-operaters` }>
                    <ul>
                        <li onClick={ this.showAnswer }>
                            <i className="iconfont icon-message_fill"></i>
                            <span>回答({ data.answerCount })</span>
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
                            <span>关注({ data.concernCount })</span>
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
