import * as React from 'react';
import QASOperators from '../../../components/qas-operators/QASOperators';
import ISay from '../../../components/i-say/ISay';
import AnswerList from '../containers/AnswerList';
import { formateNumberCount } from '../../../utils/utils';
import Question from './Question';
const Avatar = require('antd/lib/avatar');

interface QDetailProps {
    data: any;                              // 数据
    sayExpand?: boolean;                    // 回答框是否展开
    sayOnFocus?: () => void;                // 回答框获取焦点
    sayOnBlur?: () => void;                 // 回答框获取焦点
    onReplyQuestion?: (val: string) => void;           // 回应问题
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
        const { data, answerHandler, concernHandler, inviteHandler, shareHandler } = props;

        this.operatorOpts = [
            {
                iconName: 'icon-xiaoxi',
                label: `回答(${ formateNumberCount(data ? data.getIn(['answerCount']) : 0) })`,
                onClick: answerHandler
            },
            {
                iconName: 'icon-shoucang',
                label: `关注(${ formateNumberCount(data ? data.getIn(['collectedCount']) : 0) })`,
                onClick: concernHandler
            },
            {
                iconName: 'icon-chengyuan-tianjia',
                label: `邀请`,
                onClick: inviteHandler
            },
            {
                iconName: 'icon-zhuanfa',
                label: `分享`,
                onClick: shareHandler
            },
        ];
    }

    render() {
        const { data, sayExpand, sayOnFocus, sayOnBlur, onReplyQuestion } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` } onClick = { sayOnBlur } >
                <Question 
                    data = { data }
                />
                <div className={ `${this.prefixCls}-operators` }>
                    <QASOperators 
                        operators = { this.operatorOpts }
                    />
                </div>
                <div className={ `${this.prefixCls}-doReply` }>
                    <ISay
                        placeholder = "谈谈您的看法吧！"
                        title = "回答"
                        expand = { sayExpand }
                        onFocus = { sayOnFocus }
                        // onBlur = { sayOnBlur }
                        onSubmit = { onReplyQuestion }
                    />
                </div>
                <div className={ `${this.prefixCls}-replyList` }>
                    <AnswerList />
                </div>
            </div>
        )
    }
}
