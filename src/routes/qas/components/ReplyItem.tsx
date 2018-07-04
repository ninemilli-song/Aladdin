/**
 * 回复回答
 */
import * as React from 'react';
const Avatar = require('antd/lib/avatar');

interface ReplyItemProps {
    data: any;
    className?: string;
}

export default class ReplyItem extends React.PureComponent<ReplyItemProps, any> {

    prefixCls = 'reply-item';

    render() {
        const { data, className } = this.props;

        return (
            <div className={ className }>
                <div className={ `${this.prefixCls}-wrapper` }>
                    <div className={ `${this.prefixCls}-profile` }>
                        <div className="profile">
                            <Avatar 
                                size = "large"
                                icon = "user"
                                src = { data ? data.getIn(['user', 'photo']) : null }
                            />
                        </div>
                    </div>
                    <div className={ `${this.prefixCls}-content` }>
                        <div className={ `${this.prefixCls}-content-top` }>
                            <span className="name">
                                { data ? data.getIn(['user', 'nickName']) : '' }
                            </span>
                            <span className="updateDate">
                                • { data ? data.get('createTime') : '' }
                            </span>
                        </div>
                        <div className={ `${this.prefixCls}-content-body` }>
                            {
                                data ? data.get('content') : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
