/**
 * 问题组件
 */
import * as React from 'react';
const Avatar = require('antd/lib/avatar');

interface QuestionProps {
    data: any;
}

export default class Question extends React.PureComponent<QuestionProps, any> {

    prefixCls = 'qas-question';

    render() {
        const { data } = this.props;

        const user = data ? data.get('user') : null;
        const modifyTime = data ? data.get('modifyTime') || data.get('createTime') : null;
        const title = data ? data.get('title') : '';
        const question = data ? data.get('question') || data.get('answer') : '';

        return (
            <div className={ `${this.prefixCls}` }>
                <div className={ `${this.prefixCls}-user` }>
                    {
                        user ? (
                            <div className="profile">
                                <Avatar 
                                    size = "large"
                                    icon = "user"
                                    src = { user.get('profile') || null }
                                />
                            </div>
                        ) : null
                    }
                    {
                        user ? (
                            <span className="name">
                                { user.get('nickName') || null }
                            </span>
                        ) : null
                    }
                    {
                        modifyTime ? (
                            <span className="updateDate">
                                • { modifyTime }
                            </span>
                        ) : null
                    }
                </div>
                {
                    title ? (
                        <div className={ `${this.prefixCls}-title` }>
                            <span>
                                { title }
                            </span>
                        </div>
                    ) : null
                }
                { question ? (
                        <div 
                            className={ `${this.prefixCls}-text` } 
                            dangerouslySetInnerHTML={{ __html: question }}
                        />
                    ) : null 
                }
            </div>
        )
    }
}
