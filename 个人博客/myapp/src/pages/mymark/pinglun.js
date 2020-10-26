import React, { Component } from 'react'
import axios from "axios"
import {
    HeartOutlined,
    MessageOutlined,
    EyeOutlined,
  } from '@ant-design/icons';
  import { Typography, Space } from 'antd';

  import { Modal, Button } from 'antd';
  
import "../css/pinglun.css"
  const { Text, Link } = Typography;
export default class pinglun extends Component {
    //获取自己评论过的文章
    state={
        arr:[],
        visible: false,
        dleid:0
    }
    componentDidMount(){
        this.getdata()
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = async e => {
        await axios.delete("/deletepl",{
            params:{
                id:this.state.dltid
            }
        })
        this.setState({
          visible: false,
        });
        this.getdata()
      };
    
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };
    async getdata(){
        //获取自己评论文章的id
        let data = await axios.get("/getuserpl",{
            params:{
                user:sessionStorage.getItem("user")
            }
        })
        console.log(data.data.data)
        
        //和之前点赞同理，循环获取文章，并且将评论的内容和文章放在一起
        let arr = [];
        data.data.data.forEach(async (item,index)=>{
            let data = await axios.get("/getuserdz_1",{
                params:{
                    txtid:item.txtid
                }
            })
            arr.push({txt:item,data:data.data.data})
        })
        window.setTimeout(() => {
            console.log(arr);
            this.setState({
                arr:arr
            })
        }, 1000);
    }
    render() {
        return (
            <div className="myuserpl">
                 <Modal
                title="通知"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    <p>确定要删除此评论吗?</p>
                </Modal>
                <ul>
                    {
                        // 查看数组中有没有内容，若没有内容则就是没有评论过任何内容
                        this.state.arr[0]?this.state.arr.map((item,index)=>{
                            return (
                                <li className="ul">
                                    <Text type="warning" className="dltpl" onClick={(e)=>{
                                        e.stopPropagation();
                                        this.setState({
                                            dltid:item.txt.id
                                        })
                                        this.showModal()
                                        //删除评论则传入评论id进行后端删除，
                                    }}>删除此评论</Text>
                                    <p>{item.txt.txt} </p>
                                    {
                                        item.data?<div key={index} onClick={()=>{
                                            this.props.history.push("/home/data",{
                                                query:{
                                                    data:item.data
                                                }
                                            })
                                        }}>
                                            <h1>{item.data.name}</h1>
                                            {
                                                item.data.img?<img src={item.data.img} />:<></>
                                            }
                                            <HeartOutlined />{item.data.dianzan}
                                            <MessageOutlined />{item.data.pinglun}
                                            <EyeOutlined />{item.data.chakan}
                                        <span className="addtime">addTime:{console.log(item.data.time)}{item.data.time}</span>
                                        </div>:<div>
                                            <h1>该文章已被作者删除</h1>
                                        </div>
                                    }
                                    
                                </li>
                            )
                        }):<p className="font">您还没有评论过任何文章哦，快去发挥您的才华吧！</p>
                    }
                </ul>
            </div>
        )
    }
}
