/*
 * @Author: Pawn 
 * @Date: 2018-09-11 19:49:02 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-17 21:39:55
 */
const User = require('../db').User;
const sha1 = require('sha1');
const { PWD_ENCODE_STR} = require('../utils/config');
const {create_token, check_token_code} = require('../utils/token');
const xss = require('xss')

module.exports = {
  // 用户注册
  async register(ctx, next){
    let {user_name = '', user_id =　'', user_pwd = '', re_user_pwd = '', avatar = "", code = '', code_token = ''} = ctx.request.body;
    try {
      if(user_name == '' || user_id == "" || user_pwd == ""){
        ctx.body = {
          code: 401,
          msg: "注册失败，请填写完整表单!"
        }
        return;
      }
      if(avatar == ''){
        ctx.body = {
          code: 401,
          msg: "注册失败，请上传头像!"
        }
        return;
      }
      if(user_pwd.length < 5){
        ctx.body = {
          code: 401,
          msg: '注册失败，密码最少为5位！'
        }
        return;
      }
      if(user_pwd != re_user_pwd){
        ctx.body = {
          code: 401,
          msg: "注册失败，2次密码输入不一致!"
        }
        return;
      }
      
      // 验证码判断
      let mark = await check_token_code({token:code_token,code});
      if(!mark){
        ctx.body = {
          code: 401,
          msg: '登录失败，验证码错误!'
        }
        return;
      }

      // 判断 user_id 是否重复
      let res = await User.find({user_id});
      if(res.length != 0){
        ctx.body = {
          code: 409,
          msg: '注册失败，登录账号重复了，换一个吧！'
        }
        return;
      }
      user_pwd = sha1(sha1(user_pwd + PWD_ENCODE_STR));
      // 防止xss攻击， 转义
      user_name = xss(user_name);
      let token = create_token(user_id);
      let user = new User({user_id,user_name,user_pwd,avatar,token});
      res = await user.save();
      if(res._id != null){
        ctx.body = {
          code: 200,
          msg: "注册成功!",
          data: {
            _id: res._id,
            user_name,
            avatar,
            token,
          }
        }
      }else{
        ctx.body = {
          code: 500,
          msg: "注册失败，服务器异常!"
        }
      }
    }catch (e){
      console.log(e);
      ctx.body = {
        code: 500,
        msg: "注册失败，服务器异常！"
      }
    }
  },
  // 用户登录
  async login(ctx, next){
    let {user_id = '', user_pwd = '' , code = "" , code_token = ''} = ctx.request.body;
    try {
      if(user_id == '' || user_pwd == ''){
        ctx.body = {
          code: 401,
          msg: "登录失败，请输入登录账号或密码!"
        }
        return;
      }
      // 验证码判断
      let mark = await check_token_code({token:code_token,code});
      if(!mark){
        ctx.body = {
          code: 401,
          msg: '登录失败，验证码错误!'
        }
        return;
      }
      user_pwd = sha1(sha1(user_pwd + PWD_ENCODE_STR));
      let res = await User.find({user_id,user_pwd});
      if(res.length == 0){
        ctx.body = {
          code: 401,
          msg: '登录失败，用户名或者密码错误!'
        }
        return;
      }
      let token = create_token(user_id);
      res[0].token = token;
      res[0].save();
      ctx.body = {
        code: 200,
        msg: "登录成功!",
        data: {
          _id: res[0]._id,
          user_name: res[0].user_name,
          avatar: res[0].avatar,
          token
        }
      }
    } catch(e){
      console.log(e);
      ctx.body = {
        code: 500,
        msg: '登录失败，服务器异常!'
      }
    }
  }
}