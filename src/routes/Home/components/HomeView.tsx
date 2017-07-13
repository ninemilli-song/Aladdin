import * as React from 'react'
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import {BasePage} from '../../../components/page-frame';

export interface HomeProps  {

}

class Home extends BasePage<HomeProps> {

    constructor(props, context) {
        super(props, context);
    }

    renderContent() {
        return (
            <span>
                Hello!!! Home page!
            </span>
        )
    }
}

export default Home;
