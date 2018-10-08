import * as React from 'react';
const Button = require('antd/lib/button');
const Tag = require('antd/lib/tag');
import { increment, doubleAsync } from '../modules/counter'
export interface CounterProps  {
    increment: typeof increment,
    doubleAsync: typeof doubleAsync,
    counter: number
}
class Counter extends React.Component<CounterProps, any> {
    render() {
        return (
            <div>
                <Tag> Counter {this.props.counter}</Tag>
                <Button type="primary" onClick={() => {
                    this.props.increment()
                } }>increment!</Button>
                <Button type="primary"
                    onClick={this.props.doubleAsync}>doubleAsync</Button>
            </div>
        );
    }
}

export default Counter;
