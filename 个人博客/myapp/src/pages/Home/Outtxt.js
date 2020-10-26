import React, { Component } from 'react'
import { Input } from 'antd';
import "../css/outtxt.css"
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from "axios"
import { notification } from 'antd';
import {Prompt} from 'react-router'
const { TextArea } = Input;
//引入插件
export default class Outtxt extends Component {
  //这是发表文章的组件
    state = {
        size: 'large',
        title:"",
        value:"",
      };
    handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
    render() {
        const openNotification = () => {
            notification.open({
              message: '通知',
              description:
                '您的文章发布成功',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          };
          const noOut = () => {
            notification.open({
              message: '通知',
              description:
                '文章必须写标题和内容哦',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          };
        const { size } = this.state;
        return (
            <div className="outtxt">
                <div className="body">
                <h3>文章标题：</h3>
                {/* 文章标题输入框 */}
                <Input  onChange={(e)=>{
                    this.setState({
                        title:e.target.value
                    })
                }}/>
                <h3>文章内容</h3>
                {/* 文章内容输入框 */}
                <TextArea rows={30} className="text" onChange={(e)=>{
                    this.setState({
                        value:e.target.value
                    })
                }}/>
                {/* 点击发表文章传入一个文章该有的信息，文章名，文章内容，作者就是自己的用户名称，还有自己的账号 */}
                <Button className="out" type="primary" size={size} onClick={async ()=>{
                    if(this.state.value&&this.state.title){
                        let res = await axios.post("/addtext",{
                            name:this.state.title,
                            txt:this.state.value,
                            zuozhe:sessionStorage.getItem("name"),
                            user:sessionStorage.getItem("user")
                        })
                        openNotification();
                        //发表完成后进入首页
                        this.props.history.push("/home")
                    }else{
                        noOut();
                    }
                }}>
                现在发布
                </Button>
                </div>
            </div>
        )
    }
}
