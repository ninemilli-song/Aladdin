import * as React from 'react';
import QASOperators from '../../../components/qas-operators/QASOperators';
import ISay from '../../../components/i-say/ISay';
import AnswerList from '../containers/AnswerList';
import { formateNumberCount } from '../../../utils/utils';
const Avatar = require('antd/lib/avatar');

interface QDetailProps {
    answerCount?: number;                   // 回答次数
    collectedCount?: number;                // 关注次数
    userProfile?: string;                   // 用户头像
    userName?: string;                      // 用户名
    content?: string;                       // 问题内容
    updateTime?: string;                    // 更新时间
    answerHandler?: Function;               // 回答提问
    concernHandler?: Function;              // 回答提问
    inviteHandler?: Function;               // 邀请
    shareHandler?: Function;                // 分享
}

export default class QDetail extends React.PureComponent<QDetailProps, any> {

    prefixCls = 'q-detail';

    operatorOpts = [];

    constructor(props, context) {
        super(props, context);

        this.initOperatorOpts(props);
    }

    componentWillUpdate(nextProps, nextState) {
        this.initOperatorOpts(nextProps);
    }

    /**
     * 初始化操作按钮配置参数
     * @param props 
     */
    initOperatorOpts(props: QDetailProps) {
        const { answerCount, collectedCount, answerHandler, concernHandler, inviteHandler, shareHandler } = props;

        this.operatorOpts = [
            {
                iconName: 'icon-xiaoxi',
                label: `回答(${ formateNumberCount(answerCount || 0) })`,
                callback: answerCount
            },
            {
                iconName: 'icon-shoucang',
                label: `关注(${ formateNumberCount(collectedCount || 0) })`,
                callback: concernHandler
            },
            {
                iconName: 'icon-chengyuan-tianjia',
                label: `邀请`,
                callback: inviteHandler
            },
            {
                iconName: 'icon-zhuanfa',
                label: `分享`,
                callback: shareHandler
            },
        ];
    }

    render() {
        const { userName, userProfile, content, updateTime } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <div className={ `${this.prefixCls}-userInfo` }>
                    <div className="profile">
                        <Avatar 
                            size = "large"
                            icon = "user"
                            src = { userProfile || null }
                        />
                    </div>
                    <span className="name">
                        { userName || null }
                    </span>
                </div>
                <div className={ `${this.prefixCls}-content` }>
                    {
                        content || null
                    }
                </div>
                <div className={ `${this.prefixCls}-updateDate` }>
                    {
                        updateTime || null
                    }
                </div>
                <div className={ `${this.prefixCls}-operators` }>
                    <QASOperators 
                        operators = { this.operatorOpts }
                    />
                </div>
                <div className={ `${this.prefixCls}-doReply` }>
                    <ISay
                        placeholder = "谈谈您的看法吧！"
                        title = "回答"
                    />
                </div>
                <div className={ `${this.prefixCls}-replyList` }>
                    <AnswerList />
                </div>
            </div>
        )
    }
}
