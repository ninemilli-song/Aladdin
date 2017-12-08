/**
 * The detail content of Block
 */
import * as React from 'react';
import BlockBodyItem from './BlockBodyItem';
import TextLink from './TextLink';

type BlockBodyData = {
    image: string;
    title: string;
    content: string;
    comment: string;
    link: string;
}

export enum BlockItemMode {
    NORMAL = 1,
    TEXTLINK,
}

export interface BlockBodyProps {
    data?: Array<BlockBodyData>;
    mode?: BlockItemMode;
}

export default class BlockBody extends React.Component<BlockBodyProps, any> {

    // The prefix classname
    prefixCls = 'block-body';

    static defaultProps = {
        data: [
        ],
        mode: BlockItemMode.NORMAL
    };

    render() {
        const { data, mode } = this.props;
        const list = [];

        if (mode === BlockItemMode.NORMAL) {
            data.forEach(item => {
                list.push(
                    <BlockBodyItem 
                        key = { item.title }
                        title = { item.title }
                    />
                );
            });
        } else if (mode === BlockItemMode.TEXTLINK) {
            data.forEach((item, index) => {
                list.push(
                    <TextLink 
                        key = { index }
                        text = { item.content }
                        link = { item.link }
                    />
                );
            });
        }

        return (
            <div className={`${this.prefixCls}`}>
                { list }
            </div>
        )
    }
}
