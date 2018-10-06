/**
 * The item of Block list
 */
import * as React from 'react';

interface BlockBodyItemProps {
    // The image to preview of the item
    showImg?: string;

    // The title of the item
    title: string;
    
    // The content text of the item
    contentText?: string;

    // The comment of the item
    comment?: string;
}

export default class BlockBodyItem extends React.Component<BlockBodyItemProps, any> {

    // The prefix classname of the component
    prefixCls = 'block-body-item';

    static defaultProps = {
        // tslint:disable-next-line:max-line-length
        showImg: 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/21985097_155852271671269_5355077937479548928_n.jpg',
        title: 'DefalutTitle',
        // tslint:disable-next-line:max-line-length
        contentText: 'The man with bold earrings and mustache who offered us butter is named Tundu….he loads yak meat and potatoes on the four remaining yaks and dzos that stand hobbled in front of the gompa. With their short noses and short fluffy tails, yaks have an appealing air, but they are shaggy brutes of a half-ton or better, with rude temperaments to match….Tundu is firm and gentle with the balky animals, talking to them in a soft no-nonsense way as he straps on pack saddles of wood and leather, hoists cargo sacks of striped brown-and-white homespun, and lashes down the lot with braided rope. There is a quiet in his actions that gives him a strong presence, apparently he is the headman here…” From “The Snow Leopard” by Peter Matthiessen On this day last year, Dolpo men load their yaks with wooden planks below Shey Gompa in #Dolpo, a remote region of northwestern #Nepal. The wood was cut in forests several days walk away, and the men are transporting it to their village in treeless Upper Dolpo',
        comment: 'thephotosocietyPhoto by @bethjwald'
    }

    render() {
        const { showImg, title, contentText, comment } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <div className={`${this.prefixCls}-showImg`}>
                    <img src={`${showImg}`} alt=""/>
                </div>
                <div className={`${this.prefixCls}-content`}>
                    <div className="title">
                        <span>
                            { title }
                        </span>
                    </div>
                    <div className="content">
                        { contentText }
                    </div>
                    {
                        comment ? (
                            <div className="comment">
                                { comment }
                            </div>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
