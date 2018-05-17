import * as React from 'react';
import { connect } from 'react-redux';
import SecondarySearchNav from '../../../components/page-components/SecondarySearchNav';
import '../assets/style.scss';
import { autobind } from 'core-decorators';
import BackTop from '../../../components/backtop';
// import PushQuestionDialogContainer from '../containers/PushQuestionDialogContainer';
import AskQuestionDialog from '../containers/AskQuestionDialog';
import ISay from '../../../components/i-say/ISay';
import QList from './QList';
import { getQuestionList, togglePushQuestionDialogVisible } from '../actions/index';
import MainSider from '../../../components/page-frame/MainSider';

@connect(
    store => ({}),
    dispatch => {
        return {
            action: {
                getQuestionList: () => {
                    dispatch(getQuestionList());
                },
                togglePushQuestionDialogVisible: () => {
                    dispatch(togglePushQuestionDialogVisible());
                }
            },
        }
    }
)
@autobind
export default class QAS extends React.Component<any, any> {

    prefixCls = 'qas';

    // store: QASStore;

    componentWillMount() {
        const { action } = this.props;
        console.log('QAS ------> action', action);
        action.getQuestionList();
    }

    render() {
        const { action } = this.props;

        return (
            <div className={ this.prefixCls }>
                <div className={ `layout-content` }>
                    <SecondarySearchNav 
                        title = "问答"
                        buttonTitle = "我要提问"
                        onButtonClick = { this.showQuestionDialog }
                    />
                    <MainSider
                        main = { this.renderMainContent() }
                    />
                    <AskQuestionDialog />
                    <BackTop />
                </div>
            </div>
        )
    }

    renderMainContent() {
        return (
            <div className={ `${this.prefixCls}-body` }>
                <div className={ `${this.prefixCls}-say` }>
                    <ISay />
                </div>
                <QList />
            </div> 
        )
    }

    /**
     * 我要提问弹框
     */
    showQuestionDialog() {
        const { action } = this.props;

        action.togglePushQuestionDialogVisible();
    }

    /**
     * 提交提问
     */
    onSubmitQuestion() {

    }
}
