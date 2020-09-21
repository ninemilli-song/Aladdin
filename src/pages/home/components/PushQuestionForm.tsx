/**
 * 提问表单
 */
import * as React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { autobind } from 'core-decorators';
import TextEditor from '../../../components/text-editor/TextEditor';

const formItemLayout = {
    labelCol: {
        span: 5 
    },
    wrapperCol: {
        span: 19
    },
};

interface PushQuestionFormProps {
    onSubmit?: Function;            // 表单提交
}

@autobind
class QuestionForm extends React.Component<PushQuestionFormProps, any> {

    prefixCls = 'qas-dialog-form';

    constructor(props, context) {
        super(props, context);
    }

    render() {
        // const { form } = this.props;
        // const { getFieldDecorator } = form;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <Form
                    // onSubmit = { this.onSubmit }
                >
                    <Form.Item
                    >
                        {/*{*/}
                        {/*    getFieldDecorator('title', {})(*/}
                        {/*        <Input placeholder="标题" id="title" />*/}
                        {/*    )*/}
                        {/*}*/}
                    </Form.Item>
                    <Form.Item>
                        {/*{*/}
                        {/*    getFieldDecorator('tag', {})(*/}
                        {/*        <Input placeholder="标签" id="tag" />*/}
                        {/*    )*/}
                        {/*}*/}
                    </Form.Item>
                    <Form.Item>
                        {/*{*/}
                        {/*    getFieldDecorator('question', {*/}
                        {/*        rules: [*/}
                        {/*            {*/}
                        {/*                validator: (rule, value, callback) => {*/}
                        {/*                    if (!value || value === '<p></p>') {*/}
                        {/*                        callback('说说您的问题吧！');*/}
                        {/*                    }*/}

                        {/*                    callback();*/}
                        {/*                }*/}
                        {/*            }*/}
                        {/*        ]*/}
                        {/*    })(*/}
                        {/*        <TextEditor />*/}
                        {/*    )*/}
                        {/*}*/}
                    </Form.Item>
                    <Form.Item>
                        {/*{*/}
                        {/*    getFieldDecorator('isAnonymous', {*/}
                        {/*        initialValue: false,*/}
                        {/*    })(*/}
                        {/*        <Checkbox*/}
                        {/*            onChange={ this.handleAnonymousChecked }*/}
                        {/*        >*/}
                        {/*            匿名提问*/}
                        {/*        </Checkbox>*/}
                        {/*    )*/}
                        {/*}*/}
                    </Form.Item>
                    <Form.Item>
                        <div style={ {textAlign: 'center'} }>
                            <Button type="primary" htmlType="submit">发布问题</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    handleBraftEditorChange() {

    }

    handleBraftEditorRawChange() {

    }

    handleAnonymousChecked(e) {
        // const { form } = this.props;

        // form.setFieldsValue({
        //     anonymous: e.target.checked,
        // });
    }

    onSubmit(e) {
        e.preventDefault();
        // const { form, onSubmit } = this.props;

        // form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('form get value ------> ', values);
        //         onSubmit(values);
        //     }
        // });
    }
}

// const PushQuestionForm = Form.create()(QuestionForm);

export default QuestionForm;
