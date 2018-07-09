/**
 * The Container fo QItem Component
 */
import { connect } from 'react-redux';
import { 
    setDetailDialogVisible, 
    onSelectedQ, 
    concernQuestion, 
    unconcernQuestion, 
    setReplyDialogVisible, 
    expandAnswer,
    foldAnswer
} from '../actions/index';
import * as React from 'react'
import { UserInfo } from '../../../common/globalInterface';
import { formateNumberCount } from '../../../utils/utils';
import { ActionButton } from '../../../components/button';
import { autobind } from 'core-decorators';
import QASOperators from '../../../components/qas-operators/QASOperators';
import Question from '../components/Question';
import AnswerListPanel from './AnswerListPanel';
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

@connect(
    (store, ownProps) => {
        console.log('show qitem connect store', ownProps);
        const qList = store.QAS.getIn(['data', 'QList', 'list']);
        const { id } = ownProps;
        
        const data = qList.find((item) => {
            return item.get('id') === id;
        });

        // 是否展开回答
        const qExpandQuestions = store.QAS.get('qExpandQuestions');
        const showAnswer = qExpandQuestions.has(id);

        return {
            data,
            showAnswer
        }
    },
    dispatch => {
        return {
            action: {
                showQDetail: (id) => {                                                      // 显示提问详情
                    dispatch(onSelectedQ(id));                                              // 设置选中的提问 id
                    dispatch(setDetailDialogVisible(true));                                 // 显示提问详情
                },
                showReplyDialog: (id) => {                                                  // 显示回答对话框
                    dispatch(onSelectedQ(id));                                              // 设置选中的提问 id
                    dispatch(setReplyDialogVisible(true));                                  // 显示对话框
                },
                expandAnswer: (id) => {                                                     // 展开回答
                    dispatch(expandAnswer(id));
                },
                foldAnswer: (id) => {                                                       // 折叠回答
                    dispatch(foldAnswer(id));
                },
                doConcern: (id) => {
                    dispatch(concernQuestion(id));
                },
                cancelConcern: (id) => {
                    dispatch(unconcernQuestion(id));
                }
            },
        }
    }
)
@autobind
export default class QItem extends React.Component<any, any> {

    prefixCls = 'q-item';

    render() {
        const { data, showAnswer } = this.props;
        console.log('QItem render >>>>>> id is: ', data.get('id'));

        const hasCollected = data ? (data.getIn(['hasCollected'])) : true;
        // const hasCollected = true;

        const operatorOpts = [
            {
                iconName: 'icon-xiaoxi',
                label: `回答(${ formateNumberCount(data ? (data.getIn(['answerCount'])) : 0) })`,
                onClick: this.expandAnswer
            },
            {
                iconName: hasCollected ? 'icon-shoucang-tianchong' : 'icon-shoucang',
                className: hasCollected ? 'selected' : 'unselected',
                label: `${ hasCollected ? 
                    '取消关注' : '关注'
                }(${ formateNumberCount(data ? (data.getIn(['collectedCount'])) : 0) })`,
                onClick: hasCollected ? this.cancelConcern : this.doConcern
            },
            {
                iconName: 'icon-chengyuan-tianjia',
                label: `邀请`,
                onClick: this.showInvite
            },
            {
                iconName: 'icon-zhuanfa',
                label: `分享`,
                onClick: this.showShare
            },
        ];

        return (
            // <div className={ this.prefixCls } onClick={ this.showDetail }>
            <div className={ this.prefixCls }>
                <Question 
                    data = { data }
                />
                <div className={ `${this.prefixCls}-operaters` }>
                    <QASOperators 
                        operators = { operatorOpts }
                    />
                </div>
                {
                    showAnswer ? (
                        <AnswerListPanel 
                            questionId = { data.get('id') }
                        />
                    ) : null
                }
            </div>
        )
    }

    // Show answer dialog
    private doReply(e) {
        e.stopPropagation();
        const { data, action } = this.props;
        const id = data.getIn(['id']);

        action.showReplyDialog(id);
    }

    // Expand the Answer List
    private expandAnswer(e) {
        e.stopPropagation();

        const { data, action, showAnswer } = this.props;
        const id = data.getIn(['id']);

        /**
         * 1. 当前为展开 则收起
         * 2. 当前为收起 则展开
         */
        if (showAnswer) {
            action.foldAnswer(id);
        } else {
            action.expandAnswer(id);
        }
        
    }

    // Show invite dialog
    private showInvite(e) {
        e.stopPropagation();
    }

    // Show share dialog
    private showShare(e) {
        e.stopPropagation();
    }

    // Do concern
    private doConcern(e) {
        e.stopPropagation();
        const { data, action } = this.props;
        const id = data.getIn(['id']);

        action.doConcern(id);
    }

    /**
     * Cancel concern
     * @param e 
     */
    private cancelConcern(e) {
        e.stopPropagation();
        const { data, action } = this.props;
        const id = data.getIn(['id']);

        action.cancelConcern(id);
    }

    private showDetail() {
        const { data, action } = this.props;

        action.showQDetail(data.getIn(['id']));
    }
}

