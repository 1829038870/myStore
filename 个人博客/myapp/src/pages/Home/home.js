import React, { Component } from 'react'
import axios from "axios"
import {
    HeartOutlined,
    MessageOutlined,
    EyeOutlined,
  } from '@ant-design/icons';
import "../css/homes.css"
import { Calendar } from 'antd';
import { Button } from 'antd';
//引入组件
export default class home extends Component {
    //进入页面时初始化数据
    componentDidMount(){
        this.getdata()
    }
    
    state={
        arr:[
            
        ],
        txtcount:0
    }
    async getdata(){
        //按照接口接收数据
        let data = await axios.get("/getdata");
        console.log(data.data.data);
        this.setState({
            arr:data.data.data
        })
    }
    
    render() {
        function onPanelChange(value, mode) {
            console.log(value, mode);
          }
          
        let arr = this.state.arr
        return (
            <div class="homes">
                 <div class="datas">
                    <ul className="ul">
                        {
                            //循环渲染
                           arr.map((item,index)=>{
                                return (
                                <li key={index} onClick={()=>{
                                    this.props.history.push("/home/data",{
                                        //将点击的文章信息路由传参
                                        query:{
                                            data:item
                                        }
                                    })
                                }}>
                                    {/* 显示文章内容名字和评论点赞信息 */}
                                    <h1>{item.name}</h1>
                                    {
                                        //判断这个文章是否有插图没有则不显示
                                        item.img?<img src={item.img} />:<></>
                                    }
                                    <HeartOutlined />{item.dianzan}
                                    <MessageOutlined />{item.pinglun}
                                    <EyeOutlined />{item.chakan}
                                    <span className="addtime">addTime:{item.time}</span>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="right">
                <div className="site-calendar-demo-card">
                    {/* 日历 */}
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} locale="zh-CN"/>
                </div>
                
                <p class="p_p">征服畏惧、建立自信的最快最确实的方法，就是去做你害怕的事，直到你获得成功的经验。</p>
                <p>我的发表文章数量:<span>{sessionStorage.getItem("count")}</span></p>
                
                {/* 查看我发表的文章，若没有登录则不能进入 */}
                <Button disabled ={sessionStorage.getItem("user")?false:true} onClick={()=>{
                    this.props.history.push("/home/list");
                }}>我发表的文章</Button>
                <br/>

                {/* 点击发表文章，若没有登录不能发表，按钮禁用 */}
                <Button type="primary"  disabled ={sessionStorage.getItem("user")?false:true} onClick={()=>{
                    this.props.history.push("/home/outtxt");
                }}>我要发表文章</Button>
                </div>
            </div>
        )
    }
}
