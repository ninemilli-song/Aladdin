/**
 * 提问表单
 */
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import BraftEditor from 'braft-editor';
const FormItem =  require('antd/lib/form/FormItem');
const Form = require('antd/lib/form/Form');
const Input = require('antd/lib/input/Input');
import 'braft-editor/dist/braft.css';
import { autobind } from 'core-decorators';

const formItemLayout = {
    labelCol: {
        span: 5 
    },
    wrapperCol: {
        span: 19
    },
};

interface PushQuestionFormProps extends FormComponentProps {

}

@autobind
class QuestionForm extends React.Component<PushQuestionFormProps, any> {

    prefixCls = 'qas-dialog-form';

    braftEditorProps = {
        height: 100,
        contentFormat: 'html',
        // initialContent: '<p>Hello World!</p>',
        onChange: this.handleBraftEditorChange,
        onRawChange: this.handleBraftEditorRawChange,
        controls: [
            'undo', 'redo', 'split', 'bold', 'emoji', 'text-align', 'split', 'list_ul',
            'list_ol', 'blockquote', 'code', 'split', 'link', 'split', 'hr', 'split', 'clear'
        ]
    }

    render() {
        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <Form>
                    <FormItem>
                        <Input placeholder="标题" id="title" />
                    </FormItem>
                    <FormItem>
                        <Input placeholder="类型" id="category" />
                    </FormItem>
                    <FormItem>
                        <BraftEditor {...this.braftEditorProps} />
                    </FormItem>
                    <FormItem
                        hasFeedback
                        validateStatus="error"
                        help="Should be combination of numbers & alphabets"
                    >
                        <Input placeholder="unavailable choice" id="error" />
                    </FormItem>
                </Form>
            </div>
        )
    }

    handleBraftEditorChange() {

    }

    handleBraftEditorRawChange() {

    }
}

const PushQuestionForm = Form.create()(QuestionForm);

export default PushQuestionForm;
