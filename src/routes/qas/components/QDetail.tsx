import * as React from 'react';
import QASOperators from '../../../components/qas-operators/QASOperators';
import ISay from '../../../components/i-say/ISay';
import AnswerList from '../containers/AnswerList';
import { formateNumberCount } from '../../../utils/utils';
import Question from './Question';
import { autobind } from 'core-decorators';
const Avatar = require('antd/lib/avatar');

interface QDetailProps {
    data: any;                                                          // 数据
    sayExpand?: boolean;                                                // 回答框是否展开
    sayOnFocus?: () => void;                                            // 回答框获取焦点
    sayOnBlur?: () => void;                                             // 回答框获取焦点
    onReplyQuestion?: (val: string) => void;                            // 回应问题
    answerHandler?: Function;                                           // 回答提问
    concernHandler?: (concern: boolean) => void;                        // 关注提问
    inviteHandler?: Function;                                           // 邀请
    shareHandler?: Function;                                            // 分享
}

@autobind
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
        const { data, answerHandler, inviteHandler, shareHandler } = props;

        const hasCollected = data ? (data.getIn(['hasCollected'])) : true;

        this.operatorOpts = [
            {
                iconName: 'icon-xiaoxi',
                label: `回答(${ formateNumberCount(data ? data.getIn(['answerCount']) : 0) })`,
                onClick: answerHandler
            },
            {
                iconName: hasCollected ? 'icon-shoucang-tianchong' : 'icon-shoucang',
                className: hasCollected ? 'selected' : 'unselected',
                label: `${ hasCollected ? 
                    '取消关注' : '关注'
                }(${ formateNumberCount(data ? data.getIn(['collectedCount']) : 0) })`,
                onClick: hasCollected ? this.cancelConcern : this.doConcern
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

    /**
     * 关注
     */
    private doConcern() {
        const { concernHandler } = this.props;

        if (concernHandler) {
            concernHandler(true);
        }
    }

    /**
     * 取消关注
     */
    private cancelConcern() {
        const { concernHandler } = this.props;

        if (concernHandler) {
            concernHandler(false);
        }
    }
}
