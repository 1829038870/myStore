import React, { Component } from 'react'
import "./css/my.css"
import { Layout } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import { Typography, Space } from 'antd';
import { Avatar } from 'antd';
import axios from "axios"
const { Text, Link } = Typography;
const { Header, Footer, Sider, Content } = Layout;
export default class My extends Component {
  //个人信息修改组件和退出登录
    state = {
        data:{}
    };
    
    componentDidMount(){
        this.getdata(this.props.location.state.query.data)
    }
    async getdata(user){
        let data = await axios.get("/moveUser",{
            params:{
                user:user.user
            }
        })
        this.setState({
            data:data.data.res[0]
        })
    }
    render() {
      let data = this.state.data;
        return (
            <div className="my">
                <Layout>
                <Header  style={{padding:0,}}>
                  {/* 回到首页按钮 */}
                <div className="body">
                    <Link href="/home">
                    <LeftOutlined/>回到首页
                    </Link>
                </div></Header>
                <div className="body">

                  {/* 显示各种个人信息，大部分为之前登陆时从后端取出个人信息并存入浏览器中的 */}
                <h1>{data.name}</h1>
                <Avatar size={256}  src={data.headimg}/>

                <div class="address">
                <p>账号：{data.user}</p>
                <p>个人简介:{data.address}</p>
                <p>性别:{data.sex==="0"?"男":"女"}</p>
                </div>
            
                  {/* 退出登录就是将之前浏览器中存储的个人信息全部删除 */}
                <Footer></Footer>
                
                </div>
                </Layout>
            </div>
        )
    }
}
