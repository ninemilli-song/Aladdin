/**
 * The Container fo QDetailDialog Component
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
const Modal = require('antd/lib/modal/Modal');
const Spin = require('antd/lib/spin');
import { connect } from 'react-redux';
import { setDetailDialogVisible, getQDetailData, clearQDetailData, onSelectedQ } from '../actions/index';
import { toJS } from '../../../utils/hocs';
import QDetail from '../components/QDetail';

/**
 * 详情对话框组件
 */
interface QDetailDialogProps {
    id?: number;                         // 当前内容详情的 id
    action?: any;
    visible?: boolean;                   // 是否可见
    loading?: boolean;                   // 是否正在加载
    data?: any;                          // 详情数据
}

@connect(
    store => {
        return {
            visible: store.QAS.getIn(['uistate', 'qDetailDialogOpts', 'visible']),
            loading: store.QAS.getIn(['uistate', 'qDetailDialogOpts', 'loading']),
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

    prefixCls = 'q-detail-dialog';
    
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
        const { visible, id, data, loading } = this.props;

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
                    {
                        loading ? (
                            <div className={ `${this.prefixCls}-spin-wrapper` }>
                                <Spin />
                            </div>
                        ) : (
                            <QDetail 
                                answerCount = { data.getIn(['answerCount']) }
                                collectedCount = { data.getIn(['collectedCount']) }
                                userName = { data.getIn(['user', 'name']) }
                                userProfile = { data.getIn(['user', 'profile']) }
                                content = { data.getIn(['content']) }
                                updateTime = { data.getIn(['updateTime']) }
                                answerHandler = { this.showAnswer }
                                concernHandler = { this.doConcern }
                                inviteHandler = { this.showInvite }
                                shareHandler = { this.showShare }
                            />
                        )
                    }
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

