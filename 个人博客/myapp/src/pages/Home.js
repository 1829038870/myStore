import React, { Component } from 'react'
import "./css/home.css"
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';
import RouterView from "../router/routerView"
import axios from "axios"
import {
    HeartOutlined,
    MessageOutlined,
    EyeOutlined,
    HighlightOutlined
  } from '@ant-design/icons';
import FormItemInput from 'antd/lib/form/FormItemInput';
import { Avatar } from 'antd';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class Home extends Component {
    //主页头部组件，包含我的足迹组件，模糊搜索文章组件，还有个人信息组件
    state={
        searchflag:"none",
        searchdata:[]
    }
    
    render() {
        let {children} = this.props;
        let flag = sessionStorage.getItem("user")?true:false
        
        const suffix = (
            <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
            />
        );
        return (
            <div className="home">
                <Layout>
                    
                <Header className="header">
                    {/* 点击进入“我的足迹组件” */}
                <div class="zuji" onClick={()=>{
                    this.props.history.push("/mymark");
                }}>我的足迹<HighlightOutlined /></div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    
                </Menu>
{/* --------------------------------------------------模糊搜索----------------------------------------------------------------------- */}
                {/* 获取焦点和丢失焦点都会出发件引发模糊搜索框的显示和隐藏 */}
                <input type="text" className="search" onFocus={()=>{
                    console.log("获取焦点")
                    this.setState({
                        searchflag:"block"
                    })
                }} onBlur={()=>{
                    window.setTimeout(()=>{
                        console.log("失去焦点")
                        this.setState({
                            searchflag:"none"
                        })
                    },100)
                   //每次更改搜索内容的时候都会向后端请求数据并更新数据
                }} onChange={async (e)=>{
                    
                    if(e.target.value==""){
                        this.setState({
                            searchdata:[]
                        })
                    }else{
                        let data = await axios.get("/search",{
                            params:{
                                value:e.target.value
                            }
                        })
                        this.setState({
                            searchdata:data.data.data
                        })
                    }
                }}/>
                {/* 搜索框内的内容都可以点击进入文章详情页 */}
                <div className="searchbox" style={{display:this.state.searchflag}}>   
                    {
                        this.state.searchdata.map((item,index)=>{
                            return (
                            <p onClick={(e)=>{
                                e.stopPropagation()
                                this.props.history.push("/home/data",{
                                    query:{
                                        data:item
                                    }
                                })
                            }}>{item.name}</p>
                            )
                        })
                    }
                </div>

{/* -------------------------------------------------------点击进入个人主页----------------------------------------------------------------------------------------- */}
                <div className="head">
                    {
                        //判断当前有没有用户登录如果登录则显示头像和个人用户名
                        // 若没有用户登录则显示登录和注册按钮分别进行登录和注册
                        sessionStorage.getItem("user")?<div onClick={()=>{
                            this.props.history.push("/my")
                        }}>
                            <Avatar size="large" icon={<UserOutlined />} src={sessionStorage.getItem("img")}/>
                            <span>{sessionStorage.getItem("name")=="null"?sessionStorage.getItem("user"):sessionStorage.getItem("name")}</span>
                        </div>: <div><Link href="/login"> 登录</Link> <Link href="/zhuce" >注册</Link></div>
                    }
                </div>
                </Header>
                <RouterView routerList = {children}/>
            </Layout>
            </div>
        )
    }
}