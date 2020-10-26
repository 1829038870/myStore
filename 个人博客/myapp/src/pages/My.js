import React, { Component } from 'react'
import "./css/my.css"
import { Layout } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import { Typography, Space } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Button } from 'antd';
import { message } from 'antd';
import { Form, Input, Checkbox,Radio  } from 'antd';
import axios from "axios"
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';
const { Text, Link } = Typography;
const { Header, Footer, Sider, Content } = Layout;
export default class My extends Component {
  //个人信息修改组件和退出登录
    state = {
      name:sessionStorage.getItem('name'),
      address:sessionStorage.getItem('address'),
      value: sessionStorage.getItem("sex"),
      visible: false ,
        setaddress: false,
        fileList: [],
    uploading: false,
      propsname: "",
      userimg:"" 
    };
    componentDidMount(){
      // if(this.props.location.state){
      //   this.setState({
      //     propsname:
      //   })
      // }
    }
    onChange = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    };
    setDate = () => {
        this.setState({
            setaddress: true,
        });
      };
    // 若修改个人信息则先修改后端的用户表中的信息

    // 然后再修改页面中存储的个人信息
      setOk = async (e) => {
         await axios.put("/setuser",{
          name:this.state.name,
          address:this.state.address,
          sex:this.state.value,
          id:sessionStorage.getItem("id"),
          user:sessionStorage.getItem("user"),
          headimg:this.state.userimg
        })
        sessionStorage.setItem("name",this.state.name);
        sessionStorage.setItem("address",this.state.address);
        sessionStorage.setItem("sex",this.state.value); 
        sessionStorage.setItem("img",this.state.userimg);
        window.location.reload()
        this.setState({
            setaddress: false,
        });
      };
      setCancel = e => {
        console.log(e);
        this.setState({
            setaddress: false,
        });
      };
    
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
    
    render() {
      const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

        const info = () => {
            message.info('成功退出');
          };
          // let propsuser = this.props.location.state.query.user;
          // console.log(propsuser)
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
                <h1>欢迎您：{sessionStorage.getItem("name")=="null"?sessionStorage.getItem("user"):sessionStorage.getItem("name")}</h1>
                <Avatar size={256}  src={sessionStorage.getItem("img")}/>

                <div class="address">
                <p>账号：{sessionStorage.getItem("user")}</p>
                <p>个人简介:{sessionStorage.getItem("address")}</p>
                <p>性别:{sessionStorage.getItem("sex")=="0"?"男":"女"}</p>

                {/* 修改个人信息时弹出弹框 */}
                <Button onClick={()=>{
                    this.setDate();
                }}>修改个人信息</Button>
                <Modal
                title="修改个人信息"
                visible={this.state.setaddress}
                onOk={this.setOk}
                onCancel={this.setCancel}
                >
                <Form.Item
                  label="昵称"
                  name="username"
                  rules={[{ required: true, message: '用户名不能为空!' }]}
                >
                  <Input  defaultValue={sessionStorage.getItem("name")} onChange={(e)=>{
                    this.setState({
                      name:e.target.value
                    })
                  }}/>
                </Form.Item>
                <Form.Item
                  label="个人简介"
                  name="username"
                >
                  <Input  defaultValue={sessionStorage.getItem("address")} onChange={(e)=>{
                    this.setState({
                      address:e.target.value
                    })
                  }}/>
                </Form.Item>
                <Form.Item
                  label="性别"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
                </Radio.Group>
                </Form.Item>
                <Form.Item>
                  修改头像(输入图片链接):<Input placeholder="请输入链接" defaultValue={sessionStorage.getItem("img")} onChange={(e)=>{
                    this.setState({
                      userimg:e.target.value
                    })
                  }}/>
                </Form.Item>
                </Modal>
                </div>
            
                  {/* 退出登录就是将之前浏览器中存储的个人信息全部删除 */}
                <Footer><Button type="primary" block onClick={()=>{
                    this.showModal()
                }}>
                退出登录
                </Button></Footer>
                <Modal
                title="提示"
                visible={this.state.visible}
                onOk={()=>{
                    this.handleOk()
                    info()
                    sessionStorage.removeItem("user");
                    sessionStorage.removeItem("img");
                    sessionStorage.removeItem("name");
                    sessionStorage.removeItem("address");
                    sessionStorage.removeItem("sex");
                    this.props.history.push("/home")
                    }
                }
                onCancel={
                    this.handleCancel
                }
                >
                <p>确定要退出登录吗？</p>
                </Modal>
                </div>
                </Layout>
            </div>
        )
    }
}
