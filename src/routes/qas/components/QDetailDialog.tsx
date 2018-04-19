/**
 * 详情对话框组件
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
import { ActionButton } from '../../../components/button/index';
import { formateNumberCount } from '../../../utils/utils';
import { QASOperators } from '../../../components/qas-operators/QASOperators';
import ISay from '../../../components/i-say/ISay';
import AnswerListContainer from '../containers/AnswerListContainer';
const Avatar = require('antd/lib/avatar');
const Modal = require('antd/lib/modal/Modal');

interface QDetailDialogProps {
    id: number;                         // 当前内容详情的 id
    action: any;
    visible: boolean;                   // 是否可见
    data: any;                          // 详情数据
}

@autobind
export default class QDetailDialog extends React.Component<QDetailDialogProps, any> {

    prefixCls = 'q-detail';
    
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        const { action, id } = this.props;
        const newId = nextProps.id;

        if (newId && id !== newId) {
            action.getData(newId);
        }
    }

    render() {
        const { visible, id, data } = this.props;

        const operatorOpts = [
            {
                iconName: 'icon-xiaoxi',
                label: `回答(${ formateNumberCount(data.answerCount || 0) })`,
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
            <Modal
                wrapClassName = "qas"
                visible={ visible }
                closable = { false }
                onOk={ this.handleOk }
                onCancel={ this.handleCancel }
                width = { 600 }
                footer={ null }
            >
                <div className={ `${this.prefixCls}-wrapper` }>
                    <div className={ `${this.prefixCls}-userInfo` }>
                        <div className="profile">
                            <Avatar 
                                size = "large"
                                icon = "user"
                                src = { data.user ? data.user.profile : null }
                            />
                        </div>
                        <span className="name">
                            { data.user ? data.user.name : null }
                        </span>
                    </div>
                    <div className={ `${this.prefixCls}-content` }>
                        {
                            data.content
                        }
                    </div>
                    <div className={ `${this.prefixCls}-updateDate` }>
                        {
                            data.updateTime
                        }
                    </div>
                    <div className={ `${this.prefixCls}-operators` }>
                        <QASOperators 
                            operators = { operatorOpts }
                        />
                    </div>
                    <div className={ `${this.prefixCls}-doReply` }>
                        <ISay
                            placeholder = "谈谈您的看法吧！"
                            title = "回答"
                        />
                    </div>
                    <div className={ `${this.prefixCls}-replyList` }>
                        <AnswerListContainer />
                    </div>
                </div>
            </Modal>
        )
    }

    handleOk() {
        // const { onSubmit } = this.props;

        // if (onSubmit) {
        //     onSubmit();
        // }
    }

    handleCancel() {
        // const { onCancel } = this.props;

        this.hide();

        // if (onCancel) {
        //     onCancel();
        // }
    }

    private hide() {
        const { action } = this.props;

        if (action.hide) {
            action.hide();
        }
    }

    private showAnswer() {
        
    }

    private doConcern() {

    }

    private showInvite() {

    }

    private showShare() {

    }
}
