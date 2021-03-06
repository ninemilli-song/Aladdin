/**
 * Author: ninemilli.song
 * 用户登录表单
 */
import * as React from 'react';
import { autobind } from 'core-decorators';
import { Form, Button, Input, Checkbox } from 'antd';
import * as storage from '../../utils/storage';

interface LoginFormProps {
    form?: any;
    onSubmit: (mobile: string, password: string) => void;
}

@autobind
class LoginForm extends React.Component<LoginFormProps, any> {

    prefixCls = 'login-form';

    constructor(props, context) {
        super(props, context);

        this.state = {
            mobile: '',
            password: ''
        }
    }

    componentWillMount() {    
        const mobile = storage.getStorage('MOBILE');
        const password = storage.getStorage('PASSWORD');
    
        this.setState({
            mobile,
            password
        });
    }

    render() {
        const { form } = this.props;

        const {
            getFieldDecorator
        } = form;

        const {
            mobile,
            password
        } = this.state;

        return(
            <div className={ `${this.prefixCls}-wrapper` }>
                <p>请使用您的账号密码登录系统</p>
                    <Form
                        // onFinish={this.onSubmit}
                    >
                        <Form.Item>
                            {
                                getFieldDecorator('mobile', {
                                    initialValue: mobile,
                                    rules: [{ required: true, message: '请输入您注册手机号!'}]
                                })(
                                    <Input
                                        placeholder="手机号/邮箱"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    initialValue: password,
                                    rules: [{ required: true, message: '请输入密码!'}]
                                })(
                                    <Input
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox style={{color: '#fff'}}>记住密码</Checkbox>
                                )
                            }
                            <a className="login-form-forgot">
                                忘记密码？
                            </a>
                            <Button
                                className="btn-login"
                                type="primary"
                                htmlType="submit"
                            >
                                {
                                    // isFetching ? (
                                    //     <Spin />
                                    // ) : ''
                                }
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                <p>
                    您还未注册？请 <a href="">注册</a>
                </p>
            </div>
        )
    }

    onSubmit(e) {
        const { form, onSubmit } = this.props;

        e.preventDefault();
    
        form.validateFields(async (err, values) => {
          if (!err) {
            onSubmit(values.mobile, values.password);
    
            if (values.remember === true) {
              storage.setStorage('MOBILE', values.mobile)
              storage.setStorage('PASSWORD', values.password)
            } else {
              storage.removeStorage('MOBILE')
              storage.removeStorage('PASSWORD')
            }
          }
        })
    }
}

export default LoginForm;
