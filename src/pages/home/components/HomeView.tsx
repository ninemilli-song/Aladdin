import * as React from 'react';

import {BasePage} from '../../../components/page-frame';
import SecondaryNav from '../../../components/page-components/SecondaryNav';
const Carousel = require('antd/lib/carousel');
import '../assets/style.scss';
import Block from './Block';
import { BlockItemMode } from './BlockBody';
const Row = require('antd/lib/grid/row');
const Col = require('antd/lib/grid/col');

export interface HomeProps  {
    store: any;
    action: {[key: string]: Function};
}

class Home extends React.Component<HomeProps, any> {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { action } = this.props;

        action.getQuanziData();
        action.getWendaData();
    }

    render() {
        const { store } = this.props;
        const { quanziData, wendaData } = store;
        const prefixCls = 'home';

        return (
            <div className={prefixCls}>
                <SecondaryNav />
                <div className="layout-content">
                    <div className={`${prefixCls}-banner`}>
                        <Carousel autoplay>
                            <div><h3>1</h3></div>
                            <div><h3>2</h3></div>
                            <div><h3>3</h3></div>
                            <div><h3>4</h3></div>
                        </Carousel>
                    </div>
                    <div className={`${prefixCls}-block`}>
                        <Row>
                            <Col span={ 14 }>
                                <Block 
                                    title = "圈子"
                                    moreLink = "https://www.facebook.com"
                                    options = { {
                                        data: quanziData
                                    } }
                                />
                            </Col>
                            <Col span={ 10 }>
                                <Block 
                                    title = "问答"
                                    moreLink = "https://www.facebook.com"
                                    options = { {
                                        mode:  BlockItemMode.TEXTLINK,
                                        data: wendaData,
                                    } }
                                />
                            </Col>
                        </Row>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
