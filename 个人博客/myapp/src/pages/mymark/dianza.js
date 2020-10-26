import React, { Component } from 'react'
import {
    HeartOutlined,
    MessageOutlined,
    EyeOutlined,
  } from '@ant-design/icons';
import axios from "axios"
import "../css/mymark.css"
export default class dianza extends Component {
    //这个是“我点赞过的文章”的组件
    state={
        arr:[]
    }
    //一开始获取数据
    componentDidMount(props){
        this.getdata();
    }
    async getdata(){
        //获取点赞的文章id
        //获取自己点赞的文章的id
        let res = await axios.get("/getuserdz",{
            params:{
                user:sessionStorage.getItem("user")
            }
        })
        //获取点赞的文章并且存入数组
        //通过自己点赞文章的id存入数组
        let arr=[];
        let dataarr=[];

        window.setTimeout(() => {
            res.data.txtids.forEach((item,index)=>{
                arr.push(item.txtid)
            })
        },0);
        

        console.log(arr);
        //通过数据循环通过后端来一个个获取文章内容，然后存入数组
        window.setTimeout(()=>{
            arr.forEach(async (item)=>{
                let data = await axios.get("/getuserdz_1",{
                    params:{
                        txtid:item
                    }
                })
                dataarr.push(data.data.data);
            })
        },500)

        window.setTimeout(() => {
            this.setState({
                arr:dataarr
            })
        }, 1000);
        
    }
    render() {
        let arr = [];
            arr = this.state.arr;
        let flag=false;
        return (
            <div className="dianzan_1">
                <ul className="ul">
                    {
                        // 将自己点赞的文章渲染到页面中
                        //判断arr中有没有内容，若没有内容则说明没有点赞过任何内容
                        arr.map((item,index)=>{
                            flag=true
                             return (
                                 item!==undefined?<li key={index} onClick={()=>{
                                 this.props.history.push("/home/data",{
                                     query:{
                                         data:item
                                     }
                                 })
                             }}>
                                 <h1>{item.name}</h1>
                                 {
                                     item.img?<img src={item.img} />:<></>
                                 }
                                 <HeartOutlined />{item.dianzan}
                                 <MessageOutlined />{item.pinglun}
                                 <EyeOutlined />{item.chakan}
                                 <span className="addtime">addTime:{item.time}</span>
                             </li>:<li>
                                 <h1>该文章已被删除</h1>
                             </li>)
                         })
                        //  :
                    }
                    {
                        flag==false?<p className="font">您还没有点赞过任何文章哦，快去给喜欢的文章点赞吧！</p>:<></>
                    }
                    </ul>
            </div>
        )
    }
}
