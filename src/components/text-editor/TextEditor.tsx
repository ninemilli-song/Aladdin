import * as React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import './style.scss';

interface TextEditorProps {
    // value?: string;                  // 文本内容
    onChange?: Function;             // onChange 回调
    height?: number;                 // 高度
    placeholder?: string;            // placeholder
    controls?: Array<string>;         // 富文本组件
}

export default class TextEditor extends React.PureComponent<TextEditorProps, any> {

    prefixCls: string = 'aladdin-text-editor';

    static defaultProps = {
        height: 100,
        contentFormat: 'html',
        placeholder: '问题描述',
        controls: [
            'undo', 'redo', 'split', 'bold', 'emoji', 'text-align', 'split', 'list_ul',
            'list_ol', 'blockquote', 'code', 'split', 'link', 'split', 'hr', 'split', 'clear'
        ]
    }

    render() {
        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <BraftEditor {...this.props} />
            </div>
        )
    }
}
