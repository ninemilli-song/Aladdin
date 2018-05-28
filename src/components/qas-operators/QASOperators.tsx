/**
 * 问答操作相关的按钮组件
 */
import * as React from 'react';
import { ActionButton } from '../button/index';
import { formateNumberCount } from '../../utils/utils';
import './assets/index.scss';

interface Operator {
    className?: string;                  // 样式名称
    iconName: string;                    // 图标名
    label?: string;                      // 显示文字
    onClick?: (e) => void;                // 回调方法
}

interface QASOperatorsProps {
    operators: Array<Operator>;
}

export default class QASOperators extends React.Component<QASOperatorsProps, any> {

    prefixCls = 'qas-operators';

    render() {
        const { operators } = this.props;

        return(
            <ul className={ `${this.prefixCls}-wrapper` }>
                {
                    operators ? operators.map((item, index) => {
                        return (
                            <li 
                                key = { `${this.prefixCls}-${item.iconName}-${index}` }
                                onClick={ (e) => { item.onClick(e) } }
                            >
                                <ActionButton
                                    className = { item.className }
                                    iconName = { item.iconName }
                                    label = { item.label }
                                />
                            </li>
                        )
                    }) : null
                }
            </ul>
        )
    }
}
