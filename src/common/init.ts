import { createFromIconfontCN } from '@ant-design/icons';

// tslint:disable-next-line:variable-name
let MyIcon : any;

const initIconFont = () => {
    MyIcon = createFromIconfontCN({
        // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
        scriptUrl: '//at.alicdn.com/t/font_507105_pbw7eoqw1un.js', // 在 iconfont.cn 上生成
    });
}

export default initIconFont;

export { MyIcon };
