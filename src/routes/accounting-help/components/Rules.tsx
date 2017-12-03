/**
 * 会计准则
 */
import * as React from 'react';
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import { AccountingFilter, AccountingFilterOptions } from '../../../components/filter';
import { autobind } from 'core-decorators';
import { FilterOptions } from '../../../components/filter/FilterItem';
import SiderNav from '../../../components/SiderNav/SiderNav';
const showdown = require('showdown');
const Input = require('antd/lib/input');

interface RulesProps extends MainSiderProps {
    prefixCls?: string,
    filterOptions?: AccountingFilterOptions,
    onChange?: (value: FilterOptions, type: string) => void,
    role?: string,  // 选中的会计制度
    year?: string,  // 选中的年份
    action: {[key: string]: Function};
}

@autobind
export default class Rules extends MainSider<RulesProps> {

    // The showdown Obj to converter md string to htm string.
    mdConverter = new showdown.Converter();

    protected renderMain()  {
        const { filterOptions, role, year } = this.props;
        const { roleOptions, yearOptions } = filterOptions;

        return (
            <div className="content">
                <AccountingFilter 
                    roleOptions = { roleOptions }
                    yearOptions = { yearOptions }
                    onChange = {this.onChange}
                    role = { role }
                    year = { year }
                />
                { this.renderText() }
            </div>
        )
    }

    protected renderSider() {
        return (
            <div className="sider-content">
                <SiderNav />
            </div>
        )
    }

    private onChange(value, type) {
        const {onChange} = this.props;

        if (onChange) {
            onChange(value, type);
        }
    }

    private renderText() {
        console.log('👉🏻 ------> test marked\n');
        const converter = new showdown.Converter();
        // tslint:disable-next-line:max-line-length
        // const text = '**第一条** 为了规范小企业会计确认、计量和报告行为，促进小企业可持续发展，发挥小企业在国民经济和社会发展中的重要作用，根据《中华人民共和国会计法》及其他有关法律和法规，制定本准则\n\n**第二条** 本准则适用于在中华人民共和国境内依法设立的、符合《中小企业划型标准规定》所规定的小型企业标准的企业。下列三类小企业除外：**（一）**股票或债券在市场上公开交易的小企业。**（二）**金融机构或其他具有金融性质的小企业。**（三）**企业集团内的母公司和子公司。*前款所称企业集团、母公司和子公司的定义与《企业会计准则》的规定相同。* **第三条** 符合本准则第二条规定的小企业，可以执行本准则，也可以执行《企业会计准则》。**（一）**执行本准则的小企业，发生的交易或者事项本准则未作规范的，可以参照《企业会计准则》中的相关规定进行处理。**（二）**执行《企业会计准则》的小企业，不得在执行《企业会计准则》的同时，选择执行本准则的相关规定。 **（三）**执行本准则的小企业公开发行股票或债券的，应当转为执行《企业会计准则》；因经营规模或企业性质变化导致不符合本准则第二条规定而成为大中型企业或金融企业的，应当从次年1月1日起转为执行《企业会计准则》。**（四）**已执行《企业会计准则》的上市公司、大中型企业和小企业，不得转为执行本准则。**第四条 **执行本准则的小企业转为执行《企业会计准则》时，应当按照《企业会计准则第38号——首次执行企业会计准则》等相关规定进行会计处理。';
        

        // const markupText = converter.makeHtml(text);
        // tslint:disable-next-line:max-line-length
        const markupText = `<p><strong>第一条</strong> 为了规范小企业会计确认、计量和报告行为，促进小企业可持续发展，发挥小企业在国民经济和社会发展中的重要作用，根据《中华人民共和国会计法》及其他有关法律和法规，制定本准则</p>
        <p><strong>第二条</strong> 本准则适用于在中华人民共和国境内依法设立的、符合《中小企业划型标准规定》所规定的小型企业标准的企业。</p>
        <p>下列三类小企业除外：
        <strong>（一）</strong>股票或债券在市场上公开交易的小企业。
        <strong>（二）</strong>金融机构或其他具有金融性质的小企业。
        <strong>（三）</strong>企业集团内的母公司和子公司。<em>前款所称企业集团、母公司和子公司的定义与《企业会计准则》的规定相同。</em> 
        <strong>第三条</strong> 符合本准则第二条规定的小企业，可以执行本准则，也可以执行《企业会计准则》。
        <strong>（一）</strong>执行本准则的小企业，发生的交易或者事项本准则未作规范的，可以参照《企业会计准则》中的相关规定进行处理。
        <strong>（二）</strong>执行《企业会计准则》的小企业，不得在执行《企业会计准则》的同时，选择执行本准则的相关规定。
        <strong>（三）</strong>执行本准则的小企业公开发行股票或债券的，应当转为执行《企业会计准则》；因经营规模或企业性质变化导致不符合本准则第二条规定而成为大中型企业或金融企业的，应当从次年1月1日起转为执行《企业会计准则》。
        <strong>（四）</strong>已执行《企业会计准则》的上市公司、大中型企业和小企业，不得转为执行本准则。</p>
        <p><strong>第四条</strong> 执行本准则的小企业转为执行《企业会计准则》时，应当按照《企业会计准则第38号——首次执行企业会计准则》等相关规定进行会计处</p>`;

        console.log(markupText);

        // return (
        //     <Input type="textarea" onChange={ this.onTextChange } rows={4} />
        // )
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: markupText}}>
                </div>
                <span onClick={ this.getData }>click me</span>
            </div>
        )
    }

    private onTextChange(evt) {
        
        const val = evt.target.value;
        console.log('👉🏻 before convert -----> ', val);
        const htmVal = this.mdConverter.makeHtml(val);

        console.log('👉🏻 after convert -----> ', htmVal);
    }

    private makeHtml(data) {
        let htmlStr = '';
        if (data && Array.isArray(data)) {
            data.forEach(item => {
                htmlStr += this.mdConverter.makeHtml(item);
            })
        }

        return htmlStr;
    }

    private getData() {
        const { action } = this.props;

        action.getFilter();
    }
}
