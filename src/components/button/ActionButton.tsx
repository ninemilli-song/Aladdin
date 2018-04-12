import * as React from 'react';
import { autobind } from 'core-decorators';
const classNames = require('classnames');
import './actionButton.scss';

interface ActionButtonProps {
    className?: string;                 // 自定义样式名
    iconName?: string;                  // 图标名
    label?: string;                     // 显示文字内容
    title?: string;                     // html title
    onClick?: () => void;               // 点击事件
}

@autobind
export default class ActionButton extends React.Component<ActionButtonProps, any> {

    prefixCls = 'action-button';

    render() {
        const { className, iconName, label, title } = this.props;

        const cls = classNames(this.prefixCls, className);

        return (
            <div
                className = { cls }
                title = { title }
                onClick = { this.handleClick }
            >
                <i className={`icon iconfont ${ iconName }`}></i>
                <span className={ `${this.prefixCls}-label` }>
                    { label }
                </span>
            </div>
        )
    }

    handleClick() {
        const { onClick } = this.props;

        if (onClick) {
            onClick();
        }
    }
}
