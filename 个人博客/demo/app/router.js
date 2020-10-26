const { Controller } = require("egg");

module.exports = app => {
    const { router, controller } = app;
    //注册
    router.post('/add', controller.user.add);
    //登录
    router.post("/login",controller.user.login);
    //获取文章列表
    router.get("/getdata",controller.list.getdata);
    //修改账户信息
    router.put("/setuser",controller.user.setuser);
    //获取评论
    router.get("/getlist",controller.list.gettxtlist);
    //添加评论
    router.post("/addtxt",controller.list.addtxt);
    //添加文章
    router.post("/addtext",controller.list.addtext);
    //获取用户个人文章
    router.get("/getusertxt",controller.list.getusertxt);
    //删除个人文章
    router.delete('/deleteusertxt',controller.list.dltusertxt);
    //判断当前点赞状态
    router.get("/likeyes",controller.list.likeyes)
    //点赞
    router.put("/like",controller.list.like)
    //获取当前用户点赞的文章id
    router.get("/getuserdz",controller.list.getlikeid)
    //获取用户点赞的文章
    router.get('/getuserdz_1',controller.list.getlike)
    //获取当前用户所有的评论
    router.get('/getuserpl',controller.list.getpl)
    //删除此评论
    router.delete("/deletepl",controller.list.dltuserpl)
    //模糊搜索文章
    router.get('/search',controller.list.search);
    //获取其他用户信息
    router.get('/moveUser',controller.user.getuseradd)
  };  