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

export type IRule = {
    roleType: string,   // role type value
    roleYear: string,   // role year value
    roleText: string,   // role text content
}

interface RulesProps extends MainSiderProps {
    prefixCls?: string,
    filterOptions?: AccountingFilterOptions,
    onChange?: (value: FilterOptions, type: string) => void,
    role?: IRule,      // 当前会计数据
    action: {[key: string]: Function};
}

@autobind
export default class Rules extends MainSider<RulesProps> {

    // The showdown Obj to converter md string to htm string.
    mdConverter = new showdown.Converter();

    // 准则文本
    roleHtml = null;

    // 样式前缀
    prefixCls = 'accounting-rule';

    protected renderMain()  {
        const { filterOptions, role } = this.props;
        const { roleOptions, yearOptions } = filterOptions;

        return (
            <div className="content">
                <AccountingFilter 
                    roleOptions = { roleOptions }
                    yearOptions = { yearOptions }
                    onChange = {this.onChange}
                    role = { role.roleType }
                    year = { role.roleYear }
                />
                { this.renderText() }
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
        const { role } = this.props;

        const ruleHtmlText = this.mdConverter.makeHtml(role.roleText);

        return (
            <div className={ this.prefixCls }>
                <div className={ `${this.prefixCls}-text` } dangerouslySetInnerHTML={{__html: ruleHtmlText}}>
                </div>
                <div className="editor">
                    <Input type="textarea" onBlur={ this.onTextBlur } rows={10} />
                    <Button onClick={ this.uploadRoleText }>上传文本</Button>
                </div>
            </div>
        )
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
