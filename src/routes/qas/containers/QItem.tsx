/**
 * The Container fo QItem Component
 */
import { connect } from 'react-redux';
import { setDetailDialogVisible, onSelectedQ } from '../actions/index';
import * as React from 'react'
import { UserInfo } from '../../../common/globalInterface';
import { formateNumberCount } from '../../../utils/utils';
import { ActionButton } from '../../../components/button';
import { autobind } from 'core-decorators';
import QASOperators from '../../../components/qas-operators/QASOperators';
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
        })

        return {
            data
        }
    },
    dispatch => {
        return {
            action: {
                showQDetail: (id) => {                                                      // 显示提问详情
                    dispatch(setDetailDialogVisible(true));                                  // 显示提问详情
                    dispatch(onSelectedQ(id));                                              // 设置选中的提问 id
                }
            },
        }
    }
)
@autobind
export default class QItem extends React.Component<any, any> {

    prefixCls = 'q-item';

    render() {
        console.log('<<<<<< QItem render >>>>>>');
        const { data } = this.props;

        const operatorOpts = [
            {
                iconName: 'icon-xiaoxi',
                label: `回答(${ formateNumberCount(data ? (data.getIn(['answersCount'])) : 0) })`,
                callback: this.showAnswer
            },
            {
                iconName: 'icon-shoucang',
                label: `关注(${ formateNumberCount(data ? (data.getIn(['collectedCount'])) : 0) })`,
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
                            src = { data ? data.getIn(['user', 'profile']) : null }
                        />
                    </div>
                    <span className="name">
                        { data ? data.getIn(['user', 'nickName']) : null }
                    </span>
                    <span className="updateDate">
                        • { data ? data.getIn(['modifyTime']) : null }
                    </span>
                </div>
                <div className={ `${this.prefixCls}-title` }>
                    <span>
                        { data ? data.getIn(['title']) : null }
                    </span>
                </div>
                <div className={ `${this.prefixCls}-text` }>
                    { data ? (
                            <div 
                                className={ `${this.prefixCls}-text` } 
                                dangerouslySetInnerHTML={ {__html: data.getIn(['question'])} }
                            />
                        ) : null 
                    }
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
        const { data, action } = this.props;

        action.showQDetail(data.getIn(['id']));
    }
}

