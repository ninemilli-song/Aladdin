import * as React from 'react';
import Body from './Body';
import SecondarySearchNav from '../../../components/page-components/SecondarySearchNav';

interface QASProps {
    
}

export default class QAS extends React.Component<QASProps, any> {
    prefixCls: 'qas';

    render() {
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
