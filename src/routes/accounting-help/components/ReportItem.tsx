/**
 * 账务报表 - 表格
 */
import * as React from 'react';
const showdown = require('showdown');

export interface ReportItemProps {
    id: number;
    name: string;                       // 标题名
    content: string;                    // 表格内容
}

export default class ReportItem extends React.Component<ReportItemProps, any> {

    prefixCls = 'report-item';

    // The showdown Obj to converter md string to htm string.
    mdConverter = new showdown.Converter({tables: true});

    render() {
        const { name, content } = this.props;

        const ruleHtmlText = this.mdConverter.makeHtml(content);

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <h1>
                    {
                        name
                    }
                </h1>
                <div 
                    className={ `${this.prefixCls}-text acc-table` } 
                    dangerouslySetInnerHTML={{__html: ruleHtmlText}} 
                />
            </div>
        )
    }
}
