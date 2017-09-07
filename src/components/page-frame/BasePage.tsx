import * as React from 'react';
import { Menu, Breadcrumb, Icon, Input, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

interface BasePageProps {

}

export default class BasePage<T extends BasePageProps> extends React.Component<T, any> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="layout-nav-secondary-wrapper">
                    <div className="layout-nav-secondary">
                        <div className="menu">
                            <Menu
                                mode="horizontal"
                            >
                                <Menu.Item key="mail">
                                    <a href="#/">
                                        <Icon type="mail" />
                                        home
                                    </a>
                                </Menu.Item>
                                <Menu.Item key="app" disabled>
                                    <Icon type="appstore" />
                                    disabled
                                </Menu.Item>
                                <SubMenu title={<span><Icon type="setting" />Three - Submenu</span>}>
                                    <MenuItemGroup title="Item 1">
                                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                                    </MenuItemGroup>
                                    <MenuItemGroup title="Item 2">
                                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                                    </MenuItemGroup>
                                </SubMenu>
                                <Menu.Item key="alipay">
                                    <a href="#/warehouse">
                                        仓库
                                    </a>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className="search-box">
                            <Search
                                placeholder="input search text"
                                style={{ width: 200 }}
                                onSearch={value => console.log(value)}
                            />
                        </div>
                    </div>
                </div>
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
