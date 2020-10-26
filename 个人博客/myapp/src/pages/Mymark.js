import React, { Component } from 'react'
import "./css/mymark.css"
import { Layout } from 'antd';
import { Typography, Space } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import RouterView from "../router/routerView"
import {NavLink}  from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
const { Text, Link } = Typography;
export default class Mymark extends Component {
    //我的足迹组件
    render() {
        let {children,navlink} = this.props;
        return (
            <div class="mymark">
                <Layout>
                <Header>
                    {/* 返回首页按钮 */}
                    <div className="body">
                    <Link href="/home">
                    <LeftOutlined/>回到首页
                    </Link>
                    </div>
                </Header>
                <Content>
                    <div className="body">
                        {/* 励志语录，可以进行更改 */}
                        <h1>读万里书不如行万里路，行万里路不如阅人无数</h1>
                        <ul className="mysea">
                        <li>
                            {/* 连接进入“我赞过的文章”组件 */}
                                <NavLink to="/mymark/dianzan">
                                我赞过的文章
                                </NavLink>
                                </li>
                            {/* 链接进入“我的评论”组件 */}
                                <li>
                                <NavLink to="/mymark/pinglun">
                                我的评论
                                </NavLink>
                        </li>
                    </ul>
                    <div className="data_1">
                        {/* 若当前没有用户登录则不进入组件当中，登录之后才能进入 */}
                        {
                            sessionStorage.getItem("user")?<RouterView  routerList = {children}/>:<p className="font">登录之后才可以看哦</p>
                        }
                    </div>
                </div>
                    
                </Content>
                </Layout>
            </div>
        )
    }
}
