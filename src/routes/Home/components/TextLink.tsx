/**
 * Text link
 */
import * as React from 'react';

interface TextLinkProps {
    // text
    text?: string;
    // link address
    link?: string;
}

export default class TextLink extends React.Component<TextLinkProps, any> {

    prefixCls = 'text-link';

    static defaultProps = {
        text: 'The man with bold earrings and mustache',
        link: 'www.google.com',
    }

    render() {
        const { text, link } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <a href={`${link}`}>{text}</a>
            </div>
        )
    }
}
