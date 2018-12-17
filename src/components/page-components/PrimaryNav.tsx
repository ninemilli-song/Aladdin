/**
 * 一级导航
 */

import * as React from 'react';

import User from '../user';
import './assets/primarynav.scss';

export default class PrimaryNav extends React.Component<any, any> {
    render() {
        return (
            <div className="nav-primary-wrapper">
            <ul className="info">
                <User />
            </ul>
            <ul className="menu">
                <li className="menu-item">
                    <a 
                        href="/home"
                    >
                        首页
                    </a>
                </li>
                {/* <li className="menu-item">
                    <a 
                        href="/coterie"
                        target="_blank"
                        rel="noopener noreferrer">
                        圈子
                    </a>
                </li> */}
                <li className="menu-item">
                    <a 
                        href="/qas"
                        target="_blank"
                        rel="noopener noreferrer">
                        问答
                    </a>
                </li>
                {/* <li className="menu-item">
                    <a 
                        href="/policy"
                        target="_blank"
                        rel="noopener noreferrer">
                        政策
                    </a>
                </li> */}
                <li className="menu-item">
                    <a 
                        href="/ahome"
                        target="_blank"
                        rel="noopener noreferrer">
                        财会
                    </a>
                </li>
                {/* <li className="menu-item">
                    <a 
                        href="/accountingmanage"
                        target="_blank"
                        rel="noopener noreferrer">
                        财管
                    </a>
                </li>
                <li className="menu-item">
                    <a 
                        href="#/tax"
                        target="_blank"
                        rel="noopener noreferrer">
                        税务
                    </a>
                </li>
                <li className="menu-item">
                    <a 
                        href="/career"
                        target="_blank"
                        rel="noopener noreferrer">
                        生涯
                    </a>
                </li>
                <li className="menu-item">
                    <a 
                        href="/video"
                        target="_blank"
                        rel="noopener noreferrer">
                        视频
                    </a>
                </li> */}
            </ul>
        </div>
        )
    }
}
