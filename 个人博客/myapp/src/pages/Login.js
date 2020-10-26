import React, { Component } from 'react'
import "../pages/css/login.css"
import { Form, Input, Button, Checkbox } from 'antd';
import {  notification } from 'antd';
import axios from "axios"
export default class Login extends Component {
  //登录组件
    state={
        user:"",
        password:""
    }
    render() {
      const loginyes = () => {
        notification.open({
          message: '通知',
          description:
            '登录成功',
          className: 'custom-class',
          style: {
            width: 600,
          },
        });
      };
      const loginno = () => {
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
            '账号或者密码错误',
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
        return (
            <div className="login">
                <div className="logins">
                  {/* 表单内容 */}
                <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="账号"
        name="user"
        rules={[{ required: true, message: '请输入你的账号!' }]}
      >
        <Input onChange={(e)=>{
            this.setState({
                user:e.target.value
            })
            console.log(this.state.user)
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
            console.log(this.state.password)
        }}/>
      </Form.Item>

      <Form.Item {...tailLayout}>



        {/* 点击登录按钮时判断账号和密码是否都有输入 */}

      
        <Button type="primary" className="loginbutton" onClick={async ()=>{
          if(!this.state.user||!this.state.password){
            loginno()
          }else{
            console.log(this.state.user,this.state.password)
            let res = await axios.post("/login",{
              user:this.state.user,
              password:this.state.password,
            })
            //若登录成功则在浏览器中存储账号信息
            //方便各种代码的实现
            if(res.data.msg=="登陆成功"){
              loginyes();
              sessionStorage.setItem("user",this.state.user);
              sessionStorage.setItem("img",res.data.data.headimg);
              sessionStorage.setItem("name",res.data.data.name);
              sessionStorage.setItem("address",res.data.data.address);
              sessionStorage.setItem("sex",res.data.data.sex);
              sessionStorage.setItem("id",res.data.data.id);
              sessionStorage.setItem("count",res.data.data.txtcount);
              this.props.history.push("/home");
              //若密码和账号错误则弹出弹框
            }else if(res.data.code==2){
              no()
            }
          }
        }}>
          登录
        </Button>
        {/* 若点击注册按钮则进入注册页面 */}
        <Button type="primary" onClick={()=>{
          this.props.history.push("/zhuce")
        }}>注册</Button>
      </Form.Item>
    </Form>
                </div>
               
            </div>
        )
    }
}
