/*
 * @Author: Pawn 
 * @Date: 2018-09-13 18:29:26 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-17 18:56:23
 */
const Comment = require('../db').Comment
const xss = require("xss");

module.exports = {
  /* 
    @name: 获取留言
    @param: size => 返回最大个数 默认：10
    @param: page => 当前页数 默认：1
  */  
  async getLeaves(ctx, next) {
    let {size = 10, page = 1} = ctx.query;
    /* 
      这里分页查询有2种方法：
      1. 第一种方法，就是我这里用到的，用skip跳过多少个，然后limit取到多少个
      2. 第二种方法，在客服端把当前的最后一个的_id给传过来，然后用$lt来找到比当前_id小的。就吧page换成最后一个元素的_id
      在效率上来讲，第二种方法效率更高，但是如果你想放回的内容的不是按_id排序的，那还是用第一种方法吧
    */
   try {
    let options = {
      skip: Number((page-1)*size),
      limit: Number(size),
      sort:{"create_time":"-1"},
      populate: {
        path: 'user_id',
        select: "_id user_name avatar"
      }
    }
    let res = await Comment.find({},null,options);
    let total = await Comment.countDocuments();
    ctx.body = {
      code: 200,
      msg: '获取留言成功',
      data: {
        list: res,
        pagination: {
          total,
          page : Number(page),
          size : Number(size)
        }
      }
    }
   }catch(e) {
     console.log(e);
     ctx.body = {
       code: 500,
       msg: "获取留言失败，服务器异常，请稍后再试！"
     }
   }

  },
  // 添加留言
  async addLeaver(ctx, next) {
    let { content = '' } = ctx.request.body;
    if(content == ''){
      ctx.body = {
        code: 401,
        msg: "留言失败，请写点什么吧!"
      }
      return;
    }
    // 转义，防止xss攻击
    content = xss(content);
    try {
      let comment = new Comment({
        user_id: ctx._id,
        content
      });
      let res = await comment.save();
      if(res._id != null){
        ctx.body = {
          code: 200,
          msg: '留言成功！',
          data: res
        }
      }else{
        ctx.body = {
          code: 500,
          msg: '留言失败，服务器异常，请稍后再试!'
        }
      }
    } catch (e){
      console.log(e);
      ctx.body = {
        code: 500,
        msg: '留言失败，服务器异常，请稍后再试!'
      }
    }
  },
  // 删除留言
  async deleteLeaver(ctx, next){
    let _id = ctx.params.id;
    try {
      let res = await Comment.findOneAndDelete({_id,user_id: ctx._id});
      if(res == null){
        ctx.body = {
          code: 500,
          msg: '删除留言失败，服务器异常!'
        }
      }else {
        ctx.body = {
          code: 200,
          msg: '删除留言成功!'
        }
      }
    } catch(e){
      console.log(e);
      ctx.body = {
        code: 500,
        msg: '删除留言失败，服务器异常!'
      }
    }
  }
}