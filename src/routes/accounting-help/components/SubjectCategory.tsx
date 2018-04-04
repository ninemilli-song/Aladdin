/**
 * Create by songxg 2018/03/31
 * 科目分类
 */
import * as React from 'react';
import SubjectItem, { SubjectItemProps } from './SubjectItem';

export interface SubjectCategoryProps {
    id: number,
    accountingStandard: number,
    accElementName: string,
    accElementCode: string,
    subjects: Array<SubjectItemProps>,
}

export default class SubjectCategory extends React.Component<SubjectCategoryProps, any> {

    prefixCls = 'subjectCategory';

    render() {
        const { accElementName, accElementCode, subjects } = this.props;
        const subjectsNode = subjects.map((item, index) => {
            return (
                <SubjectItem
                    key = { `${item.id}-${index}` }
                    {
                        ...item
                    }
                />
            )
        });

        return (
            <div className={ `${ this.prefixCls }-wrapper` }>
                <div className={ `${ this.prefixCls }-title` }>
                    <h1 id={ accElementCode }>
                        { accElementName }
                    </h1>
                </div>
                <div className={ `${ this.prefixCls }-body` }>
                    {
                        subjectsNode
                    }
                </div>
            </div>
        )
    }
}
