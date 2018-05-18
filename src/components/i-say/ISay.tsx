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
    expand?: boolean;                           // 是否展开
    value?: string;                             // 内容
}

@autobind
export default class ISay extends React.PureComponent<ISayProps, any> {

    prefixCls = 'i-say';

    // The Textarea dom
    textarea: any = null;

    static defaultProps = {
        placeholder: '有问题在这儿说说…',
        title: '提问',
        className: '',
        expand: false,
    }

    constructor(props: ISayProps, context) {
        super(props, context);

        this.state = {
            expand: !!props.expand,                       // 是否展开
            value: props.value ? props.value : null       // 内容
        }
    }

    componentWillReceiveProps(nextProps: ISayProps) {
        this.init(nextProps);
    }

    /**
     * 初始化
     * @param props 
     */
    private init(props: ISayProps) {
        const { expand, value } = props;

        this.setState({
            expand: !!expand,
            value: value ? value : null
        })
    }

    render() {
        const { className, placeholder, title } = this.props;
        const { expand, value } = this.state;

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
                    <TextArea
                        placeholder = { placeholder }
                        rows = { expand ? 4 : 1 }
                        onFocus = { this.textAreaOnFocus }
                        onBlur = { this.textAreaOnBlur }
                        ref = { this.getTextareaRef }
                        value = { value }
                        onChange = { this.handleChange }
                    />
                </div>
                {
                    expand ? this.renderFooter() : null
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
            expand: true
        });
    }

    private textAreaOnBlur() {
        // // fold the textarea
        // this.setState({
        //     mode: 'fold'
        // });
    }

    private getTextareaRef(textarea) {
        this.textarea = textarea;
    }

    private onSubmit(evt) {
        const { onSubmit } = this.props;
        const data = this.textarea.textAreaRef.value;

        if (onSubmit && data) {
            onSubmit(data);
        }
    }

    private handleChange (e) {
        const value = e.target.value;

        if (value) {
            this.setState({
                value
            })
        }
    }
}
