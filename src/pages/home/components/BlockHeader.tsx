/**
 * The header of Block
 */
import * as React from 'react';

interface BlockHeaderProps {
    // 标题
    title: string;

    // 详情页地址
    moreLink?: string;
}

export default class BlockHeader extends React.Component<BlockHeaderProps, any> {

    prefixCls = 'block-header';

    render() {
        const { title, moreLink } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <span className={`${this.prefixCls}-title`}>
                    {title}
                </span>
                {
                    moreLink ? (
                        <span className={`${this.prefixCls}-more`}>
                            <a 
                                href={`${moreLink}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                更多…
                            </a>
                        </span>
                    ) : null
                }
            </div>
        )
    }
} 
