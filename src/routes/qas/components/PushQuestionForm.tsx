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
        height: 200,
        contentFormat: 'html',
        // initialContent: '<p>Hello World!</p>',
        onChange: this.handleBraftEditorChange,
        onRawChange: this.handleBraftEditorRawChange
    }

    render() {
        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="Validating"
                        hasFeedback
                        validateStatus="validating"
                        help="The information is being validated..."
                    >
                        <Input placeholder="I'm the content is being validated" id="validating" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Success"
                        hasFeedback
                        validateStatus="success"
                    >
                        <Input placeholder="I'm the content" id="success" />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="问题描述"
                    >
                        <BraftEditor {...this.braftEditorProps} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Fail"
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
