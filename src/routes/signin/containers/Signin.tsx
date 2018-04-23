/**
 * 登陆页面
 */
import * as React from 'react';
import { connect } from 'react-redux';

interface SigninProps {
    userName?: string;
    isAuthenticated?: boolean;
}

@connect(
    store => (
        {
            userName: store.userInfo.name,
            isAuthenticated: store.userInfo.isAuthenticated
        }
    ),
    dispatch => (
        {}
    )
)
export default class Signin extends React.Component<SigninProps, any> {

    prefixCls = 'sigin';

    render() {
        const { userName, isAuthenticated } = this.props;

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                {
                    `${ userName } isAuthenticated ====> ${ isAuthenticated } `
                }
            </div>
        )
    }
}
