'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async add() {
    let {ctx} = this;
    let {user,password,phone} = ctx.request.body;
    console.log(user,password,phone)
    let data = await ctx.service.user.add(user,password,phone);
    if(data){
      ctx.body={
        code:1,
        msg:"注册成功"
      }
    }else{
      ctx.body={
        code:2,
        msg:"用户名已存在"
      }
    }
  }
  async login(){
    let {ctx} = this;
    let {user,password} = ctx.request.body;
    console.log(user,password)
    let data = await ctx.service.user.login(user,password);
    console.log(data)
    if(data){
        ctx.body={
          code:1,
          msg:"登陆成功",
          data
      }
    }else{
      ctx.body={
          code:2,
          msg:"密码或者账户错误",
          data
      }
    }
    
  }
  async setuser(){
    let {ctx} = this;
    let {name,address,sex,id,user,headimg} = ctx.request.body;

    let res = await ctx.service.user.setuser(name,address,sex,id,user,headimg);
    ctx.body={
      code:2,
      msg:"修改成功",
      res
    }
  }
  async getuseradd(){
    let {ctx} = this;
    let {user} = ctx.query;
    console.log(user)
    let res = await ctx.service.user.getuseradd(user);
    ctx.body={
      code:1,
      msg:"获取成功",
      res
    }
  }
}

module.exports = UserController;
