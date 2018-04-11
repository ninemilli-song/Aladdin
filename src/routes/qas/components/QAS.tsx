import * as React from 'react';
import Body from './Body';
import SecondarySearchNav from '../../../components/page-components/SecondarySearchNav';
import '../assets/style.scss';
import { autobind } from 'core-decorators';
import PushQuestionDialog from './PushQuestionDialog';

/**
 * UI 状态定义
 */
type QASUIState = {
    pushQuestionDialogVisible: boolean,     // 提问弹框是否可见
    pushQuestionDialogLoading: boolean,     // 提问弹框是否为loading状态
}

// /**
//  * 数据状态定义
//  */
// type QASData = {
//     QList: QList,                           // 问题列表
// }

// /**
//  * 状态定义
//  */
// type QASStore = {
//     uistate: QASUIState,                    // ui 状态
//     data: QASData,                          // 数据
// }

/**
 * 行为定义
 */
type QASAction = {
    getQuestionList?: Function,             // 获取提问列表
    togglePushQuestionDialogVisible?: Function,        // 切换提问弹框显示 隐藏
}

interface QASProps {
    action?: QASAction,
    store?: any,
}

@autobind
export default class QAS extends React.Component<QASProps, any> {

    prefixCls = 'qas';

    // store: QASStore;

    componentWillMount() {
        const { action, store } = this.props;
        console.log('QAS ------> action', action);
        action.getQuestionList();

        // this.store = store.toJS();
    }

    componentWillUpdate(nextProps: QASProps, nextState) {
        // const { store } = nextProps;
        // this.store = store.toJS();
    }

    render() {
        const { action, store } = this.props;
        // const { uistate, data } = this.store;
        console.log('QAS ------> store', store);

        return (
            <div className={ this.prefixCls }>
                <div className={ `layout-content` }>
                    <SecondarySearchNav 
                        title = "问答"
                        buttonTitle = "我要提问"
                        onButtonClick = { this.toggleQuestionDialog }
                    />
                    <Body
                        questions = { store.getIn(['data', 'QList']) }
                    />
                    <PushQuestionDialog 
                        visible = { store.getIn(['uistate', 'pushQuestionDialogVisible']) }
                        loading = { store.getIn(['uistate', 'pushQuestionDialogLoading']) }
                        onSubmit = { this.onSubmitQuestion }
                        onCancel = { this.toggleQuestionDialog }
                    />
                </div>
            </div>
        )
    }

    /**
     * 我要提问弹框
     */
    toggleQuestionDialog() {
        const { action } = this.props;

        action.togglePushQuestionDialogVisible();
    }

    /**
     * 提交提问
     */
    onSubmitQuestion() {

    }
}
