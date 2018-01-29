/**
 * 会计准则
 */
import * as React from 'react';
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import { AccountingFilter, AccountingFilterOptions } from '../../../components/filter';
import { autobind } from 'core-decorators';
import { FilterOptions } from '../../../components/filter/FilterItem';
import SiderNav from '../../../components/SiderNav/SiderNav';
import request from '../../../utils/fetch';
const showdown = require('showdown');
const Input = require('antd/lib/input');
const Button = require('antd/lib/button');
const BackTop = require('antd/lib/back-top');
const Icon = require('antd/lib/icon');
const Modal = require('antd/lib/modal');

export type IRule = {
    roleType: string,               // role type value
    roleYear: string,               // role year value
    roleGPData: string,             // 基本准则数据
    roleSPData: any,         // 具体准则数据
}

/**
 * 具体准则详情
 */
export type ISPRuleDetail = {
    title: string,                  // 具体准则标题
    content: string,                // 具体准则内容
}

interface RulesProps extends MainSiderProps {
    filterOptions?: AccountingFilterOptions,
    onChange?: (value: FilterOptions, type: string) => void,
    role?: IRule,      // 当前会计数据
    action: {[key: string]: Function},
    spRuleDetail?: ISPRuleDetail,
}

@autobind
export default class Rules extends MainSider<RulesProps> {

    // The showdown Obj to converter md string to htm string.
    mdConverter = new showdown.Converter();

    // 准则文本
    roleHtml = null;

    // 样式前缀
    prefixCls = 'accounting-rule';

    className = 'accounting-rule';

    state = {
        showSPDetail: false,
    };

    protected renderMain()  {
        const { filterOptions, role } = this.props;
        const { roleOptions, yearOptions } = filterOptions;

        return (
            <div className={`${this.props}-body`}>
                <AccountingFilter 
                    roleOptions = { roleOptions }
                    yearOptions = { yearOptions }
                    onChange = { this.onChange }
                    role = { role.roleType }
                    year = { role.roleYear }
                />
                { this.renderText() }
                { this.renderSPRuleDialog() }
                <BackTop>
                    <div className={`${this.prefixCls}-back-top`} title="返回到顶部">
                        <i className="iconfont icon-zhiding"></i>
                    </div>
                </BackTop>
            </div>
        )
    }

    protected renderSider() {
        return (
            <div className="sider-content">
                {
                    this.renderSiderNav()
                }
            </div>
        )
    }

    renderSiderNav() {
        const { role } = this.props;
        const gpData = role.roleGPData;
        const spData = role.roleSPData;
        const chapters = spData.chapters || [];

        // SiderNav 导航数据
        const navAnchorData = gpData ? [
            {
                href: 'gpRuleAnchor',
                title: '基本准则'
            }
        ] : [];

        if (chapters.length > 0) {
            const spAnchordata = {
                href: 'spRuleAnchor',
                title: '具体准则',
                childs: []
            }
    
            chapters.forEach((item, index) => {
                spAnchordata.childs.push({
                    href: `sp_rule_${item.id}_${index}`,
                    title: item.title,
                });
            })
    
            navAnchorData.push(spAnchordata);
        }

        return (
            <div className="sider-nav-anchor">
                <SiderNav 
                    data = { navAnchorData }
                />
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
        return (
            <div className={ this.prefixCls }>
                {
                    this.renderGPRuleText()
                }
                {
                    this.renderSPRuleText()
                }
                {/* <div className="editor">
                    <Input type="textarea" onBlur={ this.onTextBlur } rows={10} />
                    <Button onClick={ this.uploadRoleText }>上传文本</Button>
                </div> */}
            </div>
        )
    }

    /**
     * 渲染基本准则
     */
    private renderGPRuleText() {
        const { role } = this.props;

        let gpRuleNode = null;

        if (role.roleGPData) {
            const ruleHtmlText = this.mdConverter.makeHtml(role.roleGPData);

            gpRuleNode = (
                <div className="gp-rule">
                    <h1 id="gpRuleAnchor" className="gp-rule-header">基本准则</h1>
                    <div className={ `${this.prefixCls}-text` } dangerouslySetInnerHTML={{__html: ruleHtmlText}} />
                </div>
            );
        }

        return gpRuleNode;
    }

    /**
     * 渲染具体准则
     */
    private renderSPRuleText() {
        const { role } = this.props;
        const titleList = [];
        const spData = role.roleSPData;
        const chapters = spData.chapters || [];

        let spRuleNode = null;

        if (chapters.length > 0) {
            chapters.forEach((item, index) => {
                titleList.push((
                    <li 
                        id={ `sp_rule_${item.id}_${index}` }
                        key={ `${item.id}_${index}` } 
                        className="sp-rule-item"
                    >
                        <a 
                            href="javascript: void(0)"
                            onClick={ () => {
                                this.showSPRule(item);
                            } }
                        >
                            {
                                item.title
                            }
                        </a>
                    </li>
                ));
            });

            spRuleNode = (
                <div className="sp-rule">
                    <h1 id="spRuleAnchor" className="sp-rule-header">具体准则</h1>
                    <ul className="sp-rule-title">
                        {
                            titleList
                        }
                    </ul>
                </div>
            );
        }

        return spRuleNode;
    }

    private renderSPRuleDialog() {
        const { spRuleDetail } = this.props;
        const { title, content } = spRuleDetail;

        const ruleHtmlText = this.mdConverter.makeHtml(content) || '';

        return (
            <Modal
                title={ title }
                style={{ top: 20 }}
                visible={this.state.showSPDetail}
                onCancel={() => this.setSPRuleDialogVisible(false)}
                footer={ null }
            >
                <div>
                    <div className={ `${this.prefixCls}-text` } dangerouslySetInnerHTML={{__html: ruleHtmlText}} />
                </div>
            </Modal>
        );
    }

    private setSPRuleDialogVisible(visible) {
        this.setState({
            showSPDetail: visible
        });
    }

    /**
     * 显示具体准则内容
     * @param ruleObj 具体准则对象
     */
    private showSPRule(ruleObj) {
        const { action } = this.props;

        // 查询具体准则详情
        action.getSPRuleDetail(ruleObj.id);

        // 打开对话框
        this.setSPRuleDialogVisible(true);
    }

    private onTextBlur(evt) {
        const val = evt.target.value;
        console.log('👉🏻 before convert -----> ', val);
        this.roleHtml = this.mdConverter.makeHtml(val);

        console.log('👉🏻 after convert -----> ', this.roleHtml);
    }

    /**
     * Upload text to server
     */
    private uploadRoleText() {
        const { filterOptions, role } = this.props;
        const { roleOptions, yearOptions } = filterOptions;

        const roleObj = roleOptions.options.find(item => {
            return item.value === role.roleType;
        });
        
        const yearObj = yearOptions.options.find(item => {
            return item.value === role.roleYear;
        });
        // const { action } = this.props;

        const params = {
            year: yearObj.id,
            type: roleObj.id,
            content: this.roleHtml
        };

        request.post('/uploadRole', params).then((result) => {
            if (result.success) {
                const data = result.success.data;
                console.log('uploadRole success 👉🏻 ------> ', data);
            }
        });
    }
}
