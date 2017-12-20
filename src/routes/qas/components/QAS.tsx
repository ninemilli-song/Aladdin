import * as React from 'react';
import Body from './Body';
import SearchHeader from '../../../components/page-components/SearchHeader';

interface QASProps {
    
}

export default class QAS extends React.Component<QASProps, any> {
    prefixCls: 'qas';

    render() {
        return (
            <div className={ this.prefixCls }>
                <div className={ `layout-content` }>
                    <SearchHeader 
                        title="问答"
                    />
                    <Body />
                </div>
            </div>
        )
    }
}
