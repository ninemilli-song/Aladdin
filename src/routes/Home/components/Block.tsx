/**
 * Block
 */
import * as React from 'react';
import BlockHeader from './BlockHeader';
import BlockBody, { BlockItemMode } from './BlockBody';

type BlockOptions = {
    mode?: BlockItemMode;
    data: any;
}

interface BlockProps {
    // The title of Block
    title: string;

    // The detail page url
    moreLink?: string;

    // The Data
    options?: BlockOptions;
}

export default class Block extends React.Component<BlockProps, any> {

    // prefix classname
    prefixCls = 'block';

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { title, moreLink, options } = this.props;
        console.log('Block render ........ ', this);

        return (
            <div className={`${this.prefixCls}`}>
                <BlockHeader 
                    title = { title }
                    moreLink = { moreLink }
                />
                <BlockBody 
                    mode = { options.mode }
                    data = { options.data }
                />
            </div>
        )
    }
}
