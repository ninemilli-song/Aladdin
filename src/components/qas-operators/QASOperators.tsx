/**
 * 问答操作相关的按钮组件
 */
import * as React from 'react';
import { ActionButton } from '../button/index';
import { formateNumberCount } from '../../utils/utils';
import './assets/index.scss';

interface Operator {
    iconName: string;                   // 图标名
    label: string;                      // 显示文字
    callback: () => void;               // 回调方法
}

interface QASOperatorsProps {
    operators: Array<Operator>;
}

export class QASOperators extends React.Component<QASOperatorsProps, any> {

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
                                onClick={ () => { item.callback() } }
                            >
                                <ActionButton
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
