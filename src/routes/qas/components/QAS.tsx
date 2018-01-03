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
    }

    render() {
        return (
            <div className={ this.prefixCls }>
                <div className={ `layout-content` }>
                    <SecondarySearchNav 
                        title="问答1"
                    />
                    <Body />
                </div>
            </div>
        )
    }
}
