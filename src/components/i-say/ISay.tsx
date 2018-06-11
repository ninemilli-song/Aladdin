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
    onFocus?: () => void;                       // 聚集时
    // onBlur?: () => void;                        // 失焦后
    placeholder?: string;
    title?: string;
    expand?: boolean;                           // 是否展开
    value?: string;                             // 内容
    submitLabel?: string;                       // 提交按钮文本
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
        const { value } = props;

        this.setState({
            value: value ? value : null
        })
    }

    componentDidUpdate() {
        const { expand } = this.props;

        // 展开后聚集于输入框
        if (expand) {
            this.textarea.focus();
        }
    }

    render() {
        const { className, placeholder, title, expand } = this.props;
        const { value } = this.state;

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
                        onPressEnter = { this.handlePressEnter }
                        onKeyUp = { this.handleKeyUp }
                        onClick = { (evt) => evt.stopPropagation() }
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
        const { submitLabel } = this.props;

        return (
            <div className={`${this.prefixCls}-footer clearfix`}>
                <Button 
                    className="submit-btn"
                    onClick={ this.onSubmit }
                >
                    { submitLabel || '发布' }
                </Button>
            </div>
        )
    }

    private textAreaOnFocus(evt) {
        evt.stopPropagation();
        const { onFocus } = this.props;
        
        if (onFocus) {
            onFocus();
        }
    }

    private textAreaOnBlur(evt) {
        // const { onBlur } = this.props;

        // if (onBlur) {
        //     onBlur();
        // }
    }

    private getTextareaRef(textarea) {
        this.textarea = textarea;
    }

    /**
     * 提交
     * @param evt 
     */
    private onSubmit(evt) {
        evt.stopPropagation();

        const { onSubmit } = this.props;
        const data = this.textarea.textAreaRef.value;

        if (onSubmit && data) {
            onSubmit(data);
        }
    }

    private handleChange (e) {
        const value = e.target.value;

        this.setState({
            value
        })
    }

    /**
     * 回车事件处理
     * @param e 
     */
    private handlePressEnter(e) {
        
    }

    /**
     * 
     */
    private handleKeyUp(e) {
        console.log('<<<<<<<< handleKeyUp >>>>>>>>', e);
    }
}
