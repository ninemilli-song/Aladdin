import * as React from 'react';
import * as classNames from 'classnames';
import { Icon } from 'antd';

interface ButtonIconProps {
    onClick?: () => void;   // Click callback of button
    icon?: string;  // The name of icon
    prefixCls?: string;
    title?: string | null; // The same as html element title
    size?: number;  // The size of button
    className?: string;
}

export default class ButtonIcon extends React.Component<ButtonIconProps, any> {

    static defaultProps = {
        onClick: () => {},
        icon: 'exclamation',
        prefixCls: 'button-icon',
        title: null,
        size: 16,
        className: '',
    }

    render () {
        const { prefixCls, icon, title, size, className } = this.props;

        const cls = classNames(prefixCls, `${prefixCls}-${size}`, className);
        return (
            <div className={ cls } title={ title } onClick={ this.onClick }>
                <Icon type={ icon } />
            </div>
        );
    }

    onClick = () => {
        const { onClick } = this.props;

        onClick();
    }
}
