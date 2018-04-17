import * as React from 'react';
import './style.scss';
import { autobind } from 'core-decorators';
const TextArea =  require('antd/lib/input/TextArea');
const Button = require('antd/lib/button/button');

const _ = {
    uniqueId: require('lodash/uniqueId')
}

interface ISayProps {
    className?: string;
    onSubmit?: (data) => void;
    placeholder?: string;
    title?: string;
}

@autobind
export default class ISay extends React.Component<ISayProps, any> {

    prefixCls = 'i-say';

    // The Textarea dom
    textarea: any = null;

    static defaultProps = {
        placeholder: '有问题在这儿说说…',
        title: '提问',
        className: '',
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            mode: 'fold',  // fold or expand
        }
    }

    render() {
        const { className, placeholder, title } = this.props;
        const { mode } = this.state;

        const textStyle = mode === 'expand' ? { height: 70 } : null

        return (
            <div className={ `${this.prefixCls} ${className}`  }>
                <ul className={`${this.prefixCls}-title`}>
                    <li className={`${this.prefixCls}-title-item`}>
                        <i className="iconfont icon-message_fill"></i>
                        { title }
                    </li>
                </ul>
                <div className={`${this.prefixCls}-text`}>
                    {
                        this.renderMention()
                    }
                    {
                        this.renderError()
                    }
                    {/* <textarea 
                        name="i-say" 
                        id={ _.uniqueId(this.prefixCls) } 
                        rows={1}
                        placeholder={ placeholder }
                        style= { textStyle }
                        onFocus={ this.textAreaOnFocus }
                        ref={ this.getTextareaRef }
                    /> */}
                    <TextArea
                        placeholder = { placeholder }
                        rows = { mode === 'expand' ? 4 : 1 }
                        onFocus = { this.textAreaOnFocus }
                        onBlur = { this.textAreaOnBlur }
                        ref = { this.getTextareaRef }
                    />
                </div>
                {
                    mode === 'expand' ? this.renderFooter() : null
                }
            </div>
        )
    }

    private renderMention() {
        return (
            <p className={`highlighter ${this.prefixCls}-mention`}>
            
            </p>
        )
    }

    private renderError() {
        return (
            <p className={`highlighter ${this.prefixCls}-error`}>

            </p>
        )
    }

    private renderFooter() {
        return (
            <div className={`${this.prefixCls}-footer clearfix`}>
                <Button 
                    className="submit-btn"
                    onClick={ this.onSubmit }
                >
                    发布
                </Button>
            </div>
        )
    }

    private textAreaOnFocus() {
        // Expand the textarea
        this.setState({
            mode: 'expand'
        });
    }

    private textAreaOnBlur() {
        // fold the textarea
        this.setState({
            mode: 'fold'
        });
    }

    private getTextareaRef(textarea) {
        this.textarea = textarea;
    }

    private onSubmit(evt) {
        const { onSubmit } = this.props;
        const data = this.textarea.value;

        if (onSubmit) {
            onSubmit(data);
        }
    }
}
