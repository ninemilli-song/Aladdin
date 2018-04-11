import * as React from 'react';
import './style.scss';

interface CutLineProps {

}

export default class CutLine extends React.Component<CutLineProps, any> {

    prefixCls = 'cut-line';

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className={ `${this.prefixCls}` }></div>
        )
    }
}
