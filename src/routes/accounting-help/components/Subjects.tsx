/**
 * 财会 - 科目
 */
import * as React from 'react';
import MainSider, { MainSiderProps } from '../../../components/page-frame/MainSider';
import { AccountingFilterOptions, AccountingFilter } from '../../../components/filter/index';
import { FilterOptions } from '../../../components/filter/FilterItem';
import { IRule } from './Rules';
import { AccountingFilterTypeEnum } from '../../../components/filter/AccountingFilter';
import SiderNav from '../../../components/SiderNav/SiderNav';
import SubjectCategory, { SubjectCategoryProps } from './SubjectCategory';
import index from '../../Warehouse';
const BackTop = require('antd/lib/back-top');

type SubjectCategoryType = {
    id: number,                                                         // id
    accountingStandard: number,
    name: string,                                                       // 名称
    code: string,                                                       // 编码
    status: boolean,                                                    // 状态
}

interface SubjectsProps extends MainSiderProps {
    filterOptions?: AccountingFilterOptions,
    role?: IRule,                                                       // 当前会计数据
    action: {[key: string]: Function},
    subjectCategory?: Array<SubjectCategoryType>,                       // 科目分类
    subjectsData?: Array<SubjectCategoryProps>,                         // 科目数据
}

export default class Subjects extends MainSider<SubjectsProps> {
    
    prefixCls = 'subjects';

    constructor(props) {
        super(props);

        const { action, role } = props;
        const { roleType, roleYear } = role;

        if (roleType && roleYear) {
            // 获取科目分类
            action.getSubjectCategory(roleType, roleYear);

            // 获取会计科目数据
            action.getSubjectsData(roleType, roleYear);
        }
    }

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
                { this.renderContent() }
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

    private renderContent() {
        const { subjectsData } = this.props;

        const subjectCategoryNodes = subjectsData.map((item, index) => {
            return (
                <SubjectCategory 
                    key = { `${this.prefixCls}-category-${index}` }
                    { ...item }
                />
            )
        });

        return (
            <div>
                {
                    subjectCategoryNodes
                }
            </div>
        )
    }

    renderSiderNav() {
        const { subjectCategory } = this.props;

        // SiderNav 导航数据
        const navAnchorData = subjectCategory.map(item => {
            return {
                href: item.code,
                title: item.name
            }
        });

        return (
            <div className="sider-nav-anchor">
                <SiderNav 
                    data = { navAnchorData }
                />
            </div>
        )
    }

    private onChange = (val, type) => {
        const { action, role } = this.props;

        if (type === AccountingFilterTypeEnum.ROLE) {
            action.getRole(val.value, role.roleYear);
        } else if (AccountingFilterTypeEnum.YEAR) {
            action.getRole(role.roleType, val.value);
        }
    }
}
