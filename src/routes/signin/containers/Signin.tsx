/**
 * 登陆页面
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signin } from '../actions';
const Form = require('antd/lib/form/Form');
const FormItem =  require('antd/lib/form/FormItem');
const Button = require('antd/lib/button/button');
import { FormComponentProps } from 'antd/lib/form/Form';
const Input = require('antd/lib/input/Input');
const Checkbox = require('antd/lib/checkbox/Checkbox');
const message = require('antd/lib/message');
import * as storage from '../../../utils/storage';
import '../assets/style.scss';
import { getUserInfo } from '../../../actions/user';
import { getCookie } from '../../../utils/cookie';

interface SigninProps {
    userName?: string;
    isAuthenticated?: boolean;
    signin?: Function;
    form?: any;
    context?: any;
}

@connect(
    store => (
        {
            userName: store.userInfo.name,
            isAuthenticated: store.userInfo.isAuthenticated
        }
    ),
    dispatch => (
        {
            signin: (name, password) => {
                dispatch(signin(name, password));
            },
            getUserInfo: () => {
                dispatch(getUserInfo());
            }
        }
    )
)
@Form.create()
export default class Signin extends React.Component<SigninProps, any> {

    prefixCls = 'sigin';

    constructor(props, context) {
        super(props, context);

        // // 获取用户信息
        // const { getUserInfo } = props;
        // getUserInfo();
    }

    componentWillMount() {
        // if (this.props.location.state) {
        //   message.warning(this.props.location.state.message)
        // }
    
        const username = storage.getStorage('USERNAME')
        const password = storage.getStorage('PASSWORD')
    
        this.setState({
            username,
            password
        });

        const isAuthenticated = getCookie('aladdin-is-authenticated');
        // if (this.props.isAuthenticated) {
        if (isAuthenticated) {
            browserHistory.goBack();
        }
    }

    componentWillUpdate(nextProps) {
        const isAuthenticated = getCookie('aladdin-is-authenticated');
        // if (nextProps.isAuthenticated) {
        if (isAuthenticated) {
            const { location } = nextProps;
            const { query } = location;

            if (query.from) {
                browserHistory.replace(query.from);
            } else {
                browserHistory.goBack();
            }
        }
    }

    render() {
        const { userName, form, context } = this.props;

        console.log('signin context ======> ', this.props);
      
        const {
            getFieldDecorator
        } = form;
      
        const {
            username,
            password
        } = this.state;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <div className="page page-login vertical-align">
                    <div className="page-content vertical-align-middle">
                        {/* <div className="brand">
                            <img src={ logo } alt="..."/>
                            <h2 className="brand-text">
                                { WEBSITE_NAME }
                            </h2>
                        </div> */}
                        <p>请使用您的账号密码登录系统</p>
                        <Form
                            style={{textAlign: 'left'}}
                            onSubmit={this.handleSubmit}
                        >
                            <FormItem>
                                {
                                    getFieldDecorator('username', {
                                        initialValue: username,
                                        rules: [{ required: true, message: '请输入您的账号!'}]
                                    })(
                                        <Input
                                            placeholder="账号"
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem>
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
                            </FormItem>
                            <FormItem>
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
                            </FormItem>
                        </Form>
                        <p>
                            您还未注册？请 <a href="">注册</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
    
        this.props.form.validateFields(async (err, values) => {
          if (!err) {
            await this.props.signin(values.username, values.password)
    
            // if (this.props.error) {
            //   message.error(this.props.error)
            // } else {
            //   message.success('登陆成功')
            // }
    
            if (values.remember === true) {
              storage.setStorage('USERNAME', values.username)
              storage.setStorage('PASSWORD', values.password)
            } else {
              storage.removeStorage('USERNAME')
              storage.removeStorage('PASSWORD')
            }
          }
        })
    }
}
