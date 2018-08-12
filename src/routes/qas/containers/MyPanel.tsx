import * as React from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { getMyAggregateData } from '../actions/index';

@connect(
    (store, ownProps) => {
        return {
            data: store.QAS.get('myAggregate'),
            isAuthenticated: store.userInfo.isAuthenticated
        }
    },
    dispatch => {
        return {
            action: {
                getData: () => {
                    dispatch(getMyAggregateData());
                }
            }
        }
    }
)
@autobind
export default class MyPanel extends React.Component<any, any> {

    prefixCls = 'qas-my-panel';

    constructor(props, context) {
        super(props, context);

        // 获取数据
        props.action.getData();
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated, action } = this.props;

        // 用户登录状态改变后 更新用户数据
        if (isAuthenticated !== nextProps.isAuthenticated) {
            action.getData();
        }
    }

    render() {
        const { data } = this.props;
        const myCollectedAnswer = data.get('myCollectedAnswer') || 0;
        const myCollectedQuestion = data.get('myCollectedQuestion') || 0;
        const myQuestion = data.get('myQuestion') || 0;

        return(
            <div className={ `${this.prefixCls}` }>
                <ul className={ `${this.prefixCls}-aggregate` }>
                    <li className={ `${this.prefixCls}-aggregate-item` }>
                        <a target="_blank" href="">
                            <i className={`icon iconfont icon-my-collection ${this.prefixCls}-aggregate-item-icon`}></i>
                            <span className={ `${this.prefixCls}-aggregate-item-text` }>我的收藏</span>
                            <span className={ `${this.prefixCls}-aggregate-item-num` }>
                                {
                                    myCollectedAnswer
                                }
                            </span>
                        </a>
                    </li>
                    <li className={ `${this.prefixCls}-aggregate-item` }>
                        <a target="_blank" href="">
                            <i className={`icon iconfont icon-my-concern ${this.prefixCls}-aggregate-item-icon`}></i>
                            <span className={ `${this.prefixCls}-aggregate-item-text` }>我关注的问题</span>
                            <span className={ `${this.prefixCls}-aggregate-item-num` }>
                                { myCollectedQuestion }
                            </span>
                        </a>
                    </li>
                    <li className={ `${this.prefixCls}-aggregate-item` }>
                        <a target="_blank" href="">
                            <i className={`icon iconfont icon-my-question ${this.prefixCls}-aggregate-item-icon`}></i>
                            <span className={ `${this.prefixCls}-aggregate-item-text` }>我提出的问题</span>
                            <span className={ `${this.prefixCls}-aggregate-item-num` }>
                                { myQuestion }
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}
