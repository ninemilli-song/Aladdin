import * as React from 'react';
import Body from './Body';
import SecondarySearchNav from '../../../components/page-components/SecondarySearchNav';
import '../assets/style.scss';

interface QASProps {
    action?: any,
    store?: any
}

export default class QAS extends React.Component<QASProps, any> {

    prefixCls = 'qas';

    componentWillMount() {
        const { action } = this.props;
        console.log('QAS ------> action', action);
        action.getQuestionList();
    }

    render() {
        const {action, store} = this.props;
        console.log('QAS ------> store', store);

        return (
            <div className={ this.prefixCls }>
                <div className={ `layout-content` }>
                    <SecondarySearchNav 
                        title="问答"
                    />
                    <Body />
                </div>
            </div>
        )
    }
}
