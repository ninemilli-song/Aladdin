/**
 * Create by songxg 2018/03/31
 * 科目
 */
import * as React from 'react';
import Collapse from 'antd/lib/collapse/Collapse';
import index from '../../Home';
const Panel = Collapse.Panel;

type UsageType = {
    id: number,
    content: string,
}

export interface SubjectItemProps {
    id: number,
    name: string,
    code: string,
    usages: Array<UsageType>,
}

export default class SubjectItem extends React.Component<SubjectItemProps, any> {

    prefixCls = 'subjectItem';

    render() {
        const { id, name, code, usages } = this.props;

        const useageNode = usages.map((item, index) => {
            return (
                <p>
                    {
                        item.content
                    }
                </p>
            )
        });

        return (
            <div className={ `${this.prefixCls}-wrapper` }>
                <Collapse bordered={ false } defaultActiveKey={ [`${this.prefixCls}-${id}`] }>
                    <Panel 
                        header={ `${name}` }
                        key={ `${this.prefixCls}-${id}` }
                    >
                        <p>
                            {
                                useageNode
                            }
                        </p>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}
