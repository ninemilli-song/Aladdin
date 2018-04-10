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
const Checkbox = require('antd/lib/checkbox/Checkbox');
const Button = require('antd/lib/button/button');

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
        placeholder: '问题描述',
        onChange: this.handleBraftEditorChange,
        onRawChange: this.handleBraftEditorRawChange,
        controls: [
            'undo', 'redo', 'split', 'bold', 'emoji', 'text-align', 'split', 'list_ul',
            'list_ol', 'blockquote', 'code', 'split', 'link', 'split', 'hr', 'split', 'clear'
        ]
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <Form onSubmit = { this.onSubmit }>
                    <FormItem
                    >
                        {
                            getFieldDecorator('title', {})(
                                <Input placeholder="标题" id="title" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('category', {})(
                                <Input placeholder="类型" id="category" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('description', {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (!value || value === '<p></p>') {
                                                callback('说说您的问题吧！');
                                            }

                                            callback();
                                        }
                                    }
                                ]
                            })(
                                <div className={ `${this.prefixCls}-braft-wrapper` }>
                                    <BraftEditor {...this.braftEditorProps} />
                                </div>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('anonymous', {
                                initialValue: false,
                            })(
                                <Checkbox
                                    onChange={ this.handleAnonymousChecked }
                                >
                                    匿名提问
                                </Checkbox>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <div style={ {textAlign: 'center'} }>
                            <Button type="primary" htmlType="submit">发布问题</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        )
    }

    handleBraftEditorChange() {

    }

    handleBraftEditorRawChange() {

    }

    handleAnonymousChecked(e) {
        const { form } = this.props;

        form.setFieldsValue({
            anonymous: e.target.checked,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                console.log('form get value ------> ', values);
            }
        });
    }
}

const PushQuestionForm = Form.create()(QuestionForm);

export default PushQuestionForm;