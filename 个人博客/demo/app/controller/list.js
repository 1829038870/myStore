'use strict';

const Controller = require('egg').Controller;
const moment = require("moment")
class ListController extends Controller {
  //获取首页文章列表
  async getdata() {
    let {ctx} = this;
    let data = await ctx.service.list.getdata();
    ctx.body={
        code:1,
        msg:"获取成功",
        data
    }
  }
  //获取当前文章id的所有评论
  async gettxtlist(){
    let {ctx} = this;
    let {id} = ctx.query;
    let data = await ctx.service.list.gettxtlist(id)
    ctx.body={
      code:2,
      msg:"获取成功",
      data
    }
  }

  //向当前文章添加评论
  async addtxt(){
    let {ctx} = this;
    let {txtid,user,txt} = ctx.request.body;
    let data = await ctx.service.list.addtxt(txtid,user,txt)
    ctx.body={
      code:2,
      msg:"评论成功",
      data
    }
  }

  //当前用户发表文章
  async addtext(){
    let {ctx} = this;
    let {zuozhe,txt,name,user} = ctx.request.body;
    let data = await ctx.service.list.addtext(zuozhe,txt,name,user,moment().format('YYYY-MM-DD, H:mm:ss'));
    ctx.body={
      code:2,
      msg:"发表成功",
      data
    }
  }

  //获取当前用户所有的文章
  async getusertxt(){
    let {ctx} = this;
    let {user} = ctx.query;
    let data = await ctx.service.list.getusertxt(user);
    ctx.body={
      code:2,
      msg:"获取成功",
      data
    }
  }

  //根据文章id删除当前用户的某一个文章
  async dltusertxt(){
    let {ctx} = this;
    let {id} = ctx.query;
    await ctx.service.list.dltusertxt(id);
    ctx.body={
      code:2,
      msg:"删除成功",
    }
  }


  //判断当前用户对文章的点赞状态
  async likeyes(){
    let {ctx} = this;
    let {id,user} = ctx.query;
    let data = await ctx.service.list.likeyes(id,user);
    if(data==="true"){
      ctx.body={
        code:2,
        msg:"当前没有点赞"
      }
    }else{
      ctx.body={
        code:1,
        msg:"当前已点赞",
        data
      }
    }
  }

  //根据前端传入的数据判断是否进行点赞
  async like(){
    let {ctx} = this;
    let {id,user,txtid,msg} = ctx.request.body;
    if(msg==="no"){
        let data = await ctx.service.list.nolike(txtid,id);
        ctx.body={
          code:1,
          msg:"您已经点过赞了",
          data
        }
    }else if(msg==="yes"){
      let data = await ctx.service.list.yeslike(id,user);
      ctx.body={
        code:2,
        msg:"感谢您的点赞",
        data
    }
  }
}

//获取当前用户所有点赞的文章id
  async getlikeid(){
    let {ctx} = this;
    let {user} = ctx.query;
    let data = await ctx.service.list.getlikeid(user);
    console.log(data);
    ctx.body={
      code:2,
      msg:"获取成功",
      txtids:data
    }
  }
  //根据id获取当前点赞文章
  async getlike(){
    let {ctx} = this;
    let {txtid} = ctx.query;
    let data = await ctx.service.list.getlike(txtid);
    console.log(data);
    ctx.body={
      code:2,
      msg:"获取成功",
      data
    }
  }

  //获取当前用户评论的所有文章
  async getpl(){
    let {ctx} = this;
    let {user} = ctx.query;
    let data = await ctx.service.list.getpl(user);
    ctx.body={
      code:2,
      msg:"获取成功",
      data
    }
  }

  //根据前端传过来的评论id进行删除评论
  async dltuserpl(){
    let {ctx} = this;
    let {id} = ctx.query;
    await ctx.service.list.dltuserpl(id);
    ctx.body={
      code:2,
      msg:"删除成功",
    }
  }

  //首页模糊收缩搜索数据
  async search(){
    let {ctx} = this;
    let {value} = ctx.query;
    let data = await ctx.service.list.search(value);
    ctx.body={
      code:2,
      msg:"获取搜索内容成功",
      data
    }
  }
}

module.exports = ListController;
