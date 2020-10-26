'use strict';

const Service = require('egg').Service;

class ListService extends Service {
  async getdata() {
    let {app} = this;
    return await app.mysql.select("pinglun")
    //返回首页所有数据
  }

  async gettxtlist(id){
    //搜索关于这个文章下的所有评论
    let {app} = this;
    let data = await app.mysql.query(`select * from txtlist where txtid like '%${id}%'`);
    return data;
  }

  async addtxt(txtid,user,txt){
    //txtid：文章id
    //user:账号
    //txt：评论内容
    let {app} = this;
    //获取这个用户的个人信息
    let datas = await app.mysql.query(`select * from users where user=${user}`);
    // let data = await app.mysql.query(`select * from pinglun where id=${txtid}`);
    
    //获取这个文章下的所有评论结算评论数
    let count = await app.mysql.query(`select * from txtlist where user=${user}`)
    //评论后文章表中的文章评论数+1
    count = count.length+1

    //修改文章表中的评论数
    await app.mysql.update("pinglun",{
      pinglun: count,id:txtid
    })
    
    // 返回一个评论数和添加评论的基本信息
    return {
      count,
      data:await app.mysql.insert("txtlist",{
      txtid,
      name:datas[0].name,
      user,
      txt,
      headimg:datas[0].headimg,
    })
  }
  }

  //添加文章
  async addtext(zuozhe,txt,name,user,time){
    let {app} = this;
    
    //向文章表中添加文章基本信息
    //文章标题
    //文章内容
    //用户名字
    //账号
    let data =await app.mysql.insert("pinglun",{
      zuozhe,txt,name,user,time
    })
    
    return data;
  }


  //获取当前用户所有的文章
  async getusertxt(user){
    let {app} = this; 
    //根据账号搜索文章表中所有账号为这个user的文章
    let data = await app.mysql.query(`select * from pinglun where user like '%${user}%'`);
    return data
  }

  //删除指定文章id的文章
  async dltusertxt(id){
    let {app} = this;
    // //获取评论表中关于这个文章的评论
    // let data = await app.mysql.query(`select * from txtlist where txtid like '%${id}%'`);
    // //获取之后是一个数组
    // //然后删除所有关于这个文章的评论
    // data.forEach(async (item,index)=>{
    //   await app.mysql.delete('txtlist',{id:item.id})
    // })
    //最后删除当前文章
    await app.mysql.delete("pinglun",{id:id})
  }



  //获取当前user对文章的点赞状态
  async likeyes(id,user){
    let {app} = this;
    let data = await app.mysql.query(`select * from likes where txtid=${id} and user=${user}`);
   //若返回”true“则说明当前没有点赞，可以进行点赞
   //若搜索到了内容则说明已经点过赞，则要根据传过去的文章id进行删除
    if(data[0]){
      return data[0];
    }else{
      return 'true';
    }
  }

  //取消点赞
  async nolike(txtid,id){
    //根据当前user和id删除点赞表中的相关内容
    let {app} = this;
    await app.mysql.delete("likes",{id});
    //获取当前文章的点赞数量进行-1
    let data = await app.mysql.query(`select * from pinglun where id=${txtid}`);
    let like = data[0].dianzan-1
    // 修改点赞数量
    await app.mysql.update("pinglun",{
      dianzan: like,id:txtid
    })
    return like;
  }

  //进行点赞
  async yeslike(id,user){
    let {app} = this;
    //根据当前user和id新增点赞表的相关内容
    let data = await app.mysql.query(`select * from pinglun where id=${id}`);
    await app.mysql.insert("likes",{
      txtid:id,user
    })
    //获取当前文章的点赞数量进行+1
    let like = data[0].dianzan+1
    // 修改点赞数量
    await app.mysql.update("pinglun",{
      dianzan: like,id
    })
    return like;
  }
  //获取所有点赞文章的id
  async getlikeid(user){
    let {app} = this;
    let txtids = await app.mysql.query(`select * from likes where user=${user}`);
    
    return txtids;
  }
  //获取根据id得到的文章进行返回
  async getlike(index){
    let {app} = this;
    let data = await app.mysql.query(`select * from pinglun where id=${index}`);
    return data[0];
  }
  //获取所有用户的评论
  async getpl(user){
    let {app} = this;
    let data = await app.mysql.query(`select * from txtlist where user=${user}`);
    return data;
  }

  //删除用户的评论
  async dltuserpl(id){
    let {app} = this;
    await app.mysql.delete("txtlist",{
      id
    })
  }

  //模糊搜索
  async search(value){
    let {app} = this;
    let data = await app.mysql.query(`select * from pinglun where name like '%${value}%'`);
    return data;
  }
}

module.exports = ListService;
