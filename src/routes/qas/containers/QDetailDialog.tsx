/**
 * The Container fo QDetailDialog Component
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
import { ActionButton } from '../../../components/button/index';
import { formateNumberCount } from '../../../utils/utils';
import { QASOperators } from '../../../components/qas-operators/QASOperators';
import ISay from '../../../components/i-say/ISay';
import AnswerList from '../containers/AnswerList';
const Avatar = require('antd/lib/avatar');
const Modal = require('antd/lib/modal/Modal');
import { connect } from 'react-redux';
import { setDetailDialogVisible, getQDetailData, clearQDetailData, onSelectedQ } from '../actions/index';
import { toJS } from '../../../utils/hocs';

/**
 * 详情对话框组件
 */
interface QDetailDialogProps {
    id?: number;                         // 当前内容详情的 id
    action?: any;
    visible?: boolean;                   // 是否可见
    data?: any;                          // 详情数据
}

@connect(
    store => {
        return {
            visible: store.QAS.getIn(['uistate', 'qDetailDialogOpts', 'visible']),
            id: store.QAS.getIn(['selectedQId']),
            data: store.QAS.getIn(['qDetailData'])
        }
    },
    dispatch => {
        return {
            action: {
                hide: () => {
                    dispatch(setDetailDialogVisible(false));
                    dispatch(clearQDetailData());
                    dispatch(onSelectedQ(-1));
                },
                getData: (id) => {
                    dispatch(getQDetailData(id));
                }
            },
        }
    }
)
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
                label: `回答(${ formateNumberCount(data ? data.getIn(['answerCount']) : 0) })`,
                callback: this.showAnswer
            },
            {
                iconName: 'icon-shoucang',
                label: `关注(${ formateNumberCount(data ? data.getIn(['collectedCount']) : 0) })`,
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
                footer = { null }
            >
                <div className={ `${this.prefixCls}-wrapper` }>
                    <div className={ `${this.prefixCls}-userInfo` }>
                        <div className="profile">
                            <Avatar 
                                size = "large"
                                icon = "user"
                                src = { data ? data.getIn(['user', 'profile']) : null }
                            />
                        </div>
                        <span className="name">
                            { data ? data.getIn(['user', 'name']) : null }
                        </span>
                    </div>
                    <div className={ `${this.prefixCls}-content` }>
                        {
                            data ? data.getIn(['content']) : null
                        }
                    </div>
                    <div className={ `${this.prefixCls}-updateDate` }>
                        {
                            data ? data.getIn(['updateTime']) : null
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
                        <AnswerList />
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

