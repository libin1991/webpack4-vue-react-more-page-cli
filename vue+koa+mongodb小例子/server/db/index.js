/*
 * @Author: Pawn 
 * @Date: 2018-09-10 21:52:04 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-09-11 20:35:44
 */
const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser:true}, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("Connection success!")
  }
})
const Schema = mongoose.Schema; 

// 用户
let userSchema = new Schema({
  user_name: String,
  user_id: String,
  user_pwd: String,
  avatar: {
    type: String,
    default: ""
  },
  token: {
    type: String,
    default: ""
  }
})

// 留言
let commentSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  content: String,
  create_time: {
    type: String,
    default: Date.now
  }
})

// 验证码
let checkcodeSchema = new Schema({
  token: String,
  code: String
})

exports.User = mongoose.model('User', userSchema); 
exports.Comment = mongoose.model('Comment', commentSchema); 
exports.Checkcode = mongoose.model('Checkcode', checkcodeSchema);