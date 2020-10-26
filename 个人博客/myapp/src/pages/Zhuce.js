import React, { Component } from 'react'
import "../pages/css/zhuce.css"
import { Form, Input, Button, Checkbox } from 'antd';
import {  notification } from 'antd';
import axios from "axios"
export default class Zhuce extends Component {
  //注册用户组件
    state={
        user:"",
        password:"",
        phone:""
    }
    yes(ctx){ 
      //判断当前账号是否有汉字
      if(/.*[\u4e00-\u9fa5]+.*$/.test(ctx.state.user)) 
      {
      return false; 
      }
      return true; 
      }
    render() {
        const zhuceyes = () => {
            notification.open({
              message: '通知',
              description:
                '注册成功',
              className: 'custom-class',
              style: {
                width: 600,
              },
            });
          };
          const zhuceno = () => {
            notification.open({
              message: '通知',
              description:
                '请完善您的信息',
              className: 'custom-class',
              style: {
                width: 600,
              },
            });
          };
          const no = () => {
            notification.open({
              message: '通知',
              description:
                '用户名已存在',
              className: 'custom-class',
              style: {
                width: 600,
              },
            });
          };
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };
          const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
          };
          
            const onFinish = values => {
              console.log('Success:', values);
            };
          
            const onFinishFailed = errorInfo => {
              console.log('Failed:', errorInfo);
            };
            const notZhuce = () => {
              notification.open({
                message: '警示',
                description:
                  '账号中不可以有中文',
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
            };
        return (
          //表单组件
            <div className="zhuce">
                <div className="logins">
                <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="user"
        rules={[{ required: true, message: '请输入你的用户名!' }]}
      >
        <Input  onChange={(e)=>{
            this.setState({
                user:e.target.value
            })
        }}/>
      </Form.Item>

      <Form.Item 
        label="密码"
        name="pswd"
        rules={[{ required: true, message: '请输入你的密码!' }]}
      >
        <Input.Password onChange={(e)=>{
            this.setState({
                password:e.target.value
            })
        }}/>
      </Form.Item>
      <Form.Item 
        label="手机号"
        name="phone"
        rules={[{ required: true, message: '请输入你的手机号!' }]}
      >
        <Input onChange={(e)=>{
            this.setState({
                phone:e.target.value
            })
        }}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" className="zhucebutton" onClick={async()=>{
          //若用户名和手机号和密码其中一个没有填的时候则不能注册
            if(!this.state.user||!this.state.password||!this.state.phone){
                zhuceno();
            }else{
              if(this.yes(this)){
                let res = await axios.post("/add",{
                    user:this.state.user,
                    password:this.state.password,
                    phone:this.state.phone
                })
                //从后端返回的数据中判断数据是否注册成功
                if(res.data.msg=="注册成功"){
                    zhuceyes();
                    this.props.history.push("/login")
                    // 当账号后端数据库中已经有了的时候不能用此账户进行注册
                }else if(res.data.code==2){
                    no();
                }
              }else{
                notZhuce()
              } 
            }
        }}>
          马上注册
        </Button>
      </Form.Item>
    </Form>
                </div>
               
            </div>
        )
    }
}
