import * as React from 'react';
import { SecondaryNav } from '../../../components/page-components';
import Rules from './Rules';
import { autobind } from 'core-decorators';
const Row = require('antd/lib/grid/row');
const Col = require('antd/lib/grid/col');

export interface HomeProps  {
    store: any;
    action: {[key: string]: Function};
}

@autobind
class Home extends React.Component<HomeProps, any> {

    title = '财会';

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        // Get Filter Data
        this.getFilterOptions();
        // Get Channels Data
        this.getChannels();
    }

    render() {
        const { store } = this.props;
        const { channels } = store;
        const prefixCls = 'accounting-help-home';

        const contentComponent = this.getContent();

        return (
            <div className={prefixCls}>
                <SecondaryNav 
                    title = {this.title}
                    menuConfig = { channels }
                    onClick = { this.onMenuSelected }
                />
                <div className="layout-content">
                    {
                        contentComponent
                    }
                </div>
            </div>
        )
    }

    getContent() {
        const { store } = this.props;
        const { filterData } = store;
        console.log('accounting help home view >>>>> ', filterData);
        return (
            <div>
                <Rules 
                    filterOptions = { filterData }
                    onChange = { this.onRulesChanged }
                />
                <div className="content">

                </div>
            </div>
        )
    }

    getChannels() {
        const { action } = this.props;

        action.getChannels();
    }

    getFilterOptions() {
        const { action } = this.props;

        action.getFilterData();
    }

    onMenuSelected(item) {
        console.log('onMenuSelected >>>>>>>>>> ', item);
        const { action } = this.props;

        action.selectMenu(item.key);
    }
    
    onRulesChanged(value) {
        console.log('👉🏻 --------- onRulesChanged -------- ', value);
        const {action} = this.props;

        action.changeRole(value);
    }
}

export default Home;
