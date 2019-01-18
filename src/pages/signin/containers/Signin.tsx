/**
 * 登陆页面
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { signin } from '../actions';
import { Form, Button, Input, Checkbox } from 'antd';
const FormItem =  Form.Item;
import * as storage from '../../../utils/storage';
import '../assets/style.scss';
import { getUserInfo, logout } from '../../../actions/user';
import { getCookie } from '../../../utils/cookie';

interface SigninProps {
    userName?: string;
    isAuthenticated?: boolean;
    signin?: Function;
    logout?: Function;
    form?: any;
    context?: any;
    params?: any;                       // 路由中带入参数
}

@connect(
    store => (
        {
            mobile: store.userInfo.mobile,
            isAuthenticated: store.userInfo.isAuthenticated
        }
    ),
    dispatch => (
        {
            signin: (mobile, password) => {
                dispatch(signin(mobile, password));
            },
            getUserInfo: () => {
                dispatch(getUserInfo());
            },
            logout: () => {
                dispatch(logout());
            }
        }
    )
)
class Signin extends React.Component<SigninProps, any> {

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
        const { params } = this.props;
    
        const mobile = storage.getStorage('MOBILE');
        const password = storage.getStorage('PASSWORD');
    
        this.setState({
            mobile,
            password
        });

        const isAuthenticated = getCookie('aladdin-is-authenticated');
        // if (this.props.isAuthenticated) {
        if (isAuthenticated) {
            const path = params.path ? params.path : '';
            window.open(`/${path}`, '_self');
        } else {
            // this.props.logout();
        }
    }

    componentWillUpdate(nextProps) {
        const { params } = this.props;
        const isAuthenticated = getCookie('aladdin-is-authenticated');
        // if (nextProps.isAuthenticated) {
        if (isAuthenticated) {
            // const { location } = nextProps;
            // const { query } = location;

            // console.log('aaa goback');
            // if (query.from) {
            //     browserHistory.replace(query.from);
            // } else {
            //     browserHistory.goBack();
            //     // browserHistory.push('/');
            // }

            const path = params.path ? params.path : '';
            window.open(`/${path}`, '_self');
        }
    }

    render() {
        const { form, context } = this.props;

        console.log('signin context ======> ', this.props);
      
        const {
            getFieldDecorator
        } = form;
      
        const {
            mobile,
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
                                    getFieldDecorator('mobile', {
                                        initialValue: mobile,
                                        rules: [{ required: true, message: '请输入您注册手机号!'}]
                                    })(
                                        <Input
                                            placeholder="手机号/邮箱"
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
            await this.props.signin(values.mobile, values.password)
    
            // if (this.props.error) {
            //   message.error(this.props.error)
            // } else {
            //   message.success('登陆成功')
            // }
    
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

export default Form.create()(Signin);
