/**
 * 问题 数据模型
 */

interface IQuestion {
    user: number;               // 提问者 id
    title: string;              // 标题
    description: string;        // 提问详情
    isAnonymous: boolean;       // 是否匿名
    category: number;           // 问题分类
    tag: Array<string>;        // 问题标签
}
