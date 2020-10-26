'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  
  async add(user,password,phone) {
    let {app} = this;
    let data = await app.mysql.select("users");
    let flag=true;
    data.forEach((item,index)=>{
      if(user==item.user){
        flag=false;
        return flag;
      }
    })
    if(flag){
        await app.mysql.insert("users",{
          user,password,phone,name:user
      })
      return flag;
    }
  }
  async login(user,password){
    let {app} = this;
    let data = await app.mysql.select("users");
    let flag=false;
    data.forEach((item,index)=>{
        if(user==item.user&&password==item.password){
          flag=item
          return flag;
        }
    })
    if(flag){
      return flag 
    }else{
      return flag;
    }
  }


  async setuser(name,address,sex,id,user,headimg){
    let {app} = this;
    let pinglun = await app.mysql.select("txtlist")
    let wenzhang = await app.mysql.select("pinglun")
    pinglun.forEach(async (item,index)=>{
      if(item.user==user){
        await app.mysql.update("txtlist",{
          name,id:item.id,headimg
        })
      }
    })
    wenzhang.forEach(async (item,index)=>{
      if(item.user==user){
        let res = await app.mysql.update("pinglun",{
          zuozhe:name,id:item.id,
        })
        console.log(res)
      }
    })
    let data = await app.mysql.update("users",{
      name,address,sex,id,headimg
    })
    return data;
  }
  async getuseradd(user){
    let {app} = this;
    let data = await app.mysql.query(`select * from users where user=${user}`);
    return data
  }
  
}

module.exports = UserController;
