import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
import SecondaryNav from '../page-components/SecondaryNav';

interface BasePageProps {

}

export default class BasePage<T extends BasePageProps> extends React.Component<T, any> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <SecondaryNav />
                <div className="layout-content">
                    <div>
                        <Row gutter={8}>
                            <Col span={16}>
                                {this.renderContent()}
                            </Col>
                            <Col span={8}>
                                {this.renderSide()}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    protected renderContent() {
        return (
            <div>BasePage default content......</div>
        )
    }

    protected renderSide() {
        return (
            <div>BasePage default side......</div>
        )
    }
}
