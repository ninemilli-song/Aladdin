import * as React from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

@connect(
    (store, ownProps) => {
        return {
            data: store.QAS.get('myAggregate')
        }
    },
    dispatch => {
        return {
            action: {

            }
        }
    }
)
@autobind
export default class MyPanel extends React.Component<any, any> {

    prefixCls = 'qas-my-panel';

    render() {
        return(
            <div className={ `${this.prefixCls}` }>
                <ul className={ `${this.prefixCls}-aggregate` }>
                    <li className={ `${this.prefixCls}-aggregate-item` }>
                        <a target="_blank" href="">
                            <i className={`icon iconfont icon-my-collection ${this.prefixCls}-aggregate-item-icon`}></i>
                            <span className={ `${this.prefixCls}-aggregate-item-text` }>我的收藏</span>
                            <span className={ `${this.prefixCls}-aggregate-item-num` }>10</span>
                        </a>
                    </li>
                    <li className={ `${this.prefixCls}-aggregate-item` }>
                        <a target="_blank" href="">
                            <i className={`icon iconfont icon-my-concern ${this.prefixCls}-aggregate-item-icon`}></i>
                            <span className={ `${this.prefixCls}-aggregate-item-text` }>我关注的问题</span>
                            <span className={ `${this.prefixCls}-aggregate-item-num` }>10</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}
