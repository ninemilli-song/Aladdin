/**
 * 提问表单
 */
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
const FormItem =  require('antd/lib/form/FormItem');
const Form = require('antd/lib/form/Form');
const Input = require('antd/lib/input/Input');
import { autobind } from 'core-decorators';
import TextEditor from '../../../components/text-editor/TextEditor';
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
    onSubmit?: Function;            // 表单提交
}

@autobind
class QuestionForm extends React.Component<PushQuestionFormProps, any> {

    prefixCls = 'qas-dialog-form';

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
                                <TextEditor />
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
