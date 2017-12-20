import * as React from 'react';

const _ = {
    uniqueId: require('lodash/uniqueId')
}

interface ISayProps {
    className: string;
}

export default class ISay extends React.Component<ISayProps, any> {
    prefixCls = 'i-say';

    render() {
        const { className } = this.props;

        return (
            <div className={ `${this.prefixCls} ${className}`  }>
                <textarea name="i-say" id={ _.uniqueId(this.prefixCls) } cols={30} rows={10}></textarea>
            </div>
        )
    }
}
