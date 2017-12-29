import * as React from 'react';
import './style.scss';
import { autobind } from 'core-decorators';
const Button = require('antd/lib/button/button');

const _ = {
    uniqueId: require('lodash/uniqueId')
}

interface ISayProps {
    className?: string;
}

@autobind
export default class ISay extends React.Component<ISayProps, any> {
    prefixCls = 'i-say';

    constructor(props, context) {
        super(props, context);

        this.state = {
            mode: 'fold',  // fold or expand
        }
    }

    render() {
        const { className } = this.props;
        const { mode } = this.state;

        const textStyle = mode === 'expand' ? { height: 70 } : null

        return (
            <div className={ `${this.prefixCls} ${className}`  }>
                <div className={`${this.prefixCls}-text`}>
                    {
                        this.renderMention()
                    }
                    {
                        this.renderError()
                    }
                    <textarea 
                        name="i-say" 
                        id={ _.uniqueId(this.prefixCls) } 
                        rows={1}
                        placeholder="说点啥吧…"
                        style= { textStyle }
                        onFocus={ this.textAreaOnFocus }
                    />
                </div>
                {
                    mode === 'expand' ? this.renderFooter() : null
                }
            </div>
        )
    }

    renderMention() {
        return (
            <p className={`highlighter ${this.prefixCls}-mention`}>
            
            </p>
        )
    }

    renderError() {
        return (
            <p className={`highlighter ${this.prefixCls}-error`}>

            </p>
        )
    }

    renderFooter() {
        return (
            <div className={`${this.prefixCls}-footer`}>
                <Button>发布</Button>
            </div>
        )
    }

    textAreaOnFocus() {
        // Expand the textarea
        this.setState({
            mode: 'expand'
        });
    }
}
