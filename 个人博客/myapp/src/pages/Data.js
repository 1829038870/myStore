import React, { Component } from 'react'
import { Layout } from 'antd';
import "./css/data.css"
import Item from 'antd/lib/list/Item';
import { Avatar } from 'antd';
import {  notification } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { message} from 'antd'; 
import axios from "axios"
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
const { Text, Link } = Typography;  
export default class Data extends Component {
    //这个是文章详情页，下方是评论
    state={
        data:{},
        arr:[],
        value:"",
        like:0,
        pinglun:0,
        flag:true,
        clickStop:true
    }
    async componentDidMount(){
        this.setState({
            data:this.props.location.state.query.data
        })
        this.getarr(this.props.location.state.query.data.id)
        this.setState({
            like:this.props.location.state.query.data.dianzan,
            pinglun:this.props.location.state.query.data.pinglun
        })
    }
    async getarr(id){
        let datas =await axios.get("/getlist",{
            params:{
                id
            }
        })
        this.setState({
            arr:datas.data.data
        })
        console.log(this.state.arr)
    }
    settime=function(){
        this.setState({
            clickStop:false
        })
        window.setTimeout(()=>{
            this.setState({
                clickStop:true
            })
        },1000)
    }
    render() {
        let data=this.state.data
        let arr = this.state.arr
        const likeyes = () => {
            notification.open({
              message: '通知',
              description:
                '谢谢大佬的点赞，么么哒♥',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          };
          const likeno = () => {
            notification.open({
              message: '通知',
              description:
                '您已经点过赞了，已取消',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          };
        const warning = () => {
            message.warning('不可以发表空的内容哦');
          };
          const openNotification = () => {
            notification.open({
              message: '通知',
              description:
                '您的评论发表成功',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          };
        
        return (
            <div className="data">
                {/* 显示文章基本内容 */}
                <div className="border">
                <h1>{data.name}</h1>
                <img src={data.img} className="img"/>
                <div className="txt">{data.txt}</div>
                <h3>作者:{data.zuozhe}</h3>
                <span className="addtime">addTime:{this.props.location.state.query.data.time}</span>

                {
                    sessionStorage.getItem("user")?<div className="like" >为这个文章点个赞吧<LikeOutlined  onClick={async (e)=>{
                        e.stopPropagation()
                        this.settime()
                        console.log(this.state.clickStop);
                        if(this.state.clickStop){
                            // 点赞内容文章，先获取后端内容判断当前用户对这个文章点赞过
                            let res = await axios.get("/likeyes",{
                                params:{
                                    id:this.props.location.state.query.data.id,
                                    user:sessionStorage.getItem("user"),
                                }
                            })
                            //若之前已经点赞过则要取消点赞
                            //传入文章id，账号进行删除后端点赞信息
                            if(res.data.msg=="当前已点赞"){
                                likeno()
                                let likecount = await axios.put("/like",{
                                    id:res.data.data.id,
                                    user:res.data.data.user,
                                    txtid:res.data.data.txtid,
                                    msg:"no"
                                })
                                this.setState({
                                    like:likecount.data.data
                                })
                            //若之前没有点过赞则要进行点赞
                            //传入文章id，和账号向点赞表里添加点赞信息
                            }else if(res.data.msg=="当前没有点赞"){
                                likeyes()
                                
                                let likecount = await axios.put("/like",{
                                    id:this.props.location.state.query.data.id,
                                    user:sessionStorage.getItem("user"),
                                    txtid:this.props.location.state.query.data.txtid,
                                    msg:"yes"
                                })
                                this.setState({
                                    like:likecount.data.data
                                })
                        }
                        //若当前没有登录则不能进行点赞操作
                        }else{
                            alert("当前操作过快，请稍后再试哦~")
                        }
                        
                    }}/><span>{this.state.like}</span></div>:<div className="like">您需要登录才可以点赞<LikeOutlined/></div>
                }


{/* -------------------------------------------------------------------------下面是评论------------------------------------------------------------------------------- */}
                <div className="pinglun">
                <h2>评论:(<span>{this.state.pinglun}</span>)</h2>
                    
                        <ul className="pingluns">
                        {
                            //判断当前文章中是否有评论，有则循环输出
                            arr[0]?arr.map((item,index)=>{
                                return (
                                    //评论中的基本信息评论人的基本信息，头像，评论内容和用户名
                                    <li key={index}>
                                    <div onClick={()=>{
                                        // console.log(item);
                                        if(sessionStorage.getItem("user")==item.user){
                                            this.props.history.push("/my")
                                        }else{
                                            this.props.history.push("/tamy",{
                                                query:{
                                                    data:item
                                                }
                                            })
                                        }
                                    }}>
                                        <Avatar size="large" icon={<UserOutlined />} src={item.headimg}/>
                                     <Text>{item.name}</Text>:
                                    </div>
                                    <p>{item.txt}</p>
                                    </li>
                                )
                            }):<p>还没有评论哦，来抢个沙发吧</p>
                        }
                    </ul>
                    
                    {
                        sessionStorage.getItem("user")?<div className="out">
                        {/* 发表评论内容 */}
                        <Input size="large" placeholder="请展示您的文采" onChange={(e)=>{
                            this.setState({
                                value:e.target.value
                            })
                        }}/>
                            <Button type="primary" onClick={async ()=>{
                                //点击按钮发表评论若文本框为空则不能进行评论
                                if(this.state.value==""){
                                    warning();
                                }else{
                                    //满足条件进行评论向后端传入文章id，和账号，和评论的内容
                                    let res = await axios.post("/addtxt",{
                                        txtid:data.id,
                                        user:sessionStorage.getItem("user"),
                                        txt:this.state.value,
                                    })
                                    //评论之后更新评论数据
                                    this.setState({
                                        pinglun:res.data.data.count
                                    })
                                    openNotification();
                                    this.getarr(this.props.location.state.query.data.id);
                                }
                            }}>发表</Button>    
                        </div>:<div  className="out">请先登陆后再进行评论哦</div>
                    }
                </div>
                </div>
            </div>
        )
    }
}
