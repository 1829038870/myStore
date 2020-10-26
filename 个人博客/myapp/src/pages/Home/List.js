import React, { Component } from 'react'
import "../css/list.css"
import {
    HeartOutlined,
    MessageOutlined,
    EyeOutlined,
  } from '@ant-design/icons';
import axios from "axios"
import { Button } from 'antd';
import { Modal } from 'antd';
import { notification } from 'antd';
//引入插件
export default class List extends Component {
  //个人发表的文章组件
    state={
        arr:[],
        visible: false,
        id:0,
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
     handleOk = async e => {
        console.log(e);
        this.setState({
          visible: false,
        });
        //删除确定删除文章则接口删除传入文章id
        await axios.delete("/deleteusertxt",{
            params:{
                id:this.state.id
            }
        })
        this.getlist()
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    componentDidMount(){
        this.getlist()
    }
    //通过接口获取自己发表的文章
    async getlist(){
        let res = await axios.get("/getusertxt",{
          //传入后端自己的账号
            params:{
                user:sessionStorage.getItem("user")
            }
        })
        //重新获取数据
        this.setState({
            arr:res.data.data
        })
    }
    render() {
      //删除成功自己的文章
        const openNotification = () => {
            notification.open({
              message: '通知',
              description:
                '成功删除',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });
          };
        let arr = this.state.arr
        return (
            <div className="list">
                <div className="body">
                <div class="datas">
                    <h1>我发表的文章:</h1>
                    <ul className="ul">
                        {
                          //循环渲染自己的文章
                           arr.map((item,index)=>{
                                return (
                                  //点击查看文章
                                <li key={index} onClick={()=>{
                                    this.props.history.push("/home/data",{
                                        query:{
                                            id:item.id,
                                            data:item
                                        }
                                    })
                                }}>
                                  
                                    <h1>{item.name}</h1>
                                    
                                    <HeartOutlined />{item.dianzan}
                                    <MessageOutlined />{item.pinglun}
                                    <EyeOutlined />{item.chakan}
                                    <span className="addtime">addTime:{item.time}</span>
                                    {
                                        item.img?<img src={item.img} />:<></>
                                    }
                                    {/* 删除按钮，点击弹出弹框询问是否确定删除 */}
                                    <Button type="primary" className="yesbutton" onClick={(e)=>{
                                      this.showModal()
                                        e.stopPropagation()
                                        this.setState({
                                            id:item.id
                                        })
                                    }}>删除此文章</Button>
                                </li>)
                            })
                        }
                    </ul>
                    <Modal
          title="警告"
          visible={this.state.visible}
        //   onOk={this.handleOk}
        onOk={()=>{
            this.handleOk()
            openNotification()
        }}
          onCancel={this.handleCancel}
        >
          <p>您确定呀删除此文章吗，删除之后不会恢复</p>
        </Modal>
                </div>
                </div>
            </div>
        )
    }
}
